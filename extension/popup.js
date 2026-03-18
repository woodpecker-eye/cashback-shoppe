const TARGET_URL = "https://affiliate.shopee.vn/offer/custom_link";

// Hiển thị trạng thái WS từ background
const wsStatusEl = document.getElementById("ws-status")
chrome.runtime.sendMessage({ action: "wsStatus" }, (res) => {
  if (chrome.runtime.lastError) return
  if (res?.connected) {
    wsStatusEl.textContent = "WS: đã kết nối"
    wsStatusEl.style.background = "#e6f9ec"
    wsStatusEl.style.color = "#080"
  } else {
    wsStatusEl.textContent = "WS: chưa kết nối"
    wsStatusEl.style.background = "#fdecea"
    wsStatusEl.style.color = "#c00"
  }
})

const submitBtn   = document.getElementById("submit");
const statusEl    = document.getElementById("status");
const resultBox   = document.getElementById("result-box");
const resultLinks = document.getElementById("result-links");
const copyBtn     = document.getElementById("copy-btn");
const copyStatus  = document.getElementById("copy-status");

function setStatus(msg, type = "") {
  statusEl.textContent = msg;
  statusEl.className = type;
}

function showResults(links) {
  const text = links.join("\n");
  resultLinks.textContent = text;
  resultBox.style.display = "block";

  // Auto copy
  copyToClipboard(text);
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    copyStatus.textContent = "Đã copy vào clipboard!";
    setTimeout(() => { copyStatus.textContent = ""; }, 2500);
  });
}

copyBtn.addEventListener("click", () => {
  copyToClipboard(resultLinks.textContent);
});

submitBtn.addEventListener("click", async () => {
  const urls   = document.getElementById("urls").value.trim();
  const subId1 = document.getElementById("subId1").value.trim();

  if (!urls) { setStatus("Vui lòng nhập ít nhất 1 URL", "err"); return; }

  submitBtn.disabled = true;
  resultBox.style.display = "none";
  setStatus("Đang xử lý...");

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab.url?.startsWith(TARGET_URL)) {
    const newTab = await chrome.tabs.create({ url: TARGET_URL });
    waitForTabLoad(newTab.id, () => injectAndRun(newTab.id, urls, subId1));
  } else {
    injectAndRun(tab.id, urls, subId1);
  }
});

function waitForTabLoad(tabId, callback) {
  function listener(id, info) {
    if (id === tabId && info.status === "complete") {
      chrome.tabs.onUpdated.removeListener(listener);
      setTimeout(callback, 1500); // chờ React render
    }
  }
  chrome.tabs.onUpdated.addListener(listener);
}

async function injectAndRun(tabId, urls, subId1) {
  try {
    await chrome.scripting.executeScript({ target: { tabId }, files: ["content.js"] });
  } catch (_) { /* đã inject */ }

  setTimeout(() => {
    chrome.tabs.sendMessage(tabId, { action: "fillAndSubmit", urls, subId1 }, (res) => {
      submitBtn.disabled = false;

      if (chrome.runtime.lastError || !res?.ok) {
        setStatus("Lỗi: " + (res?.error || chrome.runtime.lastError?.message), "err");
        return;
      }

      if (res.links?.length > 0) {
        setStatus(`Thành công! ${res.links.length} link`, "ok");
        showResults(res.links);
      } else {
        setStatus("Không tìm thấy link kết quả trên trang", "err");
      }
    });
  }, 500);
}
