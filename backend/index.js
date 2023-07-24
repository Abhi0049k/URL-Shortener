const express = require('express');
const urlRouter = require('./routes/url.routes');
const cors = require('cors');
const { shortenedURL } = require('./controllers/urlShortener.controllers');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/url', urlRouter);

app.get('/:shortId', shortenedURL)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`)
})