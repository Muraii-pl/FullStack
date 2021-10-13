const express = require('express')
const router = express.Router()
const { Comments } = require('../models')

router.get('/:postId',async (req,res)=>{
    const postId = req.params.id
    const comments = await Comments.findAll({
        where: {
            PostId: postId
        }
    })
    res.json(comments)
})

module.exports = router()