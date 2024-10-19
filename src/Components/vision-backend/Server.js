const express = require('express');
const cors = require('cors');
const { v2 } = require('@google-cloud/vision');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();

// Enable CORS to allow requests from your frontend
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Google Cloud Vision client
const visionClient = new v2.ImageAnnotatorClient();

// API route to analyze images
app.post('/analyze-image', async (req, res) => {
    try {
        const { imageBase64 } = req.body;

        if (!imageBase64) {
            return res.status(400).json({ error: 'Image data is required' });
        }

        // Send the image to Google Vision API for label detection
        const [result] = await visionClient.annotateImage({
            image: { content: imageBase64 },
            features: [{ type: 'LABEL_DETECTION' }],
        });

        const labels = result.labelAnnotations.map(label => label.description);
        return res.status(200).json({ labels });
    } catch (error) {
        console.error('Error analyzing image:', error);
        return res.status(500).json({ error: 'Failed to analyze image' });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
