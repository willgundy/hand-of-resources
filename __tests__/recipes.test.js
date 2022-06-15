const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  //need to come back and add nested instructions and ingredients
  it('should return a list of recipes w/o nested instructions and ingredients', async () => {
    const res = await request(app).get('/recipes');
    expect(res.status).toBe(200);
    expect(res.body.length).toEqual(2);
    const pbj = res.body.find((recipe) => recipe.title === 'PB&J');
    expect(pbj.prepTime).toEqual(1);
    expect(pbj.cookTime).toEqual(2);
  });
  afterAll(() => {
    pool.end();
  });
});
