import React, { useContext, useState, useRef } from 'react';
import './main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../Context/Context';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow as style } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Example style
import axios from 'axios'; // Make sure to install axios with `npm install axios`

const Main = () => {
    const { onSent, conversations, Loading, Input, setInput } = useContext(Context);
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && Input.trim()) {
            sendMessage();
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); // Set image as Base64 URL
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePictureClick = () => {
        fileInputRef.current.click();
    };

    const analyzeImage = async (imageBase64) => {
        try {
            const response = await axios.post('http://localhost:3000/analyze-image', {
                imageBase64: imageBase64.split(',')[1], // Get only the base64 string part
            });
            return response.data.labels.join(', '); // Assuming the response contains labels
        } catch (error) {
            console.error("Error analyzing image:", error);
            return "Failed to analyze image";
        }
    };

    const sendMessage = async () => {
        if (Input.trim() || image) {
            const imageDescription = image ? await analyzeImage(image) : ''; // Get image description if an image is present
            onSent({ text: Input, image, imageDescription }); // Send both text and image description
            setInput("");
            setImage(null);
        }
    };

    const renderMessage = (message) => {
        const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g; // Updated regex to capture language
        const parts = message.split(codeBlockRegex);

        return parts.map((part, index) => {
            // If it's a code block (even index indicates non-code part)
            if (index % 3 === 2) {
                const language = parts[index - 1] || 'plaintext'; // Get language
                const code = part;

                return (
                    <div className="code-block-container" key={index}>
                        <div className="code-block-header">
                            <span className="code-language">{language.toUpperCase()}</span>
                            <button className="copy-button" onClick={() => copyToClipboard(code)}>
                                Copy
                            </button>
                        </div>
                        <SyntaxHighlighter language={language} style={style}>
                            {code}
                        </SyntaxHighlighter>
                    </div>
                );
            } else {
                // Regular text
                return <span key={index}>{part}</span>;
            }
        });
    };

    const copyToClipboard = (code) => {
        navigator.clipboard.writeText(code).then(() => {
            alert("Code copied to clipboard!");
        }).catch(err => {
            console.error("Failed to copy: ", err);
        });
    };

    return (
        <div className='main'>
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main_container">
                <div className="greet">
                    <p><span>Hello, Dev.</span></p>
                    <p>How can I help you today?</p>
                </div>
                <div className="conversation-list">
                    {conversations.map((conv, index) => (
                        <div key={index} className='conversation'>
                            <div className='titleResult'>
                                <img src={assets.user_icon} alt="" />
                                <p>{conv.prompt}</p>
                            </div>
                            <div className="resultData">
                                <img src={assets.gemini_icon} alt="" />
                                <div className="juster">
                                    <div className="response-text">
                                        {renderMessage(conv.response || '')}
                                    </div>
                                    {conv.image && <img src={conv.image} alt="Attachment" className="attachment-image" />}
                                </div>
                            </div>
                        </div>
                    ))}
                    {Loading && <div className='loader'>
                        <hr />
                        <hr />
                        <hr />
                    </div>}
                </div>
                <div className="main_bottom">
                    <div className="search_box">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            value={Input}
                            type="text"
                            placeholder='Enter a prompt here'
                            onKeyDown={handleKeyDown}
                        />
                        {image && <img src={image} alt="Selected" className="preview-image" />}
                        <div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                            <img
                                src={assets.gallery_icon}
                                alt="Attach"
                                onClick={handlePictureClick}
                                style={{ cursor: 'pointer' }}
                            />
                            <img src={assets.mic_icon} alt="" />
                            {(Input || image) && <img onClick={sendMessage} src={assets.send_icon} alt="" />}
                        </div>
                    </div>
                    <p className='bottom-info'>
                        Gemini may display inaccurate info, including about people, so double-check its responses and Gemini Apps
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;
