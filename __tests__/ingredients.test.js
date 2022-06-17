const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should return a list of ingredients', async () => {
    const res = await request(app).get('/ingredients');
    expect(res.status).toBe(200);
    expect(res.body.length).toEqual(7);
    const first = res.body.find((ingredient) => ingredient.id === '1');
    expect(first.amount).toEqual(2);
    expect(first.measurementId).toEqual(3);
    expect(first.groceryId).toEqual(1);
  });

  it('should return a single ingredient for a recipe', async () => {
    const res = await request(app).get('/ingredients/2');
    expect(res.status).toBe(200);
    expect(res.body.amount).toEqual(2);
    expect(res.body.measurementId).toEqual(3);
    expect(res.body.groceryId).toEqual(2);
  });

  afterAll(() => {
    pool.end();
  });
});
