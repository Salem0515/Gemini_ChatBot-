import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = "AIzaSyCSZ6WDoMgRVFWrJgi-c-eeLXeN8J94Imk";
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

async function run(prompt) {
    const chatSession = model.startChat({
        generationConfig,
        // safetySettings: Adjust safety settings
        // See https://ai.google.dev/gemini-api/docs/safety-settings
        history: [],
    });

    try {
        const result = await chatSession.sendMessage(prompt);
        const textResponse = result.response.text(); // Corrected to get text from response
        console.log(textResponse); // Log the text response for debugging
        return textResponse; // Return the text response
    } catch (error) {
        console.error("Error sending message:", error); // Add error handling
        throw error; // Re-throw error to be caught by caller
    }
}

export default run;
