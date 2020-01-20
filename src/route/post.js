const express = require('express')
const router = express.Router()


router.get('/', async (req, res) => {
    res.send('get all posts')
})
router.get('/:userId', async (req, res) => {
    res.send('get post for single user')
})
router.post('/', async (req, res) => {
    res.send('POST  a new post')
})
router.put('/:postId', async (req, res) => {
    res.send('update a new post by ID')
})
router.delete('/:postId', async (req, res) => {
    res.send('DELETE a podt by ID')
})
router.post('/:postId/picture', async (req, res) => {
    res.send('POST new picture')
})

module.exports = router;