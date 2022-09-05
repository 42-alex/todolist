import http from 'http';
import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import routes from './routes/todos'

const router: Express = express();

// logging
router.use(morgan('dev'));
// parse the request
router.use(express.urlencoded({ extended: false }));
// takes care of json data
router.use(express.json());

// rules of our api
router.use((req, res, next) => {
  // set the CORS policy
  res.header('Access-Control-Allow-Origin', '*');
  // set the CORS headers
  res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
  // set the CORS method headers
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET PUT DELETE POST');
    return res
      .status(200)
      .json({})
  }
  next();
})


// routes
router.use('/', routes);


// error handling
router.use((req: Request, res: Response) => {
  const error: Error = new Error('not found');
  return res
    .status(404)
    .json({ message: error.message })
})


// server
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 6060;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`))
