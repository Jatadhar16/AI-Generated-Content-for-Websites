const express = require('express');
const { spawn } = require('child_process');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Route to generate AI-based content
app.post('/api/generate-content', (req, res) => {
    const userPreferences = req.body.preferences;

    // Spawn a Python process to run the AI model
    const pythonProcess = spawn('python', ['ai_model.py', JSON.stringify(userPreferences)]);

    // Capture the Python output
    pythonProcess.stdout.on('data', (data) => {
        const generatedContent = data.toString();
        res.json({ content: generatedContent });
    });

    pythonProcess.stderr.on('data', (error) => {
        console.error(`Error from Python: ${error}`);
        res.status(500).json({ error: 'AI content generation failed' });
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
