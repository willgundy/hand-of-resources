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

    static async insert({ title, description, prepTime, cookTime, totalTime, servings }) {
        const { rows } = await pool.query(
            'insert into recipes (title, description, "prepTime", "cookTime", "totalTime", servings) VALUES ($1, $2, $3, $4, $5, $6) returning *;', 
            [title, description, prepTime, cookTime, totalTime, servings]);
        return new Recipe(rows[0]);
    }

    static async updateById(id, attrs) {
        const recipe = await Recipe.getRecipeById(id);
        if (!recipe) return null;
        const { title, description, prepTime, cookTime, totalTime, servings } = { ...recipe, ...attrs };
        const { rows } = await pool.query('UPDATE recipes SET title=$2, description=$3, "prepTime"=$4, "cookTime"=$5, "totalTime"=$6, servings=$7 WHERE id = $1 returning *',
            [id, title, description, prepTime, cookTime, totalTime, servings]);
        return new Recipe(rows[0]);
    }
}

module.exports = Recipe;