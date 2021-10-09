require('dotenv').config()
const webpush = require('web-push')
const express = require('express')
const cors = require('cors')
const path = require('path')
const expressSession = require('express-session')

const app = express()
const http = require('http').createServer(app)

const publicVapidKey = process.env.PUBLIC_VAPID_KEY
const privateVapidKey = process.env.PRIVATE_VAPID_KEY

webpush.setVapidDetails('mailto:mail@mail.com' , publicVapidKey, privateVapidKey)

// Express App Config
const session = expressSession({
    secret: 'swello is the best app ever',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
})
app.use(express.json({limit: '50mb'}))
app.use(session)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')
const boardRoutes = require('./api/board/board.routes')
const templateRoutes = require('./api/template/template.routes')
const {connectSockets} = require('./services/socket.service')

// routes
const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware')
app.all('*', setupAsyncLocalStorage)

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/board', boardRoutes)
app.use('/api/template',templateRoutes)
connectSockets(http, session)

// web notifications
// app.post('/subscribe', (req, res) => {
//     const subscription = req.body;

//     res.status(201).json({});

//     const payload = JSON.stringify({title: 'test'})

//     webpush.sendNotification(subscription, payload).catch(err=>console.error(err));
// })


// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/car/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue/react-router to take it from there
app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})


const logger = require('./services/logger.service')
const port = process.env.PORT || 3030
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
})





