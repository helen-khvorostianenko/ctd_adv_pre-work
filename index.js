const express = require('express');
const app = express()
const port = 3000

app.listen(port, () => console.log('Server starts on ' + port))

app.get('/', (req, res) => {
  // res.status(200).json('Server is working');
  
  res.send('Hello World!!! updated text')
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

app.get('/movie/:id', (req, res) => {

  res.send('Hello movie!'+ req.params.id)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

