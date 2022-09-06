import http from 'http';
import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes/todos'

const router: Express = express();

// logging
router.use(morgan('dev'));
// parse the request
router.use(express.urlencoded({ extended: false }));
// takes care of json data
router.use(express.json());
// Enable All CORS Requests
router.use(cors());


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
