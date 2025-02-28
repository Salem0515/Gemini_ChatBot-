const API_KEY = 'sk-a1c4c78cde28451297bcb5fdf532a7c3';
const API_URL = 'https://api.deepseek.com/v1/chat/completions';

const generationConfig = {
  temperature: 1,
  max_tokens: 8192,
  top_p: 0.95,
  frequency_penalty: 0,
  presence_penalty: 0,
};

async function run(prompt, imageDescription = null) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        ...generationConfig,
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || 'Failed to get response');

    const textResponse = data.choices[0]?.message?.content || 'No response';

    if (imageDescription) {
      return `${textResponse}\n\nImage Description: ${imageDescription}`;
    }

    return textResponse;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

export default run;
