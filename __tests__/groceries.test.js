const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('groceries routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should return a list of groceries used in recipes', async () => {
    const res = await request(app).get('/groceries');
    expect(res.status).toBe(200);
    expect(res.body.length).toEqual(11);
    const pb = res.body.find((recipe) => recipe.description === 'peanut butter');
    expect(pb.id).toEqual("1");
    expect(pb.brand).toEqual('jif');
  });

  it('should return a single grocery', async () => {
    const res = await request(app).get('/groceries/2');
    expect(res.status).toBe(200);
    expect(res.body.description).toEqual('jelly');
    expect(res.body.brand).toEqual('smuckers');
  });

  it("POST /grocery should create a new grocery item to use in a recipe", async () => {
    const resp = await request(app)
      .post("/groceries")
      .send({ description: 'pasta sauce', brand: 'prego'  });
    expect(resp.status).toBe(200);
    expect(resp.body.description).toEqual('pasta sauce');
    const res = await request(app).get('/groceries');
    expect(res.body.length).toEqual(12);

    const newGrocery = await request(app).get(`/groceries/${resp.body.id}`);
    expect(newGrocery.body.description).toEqual('pasta sauce');
    expect(newGrocery.body.brand).toEqual('prego');
  });

  it('PUT /groceries/:id should update grocery information', async () => {
    const resp = await request(app)
      .put('/groceries/3')
      .send({ brand: 'wonder' });
    expect(resp.status).toEqual(200);
    expect(resp.body.brand).toEqual('wonder');
    const res = await request(app).get('/groceries/3');
    expect(res.body.brand).toEqual('wonder');
  });

  it('DELETE /groceries/:id should delete the grocery by id', async () => {
    const resp = await request(app)
    .post("/groceries")
    .send({ description: 'test', brand: 'test' });
    expect(resp.status).toBe(200);
    expect(resp.body.description).toEqual('test');
    const res = await request(app).get('/groceries');
    expect(res.body.length).toEqual(12);

    const newMeasurement = await request(app).get(`/groceries/${resp.body.id}`);
    expect(newMeasurement.body.description).toEqual('test');

    const respDelete = await request(app).delete(`/groceries/${resp.body.id}`)
    expect(respDelete.status).toEqual(200);
    expect(respDelete.body.description).toEqual('test');
    
    const resTwo = await request(app).get('/groceries');
    expect(resTwo.body.length).toEqual(11);
  });

  afterAll(() => {
    pool.end();
  });
});
