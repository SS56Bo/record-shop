const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

const productFilePath = path.join(__dirname, "assets", "json", "product.json");
const productData = JSON.parse(fs.readFileSync(productFilePath, "utf8"));

app.use(express.json());

const getAllAlbums = (req, res) => {
  res.status(200).json({
    status: "success",
    dataLength: productData.length,
    data: {
      album: productData,
    },
  });
};

const postNewAlbum = (req, res) => {
  //console.log(req.body);
  const newId = productData[productData.length - 1].id + 1;
  const newBody = Object.assign({ id: newId }, req.body);

  productData.push(newBody);

  fs.writeFile(productFilePath, JSON.stringify(productData), (err) => {
    res.status(200).json({
      status: "success",
      data: {
        album: newBody,
      },
    });
  });
};

const getSingleAlbum = (req, res) => {
  //console.log(req.params);

  const searchID = req.params.id * 1;
  const singleAlbum = productData.find((el) => el.id === searchID);

  if (searchID > productData.length) {
    res.status(400).json({
      status: "fail",
      message: "invalid ID",
    });
  }

  res.status(200).json({
    success: "success",
    data: {
      singleAlbum,
    },
  });
};

const updateAlbum = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Entry updated",
  });
};

const deleteAlbum = (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Entry deleted",
  });
};

////// routes ////
//app.get("/api/v1/albums", getAllAlbums);
//app.post("/api/v1/albums", postNewAlbum);
// app.get("/api/v1/albums/:id", getSingleAlbum);
// app.patch("/api/v1/albums/:id", updateAlbum);
// app.delete("/api/v1/albums/:id", deleteAlbum);

app.route("/api/v1/albums").get(getAllAlbums).post(postNewAlbum);
app
  .route("/api/v1/albums/:id")
  .get(getSingleAlbum)
  .get(updateAlbum)
  .get(deleteAlbum);

const port = 3000;
app.listen(port, () => {
  console.log(`App running in ${port}......`);
});
