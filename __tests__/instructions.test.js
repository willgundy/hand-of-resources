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


  afterAll(() => {
    pool.end();
  });
});
