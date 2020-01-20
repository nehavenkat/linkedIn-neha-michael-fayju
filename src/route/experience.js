const express = require('express')
const router = express.Router();
const Exp = require("../model/experience")
const { Transform } = require("json2csv")
const fs = require("fs-extra")
const path = require("path")


router.get('/', async (req, res) => {

    try {
        const exps = await Exp.find()
        res.send(exps)

    } catch (error) {
        console.log(error)
        res.send(error)
    }

})
router.get('/:expId', async (req, res) => {
    try {
        const exp = await Exp.findById(req.params.expId)
        res.send(exp)

    } catch (error) {
        console.log(error)
        res.send(error)
    }
})
router.post('/', async (req, res) => {

    const newExp = await Exp.create({ ...req.body, createAt: new Date(), updatedAt: new Date() })

    newExp.save()
    res.send(newExp)
})
router.put('/:expId', async (req, res) => {
    try {
        const editExp = await Exp.findByIdAndUpdate(req.params.expId, { $set: { ...req.body } })

        res.send(editExp)

    } catch (error) {
        console.log(error)
        res.send(error)
    }

})
router.delete('/:expId', async (req, res) => {

    try {
        const deleteExp = await Exp.findByIdAndDelete(req.params.expId)

        res.send('Deleted Successfully')

    } catch (error) {
        console.log(error)
        res.send(error)
    }

})
router.post('/:expId/picture', async (req, res) => {
    res.send('POST new picture')
})
router.get('/:expId/csv', async (req, res) => {
    const filePath = path.join(__dirname, "../", "public", "exports", "csv-" + req.params.expId + ".csv")
    const exp = await Exp.findById(req.params.expId)
   
    const fields = ["_id", "role", "company", "startDate", "endDate", "username"]
    //const opts = { fields }

    try {
       const csv = json2csv(exp, { fields });
    } catch (err) {
        return res.status(500).json({ err });
    }

    fs.writeFile(filePath, csv, function (err) {
        if (err) {
            return res.json(err).status(500);
        }
        else {
            setTimeout(function () {
                fs.unlink(filePath, function (err) { // delete this file after 30 seconds
                    if (err) {
                        console.error(err);
                    }
                    console.log('File has been Deleted');
                });

            }, 30000);
            res.download(filePath);
        }
        /*   try {
              const json2csv = new Transform(opts)
              await fs.createReadStream(exp).pipe(json2csv).pipe(res)
              
          } catch (error) {
              console.log(error)
              res.send(error)
          } */
        })
    })

    module.exports = router;