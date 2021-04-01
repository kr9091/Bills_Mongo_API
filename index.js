const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const conn = mongoose.connection;
conn.on('error', (error) => console.error(error));
conn.once('open', () => console.log('Database Connected Succesfully...'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const billsRouter = require('./routes/bills.js');

app.use('/bills', billsRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server started successfully...');
});
