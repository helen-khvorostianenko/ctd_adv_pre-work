import {Router} from "express";
import {EPISODE_POSTERS} from "../constants/films.js";
import {BASE_URL, SWAPI_URL} from '../constants/config.js';

const router = Router();
async function fetchFromSwapi(url) {
  const r = await fetch(url);
  if (!r.ok) {
    throw new Error(`Error ${r.status}`);
  }

  return r.json();
}
router.get('/', async (req, res, next) => {
  try {
    const url = `${SWAPI_URL}/films`;
    const data = await fetchFromSwapi(url);
    const baseUrl = `${BASE_URL}${req.baseUrl}`;

    const result = data.result.map((item) => (
      {
        uid: item.uid,
        episode_id: item.properties.episode_id,
        title: item.properties.title,
        release_date: item.properties.release_date,
        ext_url: item.url,
        api_url: `${baseUrl}/${item.uid}`,
        img: EPISODE_POSTERS[item.properties.episode_id]
      }
    ))
      .sort((a, b) => (
        new Date(a.episode_id) - new Date(b.episode_id)
      ));

    res.json(result);
  } catch (err) {
    next(err);
  }
})
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    if (!id) {
      return res.status(400).json({'message': 'Film id non found'})
    }

    const url = `${SWAPI_URL}/films/${id}`;
    const data = await fetchFromSwapi(url);
    const img = EPISODE_POSTERS[id] ?? null;

    const response = {
      ...data,
      result: {
        ...data.result,
        properties: {
          ...data.result?.properties,
          img,
        },
      },
    };

    res.json(response);
  } catch (err) {
    next(err);
  }
})
export default router;
