import {Router} from "express";
import {BASE_URL, SWAPI_URL, DEFAULT_LIMIT} from '../constants/config.js';

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
    const page = req.query.page ? parseInt(req.query.page, 10) : null;
    const url = page
      ? `${SWAPI_URL}/people?page=${page}&limit=${DEFAULT_LIMIT}`
      : `${SWAPI_URL}/people`;

    const data = await fetchFromSwapi(url);
    const baseUrl = `${BASE_URL}${req.baseUrl}`;
    const results = (data.results || []).map((item) => (
      {
        uid: item.uid,
        name: item.name,
        ext_url: item.url,
        api_url: `${baseUrl}/${item.uid}`,
      }
    ))
      .sort((a, b) => (a.uid - b.uid));

    res.json({
      page: page ?? 1,
      limit: DEFAULT_LIMIT,
      total: data.total_records ?? results.length,
      total_pages: data.total_pages ?? (
        Math.max(1, Math.ceil((data.total_records ?? results.length) / limit))
      ),
      next: data.next ?? null,
      previous: data.previous ?? null,
      results,
    });
  } catch (err) {
    next(err);
  }
})

router.get('/:id', async (req, res, next) => {
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