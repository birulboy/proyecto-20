import express from 'express';
import api from './api/api.js';
import dotenv from 'dotenv';
import articles from './endpoints/articles.js';
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = 3000;

app.use("/api", express.static(path.join(__dirname, "public")));

app.use('/api/articles', articles)

app.get('/api/breaking-events', async (req, res) => {

    const params_api = {
        page : req.query.page,
        region : req.query.region,
        language : req.query.language,
        category : req.query.category,
        pageSize : req.query.genres }

    res.send(await api.getBreaking({...params_api}));

})

app.listen(port, () => {
    console.log("Escuchando en el puerto", port)
})