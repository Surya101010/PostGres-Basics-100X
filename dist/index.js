import { Client } from 'pg';
import express from "express";
const app = express();
app.use(express.json());
const pgClient = new Client({
    user: "neondb_owner",
    password: "npg_W2e0XKMmpTzh",
    port: 5432,
    host: "ep-summer-resonance-a4foc45s-pooler.us-east-1.aws.neon.tech",
    database: "neondb",
    ssl: true
});
pgClient.connect();
app.post("/signup", async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const city = req.body.city;
    const country = req.body.country;
    const street = req.body.street;
    const pincode = req.body.pincode;
    try {
        const insertQuery = `INSERT INTO users (username,email,password) VALUES ( $1,$2,$3) RETURNING id;`;
        const addressInsertQuery = `INSERT INTO addresses (city, country,street,pincode,user_id) VALUES ($1,$2,$3,$4,$5);`;
        await pgClient.query("BEGIN;");
        const response = await pgClient.query(insertQuery, [username, email, password]);
        // console.log(response.rows[0].id)
        const user_id = response.rows[0].id;
        const addressresponse = await pgClient.query(addressInsertQuery, [city, country, street, pincode, user_id]);
        await pgClient.query("COMMIT;");
        res.json({
            message: "You are signed up"
        });
    }
    catch (error) {
        res.json({
            message: "error"
        });
    }
});
app.listen(3000);
// async function a(){
//     await pgClient.connect();
//     const response = await pgClient.query("SELECT * FROM users;")
//     console.log(response.rows);
// }
// a();
//# sourceMappingURL=index.js.map