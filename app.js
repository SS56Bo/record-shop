const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const albumRouter = require('./routes/albumRoute');

app.use(express.json());

app.use('/api/v1/albums', albumRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`App running in ${port}......`);
});
