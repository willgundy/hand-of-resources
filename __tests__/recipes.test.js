const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('recipes routes', () => {
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

  it('should return a single recipe', async () => {
    const res = await request(app).get('/recipes/2');
    expect(res.status).toBe(200);
    expect(res.body.title).toEqual('Stir Fry Noodles');
    expect(res.body.prepTime).toEqual(15);
  });

  it("POST /recipes should create a new recipe", async () => {
    const resp = await request(app)
      .post("/recipes")
      .send({ title: 'Avocado Toast', description: 'Open faced sandwich with mashed avocado over toast', prepTime: 2, cookTime: 3, totalTime: 5, servings: 1 });
    expect(resp.status).toBe(200);
    expect(resp.body.title).toEqual('Avocado Toast');
    expect(resp.body.prepTime).toEqual(2);
    expect(resp.body.cookTime).toEqual(3);
  
    const newRecipe = await request(app).get(`/recipes/${resp.body.id}`);
    expect(newRecipe.body.title).toEqual('Avocado Toast');
    expect(newRecipe.body.totalTime).toEqual(5);
  });

  it('PUT /recipes/:id should update recipe info', async () => {
    const resp = await request(app)
      .put('/recipes/1')
      .send({ title: 'Peanut Butter and Jelly Sandwich' });
    expect(resp.status).toEqual(200);
    expect(resp.body.title).toEqual('Peanut Butter and Jelly Sandwich');
    const res = await request(app).get('/recipes/1');
    expect(res.body.title).toEqual('Peanut Butter and Jelly Sandwich');
    expect(res.body.prepTime).toEqual(1);
  });

  // it.skip('DELETE /recipes/:id should delete a recipe', async () => {
  //   const resp = await request(app).delete('/recipes/1');
  //   expect(resp.status).toEqual(200);

  //   const deletedRecipe = await request(app).get('/recipes/1');
  //   expect(deletedRecipe.body).toEqual('');
  // });

  afterAll(() => {
    pool.end();
  });
});
