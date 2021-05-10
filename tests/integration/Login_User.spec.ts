import request from 'supertest';
import app from '../../src/app';
import connection from '../../src/database/connection';
import createConnection from '../../src/database/connection';

describe('Login', () => {
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

  it('should authenticate with valid credentials', async () => {
    const response = await request(app).post('/employee/login')
    .send({
      user_name: "Claudio_lira",
      password: "Claudio_Lira"
    })
    expect(response.status).toBe(200);
  })

  it('should be not authenticate with invalid credentials', async () => {
    const response = await request(app).post('/employee/login')
    .send({
      user_name: "Claudio_lira1",
      password: "Claudio_Lira"
    })
    expect(response.status).toBe(402);
  })

  it('should be not authenticate with invalid password', async () => {
    const response = await request(app).post('/employee/login')
    .send({
      user_name: "Claudio_lira",
      password: "Claudio_Lira1"
    })
    expect(response.status).toBe(402);
  })

  it('should be not authenticate with password null', async () => {
    const response = await request(app).post('/employee/login')
    .send({
      user_name: "Claudio_lira",
      password: ""
    })
    expect(response.status).toBe(402);
  })

  it("should not be able to access private routes with invalid jwt token", async () => {
    const response = await request(app)
      .get("/dashboard")
      .set("Authorization", `Bearer 123123`);

    expect(response.status).toBe(401);
  })
})