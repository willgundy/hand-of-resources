const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
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

  afterAll(() => {
    pool.end();
  });
});
