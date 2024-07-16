const dotenv = require('dotenv');
const app = require('./app');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const Album = require('./models/modelAlbum');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose.connect(DB, {}).then((con) => {
  //console.log(con);
  console.log('DB Successfully connected!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running in ${port}......`);
});
