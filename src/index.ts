import express from 'express'

const app = express()

//middlewares
app.use(express.json())

//connections & listeners
app.delete('/user/:id', (req, res, next) => {
  console.log("req",req.params.id)
  res.send('Hello World!')
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})