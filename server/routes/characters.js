import { Router } from "express";
import { BASE_URL } from '../constants/config.js';

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
    const data = await fetchFromSwapi("https://www.swapi.tech/api/people/");
    const baseUrl = `${BASE_URL}${req.baseUrl}`
    const result = data.results.map((item) => (
      { 
        uid: item.uid,
        name: item.name,
        ext_url: item.url,
        api_url: `${baseUrl}/${item.uid}`,
      }
    ))
     .sort((a,b) => (a.uid - b.uid));
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
    const data = await fetchFromSwapi(`https://www.swapi.tech/api/people/${id}`);
    res.json(data);
  } catch (err) {
    next(err); 
  }
})

export default router;