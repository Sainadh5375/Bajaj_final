const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Serve static HTML files
app.use(express.static(path.join(__dirname, 'html')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'html', 'index.html'));
});

app.post('/bfhl', (req, res) => {
    const data = req.body.data || [];
    const numbers = data.filter(item => /^\d+$/.test(item));
    const alphabets = data.filter(item => /^[a-zA-Z]+$/.test(item));
    const highestAlphabet = alphabets.reduce((max, item) => item.toLowerCase() > max.toLowerCase() ? item : max, '');

    const response = {
        is_success: true,
        user_id: "sai_nadh_reddy_07082004",
        email: "sainadhreddy_s@srmap.edu.in",
        roll_number: "AP21110010703",
        numbers: numbers,
        alphabets: alphabets,
        highest_alphabet: highestAlphabet ? [highestAlphabet] : []
    };

    console.log(`Stored data: ${data}`);
    res.json(response);
});

app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
