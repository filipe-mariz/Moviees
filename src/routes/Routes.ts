import express from 'express';
import employ from './Employ.Routes';
import movies from './Movies.Routes';

const routes = express();

export default routes.use(
  employ,
  movies,
);
