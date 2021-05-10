import { Router } from 'express';
import MoviesController from '../app/controller/MoviesController';
import authMiddleware from '../app/middleware/AuthMiddleware'; 

const movies = Router();

movies.post('/movies', authMiddleware, MoviesController.create);
movies.get('/movies', authMiddleware, MoviesController.viewAll);
movies.get('/movies/:id', authMiddleware, MoviesController.viewOne);
movies.delete('/movies/:id', authMiddleware, MoviesController.destroy);

export default movies;