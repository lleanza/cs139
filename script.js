// script.js

function getResponse() {
    // Get the API key and prompt from the input fields
    var apiKey = document.getElementById('apiKey').value;
    var prompt = document.getElementById('prompt').value;

    // Make sure the API key and prompt are not empty
    if (!apiKey || !prompt) {
        alert('Please enter both API key and prompt.');
        return;
    }

    // Make a POST request to the ChatGPT API
    fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey,
        },
        body: JSON.stringify({
            model: 'text-davinci-003', // You can use other models like text-davinci-003 for better results
            prompt: prompt,
            max_tokens: 100, // Adjust this as per your requirement
        }),
    })
    .then(response => response.json())
    .then(data => {
        // Display the response in the response div
        document.getElementById('response').innerText = data.choices[0].text.trim();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
