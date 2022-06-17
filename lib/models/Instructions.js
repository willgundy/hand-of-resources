const pool = require('../utils/pool');

class Instruction {
    id;
    recipeId;
    stepNumber;
    description;

    constructor(instruction) {
        this.id = instruction.id;
        this.recipeId = instruction.recipeId;
        this.stepNumber = instruction.stepNumber;
        this.description = instruction.description;
    }

    static async getAll() {
        const { rows } = await pool.query('select * from instructions');
        return rows.map((row) => new Instruction(row));
    }


}

module.exports = Instruction;