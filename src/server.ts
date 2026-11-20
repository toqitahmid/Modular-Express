import express, {
  json,
  type Application,
  type Request,
  type Response,
} from "express";
import { Pool } from "pg";

const app: Application = express();
app.use(express.json());
const PORT = 5000;

const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_AjI7mdKwCf1n@ep-lively-butterfly-azxjk2lx.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
});

const initDB = async () => {
  try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        age INT,
        is_Active BOOLEAN DEFAULT true,

        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        );
        `);
  } catch (error) {
    console.log(error);
  }
};
initDB();

app.post("/api/v1/users", async(req, res) => {
  try {
    const { name, email, password, age } = req.body;

    const result = await pool.query(
      `
      INSERT INTO users (name, email, password, age) VALUES ($1,$2,$3,$4) RETURNING*
      `,
      [name, email, password, age],
    );

    res.status(201).json({
      success: true,
      message: "User created successfully!",
      data: result.rows[0],
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
    } else {
      res.status(500).json({
        success: true,
        message: "User not created!!",
      });
    }
  }
});

app.get("/api/v1/users", async(req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM users
    `);

    res.status(200).json({
      success: true,
      message: "All users successfully retrived",
      data: result.rows,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json(error);
    } else {
      res.status(500).json({
        success: false,
        message: "Users can't retrived",
      });
    }
  }
});

app.get("/api/v1/users/:id", async(req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT * FROM users WHERE id=$1`,
      [id],
    );

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "User successfully retraived!",
      data: result.rows[0]
    });
  } catch (error) {

    if (error instanceof Error) {
      res.status(500).json(error);
    } 
    else {
      res.status(500).json({
        success: false,
        message: "User not found!",
      });
    }
  }
});

app.put("/api/v1/users/:id", async(req,res) => {
  try{
    const {id} = req.params;
    const {name, is_Active, password, age} = req.body;
    const result = await pool.query(`
      UPDATE users
      SET
      name = COALESCE($1, name),
      password = COALESCE($2, password),
      age = COALESCE($3, age),
      is_Active = COALESCE($4,  is_Active),
      updated_at = NOW()
      WHERE id=$5 RETURNING *
      `,
    [name ?? null, password ?? null, age ?? null, is_Active ?? null, id]);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found!!",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: result.rows[0],
    });
  }
  catch(error){
    res.status(500).json({
      success: false,
      message: error,
      error: error,
    });
  }
})

app.delete("/api/v1/users/:id", async(req,res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `
      DELETE FROM users WHERE id=$1
      `,
      [id],
    );
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found!!",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      // data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
})

app.get("/", (req: Request, res: Response) => {
  console.log(req.body);
  res.status(200).json({ id: 101, author: "Araf", designation: "Jr. SWE" });
});

app.listen(PORT, () => {
  console.log(`Here is your new Express Server running on ${PORT} port!!!`);
  console.log(`Here is your new Express Server running on ${PORT} port!!!`);
  console.log(`Here is your new Express Server running on ${PORT} port!!!`);
  console.log(`Here is your new Express Server running on ${PORT} port!!!`);
});
