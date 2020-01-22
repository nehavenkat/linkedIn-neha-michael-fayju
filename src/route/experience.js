const express = require("express");
const router = express.Router();
const Exp = require("../model/experience");
const json2csv = require("json2csv").parse;
const path = require("path");
const multer = require("multer");
const { writeFile } = require("fs-extra");
// const { check, validationResult } = require("express-validator");

const upload = multer({});
router.get("/", async (req, res) => {
  try {
    const exps = await Exp.find();
    res.send(exps);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
router.get("/:expId", async (req, res) => {
  try {
    const exp = await Exp.findById(req.params.expId);
    res.send(exp);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
router.post("/", async (req, res) => {
  try {
    const newExp = await Exp.create({
      ...req.body
    });
    newExp.save();
    res.send(newExp);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
router.put("/:expId", async (req, res) => {
  try {
    const editExp = await Exp.findByIdAndUpdate(
      req.params.expId,
      {
        $set: { ...req.body }
      },
      { new: true }
    );
    res.send(editExp);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
router.delete("/:expId", async (req, res) => {
  try {
    const deleteExp = await Exp.findByIdAndDelete(req.params.expId);
    deleteExp ? res.send(deleteExp) : res.send("ID not found");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.post("/:expId/picture", upload.single("image"), async (req, res) => {
    try {
      const ext = path.extname(req.file.originalname);
      const imgDest = path.join(__dirname, "../../images/exp/" + req.params.expId + ext);
      const imgServe =
        req.protocol +
        "://" +
        req.get("host") +
        "/images/exp/" +
        req.params.expId +
        ext;
      await writeFile(imgDest, req.file.buffer);
      const exp = await Exp.findOneAndUpdate(
        req.params.expId,
        { image: imgServe },
        { new: true }
      );
      res.send(exp);
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  });

/* router.post('/:expId/picture', async (req, res) => {
    res.send('POST new picture')
}) */
router.get("/:username/csv", async (req, res) => {
  const filePath = path.join(
    __dirname,
    "../",
    "exp-" + req.params.username + ".csv"
  );
  const exp = await Exp.find({ username: req.params.username });
  let csv;
  const fields = ["_id", "role", "company", "startDate", "endDate", "username"];
  //const opts = { fields }

  try {
    csv = json2csv(exp, { fields });
  } catch (err) {
    return res.status(500).json({ err });
  }
  //write the csv file into the path
  fs.writeFile(filePath, csv, function(err) {
    if (err) {
      return res.json(err).status(500);
    } else {
      //this function delete the csv file in 30000seconds
      setTimeout(function() {
        fs.unlink(filePath, function(err) {
          if (err) {
            console.error(err);
          }
          console.log("File has been Deleted");
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
  });
});

module.exports = router;
