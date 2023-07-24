const { Router } = require("express");
const { urlshortener } = require("../controllers/urlShortener.controllers");


const urlRouter = Router();

urlRouter.post('/', urlshortener)


module.exports = urlRouter;