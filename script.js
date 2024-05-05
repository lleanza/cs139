function getResponse() {
    const apiKey = document.getElementById('apiKey').value.trim();
    const prompt = document.getElementById('prompt').value.trim();

    // Check if the API key and prompt are provided
    if (!apiKey || !prompt) {
        alert('Please provide both the ChatGPT API key and a prompt.');
        return;
    }

    // Call the ChatGPT API
    fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: 'text-davinci-003',
            prompt: prompt,
            max_tokens: 100,
        }),
    })
    .then(response => response.json())
    .then(data => {
        const responseDiv = document.getElementById('response');
        responseDiv.innerHTML = `<p><strong>Response:</strong> ${data.choices[0].text.trim()}</p>`;
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
}