const app = require('./app');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose.connect(DB, { useNewUrlParser: true }).then((con) => {
  console.log(con);
  console.log('DB Successfully connected!');
});

// console.log(process.env);

const port = 3000;
app.listen(port, () => {
  console.log(`App running in ${port}......`);
});
