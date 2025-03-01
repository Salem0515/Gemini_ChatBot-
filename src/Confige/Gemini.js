import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = "AIzaSyCmP_Q3Odp7zpH6nWoymya1oAkD5LEqoZo"; // Keep your API key secure and consider using environment variables
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

async function run(prompt, imageDescription = null) {
    const chatSession = model.startChat({
        generationConfig,
        // safetySettings: Adjust safety settings
        // See https://ai.google.dev/gemini-api/docs/safety-settings
        history: [], // You may want to maintain history for context
    });

    try {
        const result = await chatSession.sendMessage(prompt);
        const textResponse = result.response.text(); // Get text from response
        console.log(textResponse); // Log the text response for debugging

        // If there's an image description, you can include it in your response
        if (imageDescription) {
            const combinedResponse = `${textResponse}\n\nImage Description: ${imageDescription}`;
            return combinedResponse; // Return combined response if an image description is provided
        }

        return textResponse; // Return the text response
    } catch (error) {
        console.error("Error sending message:", error); // Add error handling
        throw error; // Re-throw error to be caught by caller
    }
}

export default run;
