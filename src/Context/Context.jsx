import React, { createContext, useState } from "react";
import run from "../Confige/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [Input, setInput] = useState("");
    const [RecentPrompt, setRecentePrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [ResultData, setResultData] = useState("");
    const [conversations, setConversations] = useState([]); // Add state for conversations

    const delypara = (index, nextword) => {
        setTimeout(() => {
            setResultData(prev => prev + nextword);
        }, 65 * index);
    };

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    };

    const onSent = async ({ text, image }) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);

        let response;
        try {
            response = await run(text);
            setRecentePrompt(text);

            // Update the conversations state with the new message and its response
            setConversations(prev => [
                ...prev,
                { prompt: text, response, image } // Add image if available
            ]);

            let resonseArry = response.split("**");
            let newResponse = "";
            for (let i = 0; i < resonseArry.length; i++) {
                if (i === 0 || i % 2 !== 1) {
                    newResponse += resonseArry[i];
                } else {
                    newResponse += "<b>" + resonseArry[i] + "</b>";
                }
            }

            let newResponse2 = newResponse.split("*").join("<br/>");
            let newResponseArry = newResponse2.split(" ");

            for (let i = 0; i < newResponseArry.length; i++) {
                const nextword = newResponseArry[i];
                delypara(i, nextword + " ");
            }

            setLoading(false);
            setInput("");
            setImage(null); // Clear image after sending
        } catch (error) {
            console.error("Error sending message:", error);
            setLoading(false);
        }
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
        conversations // Provide conversations state to the context
    };

    return (
        <Context.Provider value={ContextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
