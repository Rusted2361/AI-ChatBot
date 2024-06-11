import { connectToDatabase } from "./db/connection.js"
import app from "./app.js"

//connections & listeners
const PORT = process.env.PORT || 3000
connectToDatabase().then(() => {
  try{
    app.listen(PORT, () => {
      console.log(`DB is connected and Server is up & running on http://localhost:${PORT}`)
    })
  }
  catch(error){
    console.log(error)
  }
})