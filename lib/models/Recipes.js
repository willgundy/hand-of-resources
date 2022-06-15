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
}

module.exports = Recipe;