const express = require("express")
const router = express.Router()
const {Users} = require("../models")
const bcrypt = require("bcrypt")

const {sign} = require('jsonwebtoken')

router.post('/', async (req, res) => {

    const {username, password} = req.body
    bcrypt.hash(password, 10).then(async (hash) => {
        await Users.create({
            username: username,
            password: hash,
        })
        res.json("Success")
    })

})

router.post('/login', async (req, res) => {
    const {username, password} = req.body

    const user = await Users.findOne({
        where: {
            username: username
        }
    })
    if(!user) res.json({error:"User Doesn't Exist"})

    bcrypt.compare(password, user.password).then((match)=>{
        if(!match) res.json({error:"Wrong Username and Password"})

        const accessToken  = sign({username:user.username,id:user.id},"importatsecert")
        res.json(accessToken)
    })

})

module.exports = router