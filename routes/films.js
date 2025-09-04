import { Router } from "express";

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
    res.json(data);
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