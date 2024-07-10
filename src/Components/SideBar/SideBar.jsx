import React, { useContext, useState } from 'react'
import './SideBar.css'
import { assets } from '../../assets/assets.js'
import { Context } from '../../Context/Context.jsx';
const SideBar = () => {

    const [extanded, setextanded] = useState(false);


    const { onSent, prevPrompt, setRecentePrompt, newChat } = useContext(Context);


    const loadprompt = async (prompt) => {
        setRecentePrompt(prompt);
        await onSent(prompt)
    }



    return (
        <div className='sidebar'>
            <div className="top">
                <img onClick={() => setextanded(prev => !prev)} className='menu' src={assets.menu_icon} alt="" />
                <div onClick={() => newChat()} className="new_chat">
                    <img src={assets.plus_icon} alt="" />
                    {extanded ? <p>New Chat</p> : null}
                </div>
                {extanded ?
                    <div className="recent">
                        <p className='title'>Recent</p>
                        {prevPrompt.map((item, index) => {
                            return (
                                <div onClick={() => loadprompt(item)} className="renet_entry">
                                    <img src={assets.message_icon} alt="" />
                                    <p>{item.slice(0, 18)}...</p>
                                </div>
                            )
                        })}

                    </div>
                    : null
                }

            </div>
            <div className="bottom">
                <div className="bottom_item renet_entry">
                    <img src={assets.question_icon} alt="" />
                    {extanded ? <p>Help</p> : null}
                </div>
                <div className="bottom_item renet_entry">
                    <img src={assets.history_icon} alt="" />
                    {extanded ? <p>Activity</p> : null}

                </div>
                <div className="bottom_item renet_entry">
                    <img src={assets.setting_icon} alt="" />
                    {extanded ? <p>Settings</p> : null}

                </div>


            </div>
        </div>
    )
}

export default SideBar