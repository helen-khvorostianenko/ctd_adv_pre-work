import express from 'express';
import cors from 'cors';
import { PORT } from './constants/config.js';
import filmsRouter from "./routes/films.js";
import charactersRouter from "./routes/characters.js";


const app = express()

app.set('view engine', 'ejs');
app.use(cors({
  origin: [/http:\/\/localhost:\d+$/]
})); 

app.listen(PORT);

app.get('/', (req, res) => {
  res.status(200).json({message: "Server is working"});
})

app.use('/films', filmsRouter)
app.use('/characters', charactersRouter)

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: err.message });
});

