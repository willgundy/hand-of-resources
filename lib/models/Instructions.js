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

    static async getInstructionById(id) {
        const { rows } = await pool.query('select * from instructions where id=$1', [id]);
        return new Instruction(rows[0]);
    }

    static async insert({ recipeId, stepNumber, description }) {
        const { rows } = await pool.query(`insert into instructions 
                                            ("recipeId", "stepNumber", description)
                                            values ($1, $2, $3) returning *`,
                                            [recipeId, stepNumber, description]);
        return new Instruction(rows[0]);
    }

    static async updateInstruction(id, attrs) {
        const instruction = await Instruction.getInstructionById(id);
        if (!instruction) return null;
        const { recipeId, stepNumber, description } = { ...instruction, ...attrs };
        const { rows } = await pool.query(`update instructions set
                                            "recipeId"=$2, "stepNumber"=$3, description=$4
                                            where id=$1 returning *`,
                                            [id, recipeId, stepNumber, description]);
        return new Instruction(rows[0]);
    }

}

module.exports = Instruction;