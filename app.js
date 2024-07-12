const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const albumRouter = require('./routes/albumRoute');

app.use(express.json());

////// routes ////
//app.get("/api/v1/albums", getAllAlbums);
//app.post("/api/v1/albums", postNewAlbum);
// app.get("/api/v1/albums/:id", getSingleAlbum);
// app.patch("/api/v1/albums/:id", updateAlbum);
// app.delete("/api/v1/albums/:id", deleteAlbum);

app.use('/api/v1/albums', albumRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`App running in ${port}......`);
});
