import { Router } from 'express';
import MoviesController from '../app/controller/MoviesController';
import authMiddleware from '../app/middleware/AuthMiddleware'; 
import validationMiddleware from '../app/middleware/ValidationMiddleware';
import bossMiddleware from '../app/middleware/BossMiddleware';

const movies = Router();

movies.post('/movies', authMiddleware, validationMiddleware, MoviesController.create);
movies.get('/movies', authMiddleware, MoviesController.viewAll);
movies.get('/movies/:id', authMiddleware, MoviesController.viewOne);
movies.delete('/movies/:id', authMiddleware, bossMiddleware, MoviesController.destroy);

export default movies;
