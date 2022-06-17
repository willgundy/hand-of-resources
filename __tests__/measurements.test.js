const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('measurement routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should return a list of measurements used in recipes', async () => {
    const res = await request(app).get('/measurements');
    expect(res.status).toBe(200);
    expect(res.body.length).toEqual(6);
    const pounds = res.body.find((recipe) => recipe.description === 'pounds');
    expect(pounds.id).toEqual("1");
  });

  it('should return a single measurement', async () => {
    const res = await request(app).get('/measurements/2');
    expect(res.status).toBe(200);
    expect(res.body.description).toEqual('tablespoons');
  });

  it("POST /measurements should create a new measurement to use", async () => {
    const resp = await request(app)
      .post("/measurements")
      .send({ description: 'carton' });
    expect(resp.status).toBe(200);
    expect(resp.body.description).toEqual('carton');
    const res = await request(app).get('/measurements');
    expect(res.body.length).toEqual(7);

    const newMeasurement = await request(app).get(`/measurements/${resp.body.id}`);
    expect(newMeasurement.body.description).toEqual('carton');
  });

  it('PUT /measurements/:id should update measurement description', async () => {
    const resp = await request(app)
      .put('/measurements/3')
      .send({ description: 'oz' });
    expect(resp.status).toEqual(200);
    expect(resp.body.description).toEqual('oz');
    const res = await request(app).get('/measurements/3');
    expect(res.body.description).toEqual('oz');
  });

  it('DELETE /measurements/:id should delete the measurement by id', async () => {
    const resp = await request(app)
    .post("/measurements")
    .send({ description: 'test' });
    expect(resp.status).toBe(200);
    expect(resp.body.description).toEqual('test');
    const res = await request(app).get('/measurements');
    expect(res.body.length).toEqual(7);

    const newMeasurement = await request(app).get(`/measurements/${resp.body.id}`);
    expect(newMeasurement.body.description).toEqual('test');

    const respDelete = await request(app).delete(`/measurements/${resp.body.id}`)
    expect(respDelete.status).toEqual(200);
    expect(respDelete.body.description).toEqual('test');
    
    const resTwo = await request(app).get('/measurements');
    expect(resTwo.body.length).toEqual(6);
  });

  afterAll(() => {
    pool.end();
  });
});
