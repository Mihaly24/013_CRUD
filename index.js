const express = require('express');
let mysql = require('mysql2');
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Invaders_24',
    database: 'biodata',
    port: '3308'
});


db.connect((err) => {
    if (err) {
        console.log('Connection Error to Database:', err.stack);
        return;
    }
    console.log('Connected to Database');
});

app.get('api/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            req.statusCode(500).json({ error: 'Error fetching users:' });
            return;
        }
        res.json(results);
    })
});