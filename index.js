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

app.post('/api/users', (req, res) => {
    const { nama, nim, kelas } = req.body;

    if (!nama || !nim || !kelas) {
        return res.status(400).json({ error: 'Tolong isi nama, NIM, dan kelas' });
    }

    db.query(
        'INSERT INTO users (nama, nim, kelas) VALUES (?, ?, ?)',
        [nama, nim, kelas],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Database Error' });
            }
            res.status(201).json({ message: 'User added successfully'});
        }
    );
});

app.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const { nama, nim, kelas } = req.body;
    db.query(
        'UPDATE mahasiswa SET nama = ?, nim = ?, kelas = ? WHERE id = ?',
        [nama, nim, kelas, userId],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Database Error' });
            }
            res.json({ message: 'User updated successfully' });
        }
    );
});