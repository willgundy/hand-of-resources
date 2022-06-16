const pool = require('../utils/pool');

class Recipe {
    id;
    description;
    prepTime;
    cookTime;
    totalTime;
    servings;

    constructor(recipe) {
        this.id = recipe.id;
        this.title = recipe.title;
        this.description = recipe.description;
        this.prepTime = recipe.prepTime;
        this.cookTime = recipe.cookTime;
        this.totalTime = recipe.totalTime;
        this.servings = recipe.servings;
    }

    static async getAll() {
        const { rows } = await pool.query('select * from recipes');
        return rows.map((row) => new Recipe(row));
    }

    static async getRecipeById(id) {
        const { rows } = await pool.query('select * from recipes where id = $1', [id]);
        return new Recipe(rows[0]);
    }
}

module.exports = Recipe;