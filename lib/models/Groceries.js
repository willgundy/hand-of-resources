const pool = require('../utils/pool');

class Grocery {
    id;
    description;
    brand;

    constructor(grocery) {
        this.id = grocery.id;
        this.description = grocery.description;
        this.brand = grocery.brand;
    }

    static async getAll() {
        const { rows } = await pool.query('select * from groceries');
        return rows.map((row) => new Grocery(row));
    }

    static async getGroceryById(id) {
        const { rows } = await pool.query('select * from groceries where id = $1', [id]);
        return new Grocery(rows[0]);
    }

    static async insert({ description, brand }) {
        const { rows } = await pool.query('insert into groceries (description, brand) values ($1, $2) returning *', [description, brand]);
        return new Grocery(rows[0]);
    }

    static async updateById(id, attrs) {
        const grocery = await Grocery.getGroceryById(id);
        if (!grocery) return null;
        const { description, brand } = { ...grocery, ...attrs };
        const { rows } = await pool.query('UPDATE groceries SET description=$2, brand=$3 WHERE id=$1 returning *',
            [id, description, brand]);
        return new Grocery(rows[0]);
    }
}

module.exports = Grocery;