const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const Album = require('./../models/modelAlbum');
const fs = require('fs');

const configPath = path.join(__dirname, '..', 'config.env');
const productFilePath = path.join(__dirname, 'json', 'product.json');
const productData = JSON.parse(fs.readFileSync(productFilePath, 'utf8'));
console.log(configPath);
dotenv.config({ path: configPath });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose.connect(DB, {}).then((con) => {
  //console.log(con);
  console.log('DB Successfully connected!');
});

// IMPORT DATA INTO DATABASE
const importData = async () => {
  try {
    await Album.create(productData);
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//DELETE ALL EXISTING DATABASE
const deleteAll = async () => {
  try {
    await Album.deleteMany();
    console.log('All existing entries deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteAll();
}

console.log(process.argv);
