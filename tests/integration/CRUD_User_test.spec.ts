import request from 'supertest';
import app from '../../src/app';
import createConnection from '../../src/database/connection';

describe('Create User', () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })

  it ('Should be abel a new employee create', async () => {
    const response = await request(app).post('/create-employee')
    .send({
        name: "Claudio  Lira",
        level_authorization: "1",
        user_name: "Claudio_lira",
        password: "Claudio_Lira",
        passwordConfirmation: "Claudio_Lira"
    })
    expect(response.status).toBe(200);
  })
})