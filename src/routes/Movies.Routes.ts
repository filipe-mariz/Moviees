import { Router } from 'express';
import multer from 'multer';
import MoviesController from '../app/controller/MoviesController';
import authMiddleware from '../app/middleware/AuthMiddleware'; 
import validationMiddleware from '../app/middleware/ValidationMiddleware';
import bossMiddleware from '../app/middleware/BossMiddleware';
import multerConfig from '../config/multer';

const movies = Router();
const upload = multer(multerConfig);

movies.post('/movies', authMiddleware, validationMiddleware, upload.array('image'),  MoviesController.create);
movies.get('/movies', authMiddleware, MoviesController.viewAll);
movies.get('/movies/:id', authMiddleware, MoviesController.viewOne);
movies.delete('/movies/:id', authMiddleware, bossMiddleware, MoviesController.destroy);

export default movies;
