// Inject panel vào trang affiliate.shopee.vn
(function () {
  if (document.getElementById('saf-panel')) return

  // --- CSS ---
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = chrome.runtime.getURL('panel.css')
  document.head.appendChild(link)

  // --- HTML ---
  const panel = document.createElement('div')
  panel.id = 'saf-panel'
  panel.innerHTML = `
    <div id="saf-toggle" title="Ẩn/hiện panel">&#10095;</div>

    <div id="saf-header">
      <span>ShoBack</span>
      <span id="saf-ws-badge">●</span>
    </div>

    <div id="saf-tabs">
      <div class="saf-tab" data-tab="manual">Manual</div>
      <div class="saf-tab active" data-tab="log">Log</div>
    </div>

    <div id="saf-body">

      <!-- Tab Manual -->
      <div class="saf-tab-content" id="tab-manual">
        <label>URLs (mỗi link 1 dòng)</label>
        <textarea id="saf-urls" placeholder="https://shopee.vn/..."></textarea>

        <label>Sub_id1</label>
        <input type="text" id="saf-subid" placeholder="vd: tele_bot" />

        <button id="saf-submit">Lấy link</button>
        <div id="saf-status"></div>

        <div id="saf-result-box">
          <div id="saf-result-title">
            <span>Kết quả</span>
            <button id="saf-copy-btn">Copy</button>
          </div>
          <div id="saf-result-links"></div>
          <div id="saf-copy-status"></div>
        </div>
      </div>

      <!-- Tab Log -->
      <div class="saf-tab-content active" id="tab-log">
        <div id="saf-log-toolbar">
          <button id="saf-log-clear">Xóa log</button>
        </div>
        <div id="saf-log-list"></div>
      </div>

    </div>
  `
  document.body.appendChild(panel)

  // --- Toggle panel ---
  let collapsed = false
  const toggle = document.getElementById('saf-toggle')
  toggle.addEventListener('click', () => {
    collapsed = !collapsed
    panel.classList.toggle('collapsed', collapsed)
    toggle.innerHTML = collapsed ? '&#10094;' : '&#10095;'
  })

  // --- Tab switching ---
  document.querySelectorAll('.saf-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.saf-tab').forEach(t => t.classList.remove('active'))
      document.querySelectorAll('.saf-tab-content').forEach(c => c.classList.remove('active'))
      tab.classList.add('active')
      document.getElementById('tab-' + tab.dataset.tab).classList.add('active')
    })
  })

  // --- WS status ---
  function refreshWsStatus() {
    chrome.runtime.sendMessage({ action: 'wsStatus' }, (res) => {
      const badge = document.getElementById('saf-ws-badge')
      if (!badge) return
      if (res?.connected) {
        badge.title = 'WS: đã kết nối'
        badge.style.color = '#4caf50'
      } else {
        badge.title = 'WS: chưa kết nối'
        badge.style.color = '#f44'
      }
    })
  }
  refreshWsStatus()
  setInterval(refreshWsStatus, 5000)

  // --- Log ---
  function addLog(msg, type = 'info') {
    const list = document.getElementById('saf-log-list')
    const item = document.createElement('div')
    item.className = 'saf-log-item saf-log-' + type
    const time = new Date().toLocaleTimeString('vi-VN')
    item.textContent = `[${time}] ${msg}`
    list.prepend(item)
  }

  document.getElementById('saf-log-clear').addEventListener('click', () => {
    document.getElementById('saf-log-list').innerHTML = ''
  })

  // --- Manual submit ---
  const submitBtn  = document.getElementById('saf-submit')
  const statusEl   = document.getElementById('saf-status')
  const resultBox  = document.getElementById('saf-result-box')
  const resultEl   = document.getElementById('saf-result-links')
  const copyStatus = document.getElementById('saf-copy-status')

  function setStatus(msg, type = '') {
    statusEl.textContent = msg
    statusEl.className = type
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      copyStatus.textContent = 'Đã copy!'
      setTimeout(() => { copyStatus.textContent = '' }, 2000)
    })
  }

  document.getElementById('saf-copy-btn').addEventListener('click', () => {
    copyToClipboard(resultEl.textContent)
  })

  submitBtn.addEventListener('click', async () => {
    const urls   = document.getElementById('saf-urls').value.trim()
    const subId1 = document.getElementById('saf-subid').value.trim()

    if (!urls) { setStatus('Vui lòng nhập URL', 'err'); return }

    submitBtn.disabled = true
    resultBox.style.display = 'none'
    setStatus('Đang xử lý...')
    addLog(`Bắt đầu lấy link: ${urls.split('\n').length} URL`)

    try {
      const links = await window.__safFillAndWait(urls, subId1)
      submitBtn.disabled = false
      if (links.length > 0) {
        setStatus(`Thành công! ${links.length} link`, 'ok')
        resultEl.textContent = links.join('\n')
        resultBox.style.display = 'block'
        copyToClipboard(links.join('\n'))
        addLog(`Thành công: ${links.join(', ')}`, 'ok')
      } else {
        setStatus('Không tìm thấy link kết quả', 'err')
        addLog('Không tìm thấy link kết quả', 'err')
      }
    } catch (e) {
      submitBtn.disabled = false
      setStatus('Lỗi: ' + e.message, 'err')
      addLog('Lỗi: ' + e.message, 'err')
    }
  })

  // Log từ content.js qua DOM event (tránh conflict channel với sendResponse)
  window.addEventListener('saf:request', (e) => {
    const { urls, username, subId1 } = e.detail
    const user = username ? `@${username}` : subId1 || '—'
    addLog(`[Telegram] ${user} — ${urls?.split('\n').length || 1} URL`)
  })

  window.addEventListener('saf:result', (e) => {
    const { links, error } = e.detail
    if (error) addLog(`Lỗi: ${error}`, 'err')
    else addLog(`Thành công: ${links.join(', ')}`, 'ok')
  })

})()
