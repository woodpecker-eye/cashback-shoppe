const WS_URL = 'ws://localhost:3001'
const TARGET_URL = 'https://affiliate.shopee.vn/offer/custom_link'
const PING_INTERVAL_MS = 20000  // ping mỗi 20s để giữ kết nối
const RECONNECT_DELAY_MS = 3000

let ws = null
let pingTimer = null
let reconnectTimer = null

// ── Giữ service worker sống bằng chrome.alarms ──────────────────────────────
chrome.alarms.create('keepAlive', { periodInMinutes: 0.4 }) // ~24s
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'keepAlive') ensureConnected()
})

// ── WebSocket ────────────────────────────────────────────────────────────────
function connect() {
  if (ws && (ws.readyState === WebSocket.CONNECTING || ws.readyState === WebSocket.OPEN)) return

  clearTimers()
  console.log('[WS] Connecting...')
  ws = new WebSocket(WS_URL)

  ws.onopen = () => {
    console.log('[WS] Connected')
    startPing()
  }

  ws.onmessage = async (event) => {
    // pong từ server
    if (event.data === 'pong') return

    let msg
    try { msg = JSON.parse(event.data) } catch { return }

    if (msg.action === 'getLink') {
      try {
        const links = await triggerExtension(msg.urls, msg.subId, msg.username)
        send({ requestId: msg.requestId, links })
      } catch (e) {
        send({ requestId: msg.requestId, error: e.message })
      }
    }
  }

  ws.onclose = () => {
    console.log('[WS] Disconnected, retry in 3s...')
    clearTimers()
    reconnectTimer = setTimeout(connect, RECONNECT_DELAY_MS)
  }

  ws.onerror = () => {
    ws.close()
  }
}

function ensureConnected() {
  if (!ws || ws.readyState === WebSocket.CLOSED || ws.readyState === WebSocket.CLOSING) {
    connect()
  }
}

function send(data) {
  if (ws?.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(data))
  }
}

function startPing() {
  clearInterval(pingTimer)
  pingTimer = setInterval(() => {
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send('ping')
    } else {
      clearInterval(pingTimer)
    }
  }, PING_INTERVAL_MS)
}

function clearTimers() {
  clearInterval(pingTimer)
  clearTimeout(reconnectTimer)
}

// ── Điều khiển extension ─────────────────────────────────────────────────────
async function triggerExtension(urls, subId, username) {
  const tabs = await chrome.tabs.query({ url: TARGET_URL + '*' })
  let tab = tabs[0]

  if (!tab) {
    tab = await chrome.tabs.create({ url: TARGET_URL, active: false })
    await waitForTabLoad(tab.id)
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      chrome.tabs.sendMessage(tab.id, { action: 'fillAndSubmit', urls, subId1: subId, username }, (res) => {
        if (chrome.runtime.lastError || !res?.ok) {
          reject(new Error(res?.error || chrome.runtime.lastError?.message))
        } else {
          resolve(res.links)
        }
      })
    }, 500)
  })
}

function waitForTabLoad(tabId) {
  return new Promise((resolve) => {
    function listener(id, info) {
      if (id === tabId && info.status === 'complete') {
        chrome.tabs.onUpdated.removeListener(listener)
        setTimeout(resolve, 1500)
      }
    }
    chrome.tabs.onUpdated.addListener(listener)
  })
}

// ── API cho popup/panel ──────────────────────────────────────────────────────
chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.action === 'wsStatus') {
    sendResponse({ connected: ws?.readyState === WebSocket.OPEN })
  }
  return true
})


connect()
