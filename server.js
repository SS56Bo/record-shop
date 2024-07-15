const app = require('./app');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose.connect(DB, {}).then((con) => {
  //console.log(con);
  console.log('DB Successfully connected!');
});

///////
// const albumSchema = new mongoose.Schema({
//   title: { type: String, required: [true, 'Requires a title'], unique: true },
//   artist: { type: String, required: [true, 'Requires a artist'], unique: true },
//   price: { type: Number, default: 29.99 },
// });

// const Album = mongoose.model('Album', albumSchema);

// const testDoc = new Album({
//   title: 'Malcolm is home',
//   artist: 'The 745',
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
