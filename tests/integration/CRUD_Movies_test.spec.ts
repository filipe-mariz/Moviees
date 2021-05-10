import request from 'supertest';
import { getRepository } from 'typeorm';
import app from '../../src/app';
import connection from '../../src/database/connection';
import createConnection from '../../src/database/connection';

describe('Create Movie', () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations();
  })

  it('Should be possible register a new movie in the database', async () => {
    const response = await request(app).post('/movies')
    .send({
      name: "A volta",
			time: "2h30min",
			price: "49.99",
			description: "Volta o cão arrependido",
			data_born: "2022.05.12",
      data_end: "2022.06.12"      
    })
    expect(response.status).toBe(200);    
  })

  it('Should be not possible register a new movie in the database', async () => {
    const response = await request(app).post('/movies')
    .send({
      name: "A volta",
			time: "2h30min",
			price: "49.99",
			description: "Volta o cão arrependido",
			data_born: "2022.05.12",
      data_end: "2022.06.12"      
    })
    expect(response.status).toBe(402);
  })
})

describe('Read movies', () => {
  it('Should be possible read all the movies in the database', async () => {
    const response = await request(app).get('/movies')
    expect(response.status).toBe(200);
  }) 

  it('Should be possible read one the movies in the database', async () => {
    const response = await request(app).get('/movies/1')
    
    expect(response.status).toBe(200);
  }) 

  it('Should be not possible read one the movie in the database with wrong ID', async () => {
    const response = await request(app).get('/movies/456')
    
    expect(response.status).toBe(402);
  })
})

describe('Delete movies', () => {
  it('Should be possible delete a movies in the database', async () => {
    const response = await request(app).delete('/movies/1');

    expect(response.status).toBe(200);
  })

  it('Should be not possible delete a movies in the database with wrong ID', async () => {
    const response = await request(app).delete('/movies/456');

    expect(response.status).toBe(200);
  })
})