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
}

module.exports = Measurement;