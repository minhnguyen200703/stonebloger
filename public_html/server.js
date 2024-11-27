const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'

const app = next({ dev, hostname })
const handle = app.getRequestHandler()

app.prepare().then(() => {
// Passenger sẽ quản lý server, không cần tạo server thủ công ở đây
console.log(`> Ready on http://${hostname}`)
})
