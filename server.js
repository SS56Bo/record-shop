const app = require('./app');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace('<PASSWORD>');

console.log(process.env);

const port = 3000;
app.listen(port, () => {
  console.log(`App running in ${port}......`);
});
