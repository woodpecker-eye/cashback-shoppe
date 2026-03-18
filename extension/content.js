// Expose cho panel.js dùng trực tiếp (cùng page context)
window.__safFillAndWait = fillAndWaitResult;

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.action === "fillAndSubmit") {
    // Thông báo cho panel.js biết có request mới
    window.dispatchEvent(new CustomEvent('saf:request', {
      detail: { urls: msg.urls, subId1: msg.subId1, username: msg.username }
    }))

    fillAndWaitResult(msg.urls, msg.subId1)
      .then(links => {
        window.dispatchEvent(new CustomEvent('saf:result', { detail: { links } }))
        sendResponse({ ok: true, links })
      })
      .catch(e => {
        window.dispatchEvent(new CustomEvent('saf:result', { detail: { error: e.message } }))
        sendResponse({ ok: false, error: e.message })
      });
    return true; // async
  }
});

async function fillAndWaitResult(urls, subId1) {
  // --- Điền textarea ---
  const textarea = document.querySelector("textarea");
  if (!textarea) throw new Error("Không tìm thấy textarea");
  setNativeValue(textarea, urls);

  // --- Điền Sub_id1 ---
  if (subId1) {
    const allInputs = document.querySelectorAll('input[type="text"], input:not([type])');
    const subInput = Array.from(allInputs).find(el =>
      el.placeholder?.toLowerCase().includes("sport") ||
      el.closest("div")?.textContent?.includes("Sub_id1")
    );
    if (subInput) setNativeValue(subInput, subId1);
  }

  // --- Đóng modal cũ nếu còn ---
  const oldClose = document.querySelector(".ant-modal-close, button[aria-label='Close']");
  if (oldClose) {
    oldClose.click();
    await sleep(400);
  }

  // --- Click nút Lấy link ---
  const btn = Array.from(document.querySelectorAll("button")).find(
    b => b.textContent.trim() === "Lấy link"
  );
  if (!btn) throw new Error("Không tìm thấy nút Lấy link");
  btn.click();

  // --- Chờ modal MỚI xuất hiện (tối đa 10s) ---
  const links = await waitForLinks(null, 10000);

  // --- Đóng modal sau khi lấy được link ---
  const closeBtn = document.querySelector(".ant-modal-close, button[aria-label='Close']");
  if (closeBtn) closeBtn.click();

  return links;
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function waitForLinks(_beforeHTML, timeout) {
  // Đánh dấu thời điểm bắt đầu chờ — chỉ lấy modal xuất hiện SAU mốc này
  const startTime = Date.now();

  return new Promise((resolve, reject) => {
    const start = startTime;

    const timer = setInterval(() => {
      // Chỉ đọc modal nếu nó xuất hiện sau khi click (kiểm tra qua attribute data-timestamp nếu có, hoặc chờ ít nhất 300ms)
      if (Date.now() - startTime < 300) return;

      const links = extractResultLinks();

      if (links.length > 0) {
        clearInterval(timer);
        resolve(links);
        return;
      }

      if (Date.now() - start > timeout) {
        clearInterval(timer);
        reject(new Error("Timeout: không nhận được kết quả sau 10 giây"));
      }
    }, 500);
  });
}

function extractResultLinks() {
  const results = [];

  // Modal Ant Design xuất hiện sau khi click Lấy link
  // Cấu trúc: .ant-modal-body > textarea (chứa short link)
  const modalBody = document.querySelector(".ant-modal-body");
  if (modalBody) {
    const textarea = modalBody.querySelector("textarea");
    if (textarea) {
      // Textarea có thể chứa nhiều link, tách theo dòng
      const lines = textarea.value.split(/\s+/).map(l => l.trim()).filter(l => l.startsWith("http"));
      results.push(...lines);
    }
    // Fallback: text thuần trong modal body
    if (results.length === 0) {
      const matches = modalBody.innerText.match(/https?:\/\/\S+/g) || [];
      results.push(...matches);
    }
  }

  return results;
}

function setNativeValue(el, value) {
  const proto = el.tagName === "TEXTAREA"
    ? window.HTMLTextAreaElement.prototype
    : window.HTMLInputElement.prototype;
  const setter = Object.getOwnPropertyDescriptor(proto, "value").set;
  setter.call(el, value);
  el.dispatchEvent(new Event("input",  { bubbles: true }));
  el.dispatchEvent(new Event("change", { bubbles: true }));
}
