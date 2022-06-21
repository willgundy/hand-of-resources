const pool = require('../utils/pool');

class Measurement {
    id;
    description;

    constructor(measurement) {
        this.id = measurement.id;
        this.description = measurement.description;
    }

    static async getAll() {
        const { rows } = await pool.query('select * from measurements');
        return rows.map((row) => new Measurement(row));
    }

    static async getMeasurementById(id) {
        const { rows } = await pool.query('select * from measurements where id = $1', [id]);
        return new Measurement(rows[0]);
    }

    static async insert({ description }) {
        const { rows } = await pool.query('insert into measurements (description) values ($1) returning *', [description])
        return new Measurement(rows[0]);
    }

    static async update(id, attrs) {
        //since id can't be updated and description is the only field that can be updated
        // I am not making the call to get the original object
        const { description } = { ...attrs };
        const { rows } = await pool.query('update measurements set description=$2 where id=$1 returning *', [id, description])
        return new Measurement(rows[0]);
    }

    static async delete(id) {
        const { rows } = await pool.query('delete from measurements where id=$1 returning *', [id]);
        return new Measurement(rows[0]);
    }
}

module.exports = Measurement;