import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import router from './app/routes'
const app: Application = express()

//parsers
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use('/api', router)
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Bond Bike Rentals')
})

export default app
