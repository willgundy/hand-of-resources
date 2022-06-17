const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('instruction routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET / should return a list of all instructions', async () => {
    const res = await request(app).get('/instructions');
    expect(res.status).toBe(200);
    expect(res.body.length).toEqual(9);
    const spread = res.body.find((item) => item.id === '2');
    expect(spread.stepNumber).toEqual(2);
    expect(spread.description).toEqual('Spread peanut butter onto one slice of bread');
  });

  it('should return a single instruction', async () => {
    const res = await request(app).get('/instructions/2');
    expect(res.status).toBe(200);
    expect(res.body.description).toEqual('Spread peanut butter onto one slice of bread');
    expect(res.body.stepNumber).toEqual(2);
  });

  it("POST /instructions should create a new recipe", async () => {
    const resp = await request(app)
      .post("/instructions")
      .send({ recipeId: 1, stepNumber: 4, description: 'Enjoy!' });
    expect(resp.status).toBe(200);
    expect(resp.body.recipeId).toEqual('1');
    expect(resp.body.stepNumber).toEqual(4);
    expect(resp.body.description).toEqual('Enjoy!');
  
    const newInstruction = await request(app).get(`/instructions/${resp.body.id}`);
    expect(newInstruction.body.recipeId).toEqual('1');
    expect(newInstruction.body.description).toEqual('Enjoy!');
  });

  it('PUT /instructions/:id should update instruction info', async () => {
    const resp = await request(app)
      .put('/instructions/1')
      .send({ description: 'Get Ingredients' });
    expect(resp.status).toEqual(200);
    expect(resp.body.description).toEqual('Get Ingredients');
    expect(resp.body.stepNumber).toEqual(1);
    const res = await request(app).get('/instructions/1');
    expect(res.body.description).toEqual('Get Ingredients');
    expect(res.body.stepNumber).toEqual(1);
  });

  it('DELETE /instructions/:id should delete the instruction by id', async () => {
    const resp = await request(app)
    .post("/instructions")
    .send({ recipeId: 1, stepNumber: 4, description: 'Enjoy!' });
    expect(resp.status).toBe(200);
    expect(resp.body.recipeId).toEqual('1');
    const res = await request(app).get('/instructions');
    expect(res.body.length).toEqual(10);

    const newInstruction = await request(app).get(`/instructions/${resp.body.id}`);
    expect(newInstruction.body.recipeId).toEqual('1');
    expect(newInstruction.body.description).toEqual('Enjoy!');

    const respDelete = await request(app).delete(`/instructions/${resp.body.id}`)
    expect(respDelete.status).toEqual(200);
    expect(respDelete.body.recipeId).toEqual('1');
    expect(respDelete.body.description).toEqual('Enjoy!');

    
    const resTwo = await request(app).get('/instructions');
    expect(resTwo.body.length).toEqual(9);
  });

  afterAll(() => {
    pool.end();
  });
});
