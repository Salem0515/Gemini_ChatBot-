import React, { useContext, useState, useRef } from 'react';
import './main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../Context/Context';

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
            setImage(URL.createObjectURL(file));
        }
    };

    const handlePictureClick = () => {
        fileInputRef.current.click();
    };

    const sendMessage = () => {
        if (Input.trim() || image) {
            onSent({ text: Input, image });
            setInput("");
            setImage(null);
        }
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
                    <p>how can I help you today</p>
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
                                <p dangerouslySetInnerHTML={{ __html: conv.response || '' }}></p>
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
}

export default Main;
