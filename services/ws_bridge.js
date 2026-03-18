const WebSocket = require('ws')
const xlog = require('../utils/xlog')

const WS_PORT = process.env.WS_PORT || 3001

let extensionSocket = null
const pending = new Map() // requestId → { resolve, reject, timer }

// Standalone WS server (dùng khi chạy tele_bot.js trực tiếp)
function startStandaloneServer() {
  const wss = new WebSocket.Server({ port: WS_PORT })
  xlog.info(`[WS] Standalone server listening on port ${WS_PORT}`)
  attachHandlers(wss)
  return wss
}

function createWsServer(httpServer) {
  const wss = new WebSocket.Server({ server: httpServer, path: '/ws' })

  attachHandlers(wss)
}

function attachHandlers(wss) {
  wss.on('connection', (ws, req) => {
    xlog.info('[WS] Extension connected', { ip: req.socket.remoteAddress })
    extensionSocket = ws

    ws.on('message', (raw) => {
      const text = raw.toString().trim()
      if (text === 'ping') {
        ws.send('pong')
        return
      }
      if (!text.startsWith('{')) return // bỏ qua message không phải JSON
      try {
        const msg = JSON.parse(text)
        const entry = pending.get(msg.requestId)
        if (!entry) return

        clearTimeout(entry.timer)
        pending.delete(msg.requestId)

        if (msg.error) entry.reject(new Error(msg.error))
        else entry.resolve(msg.links)
      } catch (e) {
        xlog.error('[WS] parse error', { raw: text, err: e.message })
      }
    })

    ws.on('close', () => {
      xlog.info('[WS] Extension disconnected')
      if (extensionSocket === ws) extensionSocket = null
    })
  })
}

function isConnected() {
  return extensionSocket && extensionSocket.readyState === WebSocket.OPEN
}

function getLink(urls, subId, username, timeoutMs = 30000) {
  return new Promise((resolve, reject) => {
    if (!isConnected()) {
      return reject(new Error('Extension chưa kết nối tới server'))
    }

    const requestId = `${Date.now()}_${Math.random().toString(36).slice(2)}`

    const timer = setTimeout(() => {
      pending.delete(requestId)
      reject(new Error('Timeout: extension không phản hồi sau 30s'))
    }, timeoutMs)

    pending.set(requestId, { resolve, reject, timer })
    extensionSocket.send(JSON.stringify({ action: 'getLink', urls, subId, username, requestId }))
  })
}

module.exports = { createWsServer, startStandaloneServer, getLink, isConnected }
