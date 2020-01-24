const express = require("express");
const router = express.Router();
const Profile = require("../model/profile");
const Exp = require("../model/experience");
const { check, validationResult } = require("express-validator");
const { writeFile } = require("fs-extra");
const multer = require("multer");
const path = require("path");
var PdfPrinter = require("pdfmake");

router.get("/", async (req, res) => {
  try {
    const response = await Profile.find().populate("experiences");
    // const response = await Profile.find();
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

router.get("/:username", async (req, res) => {
  try {
    const response = await Profile.findOne({
      username: req.params.username
    }).populate("experiences");
    response ? res.json(response) : res.json({});
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});
router.post(
  "/",
  [
    check("email")
      .isEmail()
      .withMessage("A valid email is required!"),
    check("name")
      .exists()
      .withMessage("User first name is required!"),
    check("surname")
      .exists()
      .withMessage("User last name is required!"),
    check("username")
      .exists()
      .withMessage("A unique username is required!")
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { name, surname, email, bio, title, area, username } = req.body;
    try {
      const response = await Profile.create({
        name,
        surname,
        email,
        bio,
        title,
        area,
        username
      });
      response.save();
      res.json(response);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }
);
router.put("/:username", async (req, res) => {
  const { name, surname, title, area, bio, email } = req.body;
  let update = {};
  if (name) update = { ...update, name };
  if (surname) update = { ...update, surname };
  if (title) update = { ...update, title };
  if (area) update = { ...update, area };
  if (bio) update = { ...update, bio };
  if (email) update = { ...update, email };
  try {
    const response = await Profile.findOneAndUpdate(
      { username: req.params.username },
      update,
      { new: true }
    );
    response ? res.json(response) : res.json({});
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});
const upload = multer({});
router.post("/:username/picture", upload.single("image"), async (req, res) => {
  try {
    const ext = path.extname(req.file.originalname);
    const imgDest = path.join(
      __dirname,
      "../../images/profile/" + req.params.username + ext
    );
    const imgServe =
      req.protocol +
      "://" +
      req.get("host") +
      "/images/profile/" +
      req.params.username +
      ext;
    await writeFile(imgDest, req.file.buffer);
    const post = await Profile.findOneAndUpdate(
      req.params.postId,
      { image: imgServe },
      { new: true }
    );
    res.send(post);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});
router.get("/:username/CV", async (req, res) => {
  const fonts = {
    Roboto: {
      normal: "./fonts/Roboto-Regular.ttf",
      bold: "./fonts/Roboto-Medium.ttf",
      italics: "./fonts/Roboto-Italic.ttf",
      bolditalics: "./fonts/Roboto-MediumItalic.ttf"
    }
  };
  const printer = new PdfPrinter(fonts);
  const userProfile = await Profile.findOne({ username: req.params.username });
  const userExpriences = await Exp.find({ username: req.params.username });

  console.log(userExpriences);
  const docDefinition = {
    content: [
      {
        style: "tableExample",
        table: {
          widths: [150, 600],
          headerRows: 0,
          body: [
            [
              [
                {
                  text: "Contact"
                },
                {
                  text: userProfile.area
                },
                {
                  text: userProfile.email
                },
                {
                  text: userExpriences[0].role
                }
              ],
              [
                {
                  text: userProfile.name + " " + userProfile.surname,
                  style: "header"
                },
                {
                  text: userProfile.title
                }
              ]
            ]
          ]
        },
        layout: "noBorders"
      }
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true
      }
    }
  };
  const pdfDoc = printer.createPdfKitDocument(docDefinition);
  let chunks = [];
  let result;
  pdfDoc.on("data", chunk => {
    chunks.push(chunk);
  });
  pdfDoc.on("end", () => {
    result = Buffer.concat(chunks);
    res.contentType("application/pdf");
    res.send(result);
  });
  pdfDoc.end();
});
router.delete("/:id", async (req, res) => {
  try {
    const response = await Profile.findByIdAndDelete(req.params.id);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

module.exports = router;
