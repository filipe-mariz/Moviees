import request from 'supertest';
import app from '../../src/app';
import connection from '../../src/database/connection';
import createConnection from '../../src/database/connection';

describe('Create User', () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations();
  })

  it ('Should be abel a new employee create', async () => {
    const response = await request(app).post('/employee')
    .send({
        name: "Claudio  Lira",
        level_authorization: "1",
        user_name: "Claudio_lira",
        password: "Claudio_Lira",
        passwordConfirmation: "Claudio_Lira"
    })
    expect(response.status).toBe(200);
  })

  it ('Should be not possible save with user already exists', async () => {
    const response = await request(app).post('/employee')
    .send({
        name: "Claudio  Lira",
        level_authorization: "1",
        user_name: "Claudio_lira",
        password: "Claudio_Lira",
        passwordConfirmation: "Claudio_Lira"
    })
    expect(response.status).toBe(200);
  })

  it ('Should be not possible save with password confirmation wrong', async () => {
    const response = await request(app).post('/employee')
    .send({
        name: "Claudio  Lira",
        level_authorization: "1",
        user_name: "Filipe",
        password: "filipe_Lira",
        passwordConfirmation: "Claudio_mariz"
    })
    expect(response.status).toBe(402);
  })
})

describe('Read user', () => {
  it('Should be possible read all the users in the database', async () => {
    const response = await request(app).get('/employee')
    expect(response.status).toBe(200);
  }) 

  it('Should be possible read one the users in the database', async () => {
    const response = await request(app).get('/employee/1')
    
    expect(response.status).toBe(200);
  }) 

  it('Should be not possible read one the users in the database with wrong ID', async () => {
    const response = await request(app).get('/employee/456')
    
    expect(response.status).toBe(402);
  }) 
})

describe('Delete user', () => {
  it('Should be possible delete a user in the database', async () => {
    const response = await request(app).delete('/employee/1');

    expect(response.status).toBe(200);
  })

  it('Should be not possible delete a user in the database with wrong ID', async () => {
    const response = await request(app).delete('/employee/456');

    expect(response.status).toBe(200);
  })
})