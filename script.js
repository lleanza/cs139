// Pre-prompt ChatGPT with a message
function prePromptChatGPT(apiKey) {
    const prePrompt = "Hello, ChatGPT!"; // The message you want to pre-prompt ChatGPT with

    fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: 'text-davinci-003',
            prompt: prePrompt,
            max_tokens: 100,
        }),
    })
    .then(response => response.json())
    .then(data => {
        // Discard ChatGPT's response
        console.log("Pre-prompt response:", data.choices[0].text.trim());
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function getUserAPIKey() {
    let apiKey = null;
    while (!apiKey) {
        apiKey = prompt("Please enter your ChatGPT API Key:");
        if (apiKey === null) {
            alert("API key is required to proceed.");
        }
    }
    prePromptChatGPT(apiKey); // Call prePromptChatGPT function with the entered API key
}

// Get user input and prompt ChatGPT with it
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

// Call getUserAPIKey function when the page loads
document.addEventListener('DOMContentLoaded', getUserAPIKey);
