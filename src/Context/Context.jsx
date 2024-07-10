import { createContext, useState } from "react";
import run from "../Confige/Gemini";

export const Context = createContext(); // Export the context

const ContextProvider = (props) => {

    const [Input, setInput] = useState("");
    const [RecentPrompt, setRecentePrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [ResultData, setResultData] = useState("");

    const delypara = (index, nextword) => {
        setTimeout(function () {

            setResultData(prev => prev + nextword);

        }, 65 * index)

    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);

    }

    const onSent = async (prompt) => {

        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;
        if (prompt !== undefined) {
            response = await run(prompt);
            setRecentePrompt(prompt);
        }
        else {
            setPrevPrompt(prev => [...prev, Input])
            setRecentePrompt(Input)
            response = await run(Input)
        }

        let resonseArry = response.split("**");
        let newResponse = "";
        for (let i = 0; i < resonseArry.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += resonseArry[i];
            }
            else {
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
    }



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



    }

    return (
        <Context.Provider value={ContextValue}>
            {props.children}
        </Context.Provider>

    )

}


export default ContextProvider