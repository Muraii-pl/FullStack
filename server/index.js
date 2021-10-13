const express = require('express')
const db = require('./models')
const postRouter = require('./routes/Posts')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())




app.use("/posts", postRouter)

db.sequelize.sync().then(()=>{
    app.listen(3001,()=>{
        console.log("Server running ")
    })
})
