import { Router } from "express";
import { EPISODE_POSTERS } from "../constants/films.js";

const router = Router();

async function fetchFromSwapi(url) {
  const r = await fetch(url);
  if (!r.ok) {
    throw new Error(`Error ${r.status}`);
  }
  return r.json();
}

router.get('/', async(req, res, next) => {
  try {
    const data = await fetchFromSwapi("https://www.swapi.tech/api/films/");
    const result = data.result.map((item) => (
      { 
        uid: item.uid,
        episode_id: item.properties.episode_id,
        title: item.properties.title,
        release_date: item.properties.release_date,
        url: item.properties.url,
        img: EPISODE_POSTERS[item.properties.episode_id]
      }
    ))
     .sort((a,b) => (
      new Date(a.release_date) - new Date(b.release_date)
    ));
    res.json(result);
  } catch (err) {
    next(err); 
  }
})

router.get('/:id', async(req, res, next) => {
  try {
    const id = req.params.id
    if (!id) {
      res.status(400).json({'message': 'Film id non found'})
    }
    const data = await fetchFromSwapi(`https://www.swapi.tech/api/films/${id}`);
    res.json(data);
  } catch (err) {
    next(err); 
  }
})

export default router;