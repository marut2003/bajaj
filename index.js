const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { Buffer } = require('buffer');

// Middleware
app.use(bodyParser.json());

// Helper functions
const isAlphabet = (char) => /^[A-Za-z]+$/.test(char);
const isLowercase = (char) => /^[a-z]+$/.test(char);

// GET /bfhl endpoint
app.get('/bfhl', (req, res) => {
    res.json({
        "operation_code": 1
    });
});

// POST /bfhl endpoint
app.post('/bfhl', (req, res) => {
    const { data, file_b64 } = req.body;

    // Extract numbers and alphabets from the data array
    const numbers = data.filter(item => !isNaN(item)); // Filter numbers
    const alphabets = data.filter(item => isAlphabet(item)); // Filter alphabets

    // Find the highest lowercase alphabet
    const lowercaseAlphabets = alphabets.filter(char => isLowercase(char));
    const highestLowercaseAlphabet = lowercaseAlphabets.length ? [lowercaseAlphabets.sort().reverse()[0]] : [];

    // File Handling
    let fileValid = false, fileSizeKb = 0, fileMimeType = '';
    if (file_b64) {
        try {
            const buffer = Buffer.from(file_b64, 'base64');
            fileValid = true;
            fileSizeKb = (buffer.length / 1024).toFixed(2); // File size in KB
            fileMimeType = 'image/png'; // Hardcoded for simplicity
        } catch (error) {
            fileValid = false;
        }
    }

    res.json({
        "is_success": true,
        "user_id": "your_name_22092024",  // Replace with actual logic to generate user_id
        "email": "your_college_email@example.com",  // Replace with actual email
        "roll_number": "ABCD123",  // Replace with actual roll number
        "numbers": numbers,
        "alphabets": alphabets,
        "highest_lowercase_alphabet": highestLowercaseAlphabet,
        "file_valid": fileValid,
        "file_mime_type": fileMimeType,
        "file_size_kb": fileSizeKb
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
