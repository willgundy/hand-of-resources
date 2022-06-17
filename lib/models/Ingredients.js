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

    static async insert({ recipeId, amount, measurementId, groceryId }) {
        const { rows } = await pool.query(`insert into ingredients 
                                                ("recipeId", amount, "measurementId", "groceryId")
                                                values ($1, $2, $3, $4) returning *`, 
                                            [recipeId, amount, measurementId, groceryId]);
        return new Ingredient(rows[0]);
    }

    static async update(id, attrs) {
        const ingredient = await Ingredient.getIngredientById(id);
        if(!ingredient) return null;
        const { recipeId, amount, measurementId, groceryId } = {...ingredient, ...attrs}
        const { rows } = await pool.query(`update ingredients
                                            set "recipeId"=$2, amount=$3, "measurementId"=$4, "groceryId"=$5
                                            where id=$1 returning *`,
                                            [id, recipeId, amount, measurementId, groceryId]);
        return new Ingredient(rows[0]);
    }
}

module.exports = Ingredient;