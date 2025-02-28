import React, { createContext, useState } from "react";
import run from "../Confige/DeepSeek"; // Updated to DeepSeek config

export const Context = createContext();

const ContextProvider = (props) => {
    const [Input, setInput] = useState("");
    const [RecentPrompt, setRecentePrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [ResultData, setResultData] = useState("");
    const [conversations, setConversations] = useState([]); // State for conversations

    const delypara = (index, nextword) => {
        setTimeout(() => {
            setResultData(prev => prev + nextword);
        }, 65 * index);
    };

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    };

    const onSent = async ({ text, image, imageDescription }) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);

        try {
            const response = await run(text); // Use DeepSeek's run function
            setRecentePrompt(text);

            // Update conversations with the new prompt and response
            setConversations(prev => [
                ...prev,
                { prompt: text, response: imageDescription ? `${response} (Image: ${imageDescription})` : response, image }
            ]);

            setLoading(false);
            setInput("");
        } catch (error) {
            console.error("Error sending message:", error);
            setLoading(false);
        }
    };

    const formatResponse = (response) => {
        let formattedResponse = response.replace(/(?:\*\*(.*?)\*\*)/g, "<b>$1</b>");
        formattedResponse = formattedResponse.replace(/(?:\*(.*?)\*)/g, "<br>$1");
        return formattedResponse;
    };

    const ContextValue = {
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentePrompt,
        RecentPrompt,
        showResult,
        Loading,
        ResultData,
        Input,
        setInput,
        newChat,
        conversations
    };

    return (
        <Context.Provider value={ContextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
