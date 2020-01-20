const express = require('express')
const router = express.Router()


router.get('/', async (req, res) => {
    res.send('get all profiles')
})
router.get('/:username', async (req, res) => {
    res.send('get profile for single user')
})
router.post('/', async (req, res) => {
    res.send('POST  a new profile')
})
router.put('/:username', async (req, res) => {
    res.send('update a profile by ID')
})
router.post('/:username/picture', async (req, res) => {
    res.send('POST new picture')
})
router.get('/:username/CV', async (req, res) => {
    res.send('POST CV')
})


module.exports = router;