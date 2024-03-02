document.getElementById('uploadButton').addEventListener('click', function() {
    const imageInput = document.getElementById('imageInput');
    if (imageInput.files.length > 0) {
        const file = imageInput.files[0];
        analyzeImage(file);
    } else {
        alert('Please select an image.');
    }
});

async function analyzeImage(imageFile) {
    try {
        // Convert the image file to a base64 string
        const base64Image = await toBase64(imageFile);

        // Prepare the prompt for OpenAI
        const prompt = `What is this person's emotional state?`;

        // Call the OpenAI API
        const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_OPENAI_API_KEY' // Replace with your API key
            },
            body: JSON.stringify({
                prompt: prompt,
                max_tokens: 60
            })
        });

        const data = await response.json();
        document.getElementById('result').innerText = data.choices[0].text;
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while analyzing the image.');
    }
}

function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
