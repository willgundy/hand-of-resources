const pool = require('../utils/pool');

class Ingredient {
    id;
    recipeId;
    amount;
    measurementId;
    groceryId;

    constructor(ingredient) {
        this.id = ingredient.id;
        this.recipeId = ingredient.recipeId;
        this.amount = ingredient.amount;
        this.measurementId = ingredient.measurementId;
        this.groceryId = ingredient.groceryId;
    }

    static async getAll() {
        const { rows } = await pool.query('select * from ingredients');
        return rows.map((row) => new Ingredient(row));
    }

    static async getIngredientById(id) {
        const { rows } = await pool.query('select * from ingredients where id = $1', [id]);
        return new Ingredient(rows[0]);
    }
}

module.exports = Ingredient;