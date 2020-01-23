const express = require("express")
const doc = require("pdfmake")
const fs = require("fs-extra")
const path = require("path")
const PdfPrinter = require("pdfmake");

const printPDF = newProduct => 
    new Promise((resolve, reject) => {
        const fonts = {
            Roboto: {
              normal: "Helvetica",
              bold: "Helvetica-Bold",
              italics: "Helvetica-Oblique",
              bolditalics: "Helvetica-BoldOblique"
            }
          };
        const docPrinter = new doc(fonts)
        const detailsTable = {
            body: [],
            width: [300, 400]
        }
        detailsTable.body.push(["_id:", `${newProfile._id}`], ["Bio:", `${newProfile.bio}`])
        detailsTable.body.push(["name:", `${newProfile.name}`], ["surname:", `${newProfile.surname}`])
        detailsTable.body.push(["email:", `$${newProfile.email}`])
        const docDefinition = {
            content: [
                { text: "CV", style: "header" },
                { table: detailsTable }
              ]
        }
        const fileName = `${newProfile._id}.pdf`
        const pdfDocStream = docPrinter.createPdfKitDocument(docDefinition, {}); 
        pdfDocStream.pipe(
          fs.createWriteStream(path.join(__dirname, fileName))
        ); 
        pdfDocStream.end();
        resolve(); 
    })
module.exports = printPDF;