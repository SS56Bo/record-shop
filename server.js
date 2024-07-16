const app = require('./app');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');
const Album = require('./models/modelAlbum');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose.connect(DB, {}).then((con) => {
  //console.log(con);
  console.log('DB Successfully connected!');
});

///////

// const testDoc = new Album({
//   title: 'Crystal Crack House',
//   artist: 'Natalie is Freezing',
//   label: 'Dirty Hit',
//   genre: 'Punk Rock',
//   description: 'Good',
//   price: 12.45,
// });

// testDoc
//   .save()
//   .then((con) => console.log('Saved successfully'))
//   .catch((err) => console.log(err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running in ${port}......`);
});
