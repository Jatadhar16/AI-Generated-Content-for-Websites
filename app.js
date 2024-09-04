import React, { useState } from 'react';

function App() {
    const [preferences, setPreferences] = useState({ interest: 'technology', category: 'blog' });
    const [content, setContent] = useState('');

    const handleGenerateContent = async () => {
        try {
            const response = await fetch('/api/generate-content', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ preferences }),
            });

            const data = await response.json();
            setContent(data.content);
        } catch (error) {
            console.error('Error generating content:', error);
        }
    };

    return (
        <div className="App">
            <h1>Dynamic AI-Generated Content</h1>
            <button onClick={handleGenerateContent}>Generate Content</button>
            {content && <p>{content}</p>}
        </div>
    );
}

export default App;
