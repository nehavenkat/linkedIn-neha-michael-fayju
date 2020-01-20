const express = require('express')
const router = express.Router()


router.get('/', async (req, res) => {
    res.send('get all experiences')
})
router.get('/:expId', async (req, res) => {
    res.send('get experiences for single ID')
})
router.post('/', async (req, res) => {
    res.send('POST  a new experience')
})
router.put('/:expId', async (req, res) => {
    res.send('update  an experience by ID')
})
router.delete('/:expId', async (req, res) => {
    res.send('DELETE an experience by ID')
})
router.post('/:expId/picture', async (req, res) => {
    res.send('POST new picture')
})
router.get('/:expId/CSV', async (req, res) => {
    res.send('POST CSV')
})

module.exports = router;