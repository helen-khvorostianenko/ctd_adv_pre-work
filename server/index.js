import express from 'express';
import filmsRouter from "./routes/films.js";
import cors from 'cors';

const app = express()
const port = 3000

app.set('view engine', 'ejs');
app.use(cors({ origin: 'http://localhost:5173' })); 

app.listen(port)

app.get('/', (req, res) => {
  res.status(200).json({message: "Server is working"});
})

app.get('/character/:id', (req, res) => {
  try { 
    const id = req.params.id
    if (!id) {
      res.status(400).json({'message': 'Character id non found'})
    }
    // Go to api
    res.send(`Hello character! ${id}`)
  } catch (e) {
    res.status(500).json(e)
  }

 
})

app.use('/films', filmsRouter)

// app.get('/films/', async(req, res, next) => {
//   try {
//     const r = await fetch(
//       "https://www.swapi.tech/api/films/"
//     );
//     if (!r.ok) {
//       throw new Error(`Error ${r.status}`);
//     }
//     const data = await r.json();
//     res.json(data);
//   } catch (err) {
//     next(err); 
//   }
// })


app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ error: err.message });
});

