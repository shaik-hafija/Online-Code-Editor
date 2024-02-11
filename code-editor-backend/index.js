const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const cors=require('cors');
const { log } = require('console');
const app = express();
const PORT = process.env.PORT || 3100;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests only from localhost:3000
    credentials: true // Allow sending cookies with the request (if needed)
  }));
  
// API Endpoint for code execution
app.post('/execute', (req, res) => {
    const { code, language } = req.body;
    // console.log("backend",code,language)

    // Execute code based on language
    if (language === 'javascript') {
        console.log("java",code,language)

        exec(`node -e "${code}"`, (error, stdout, stderr) => {
            console.log(stderr);
            console.log(stdout);
            if (error) {
                res.status(500).json({ error: stderr });
            } else {
                res.status(200).json({ output: stdout });
            }
        });
    } else if (language === 'python') {
        exec(`python -c "${code}"`, (error, stdout, stderr) => {
            if (error) {
                res.status(500).json({ error: stderr });
            } else {
                res.status(200).json({ output: stdout });
            }
        });
    } else {
        res.status(400).json({ error: 'Unsupported language' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
