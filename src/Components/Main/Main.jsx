import React, { useContext } from 'react'
import './main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../Context/Context'

const Main = () => {


    const { onSent, RecentPrompt, showResult, Loading, ResultData, Input, setInput } = useContext(Context)

    const safeResultData = typeof ResultData === 'string' ? ResultData : '';


    return (


        <div className='main'>
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main_container">
                {!showResult ? <>
                    <div className="greet">
                        <p><span>Hello, Dev.</span></p>
                        <p>how can I help you today</p>
                    </div>
                    <div className="cards">
                        <div className="card">
                            <p>Suggest a beautiful place to see on the next upcoming road trip </p>
                            <img src={assets.compass_icon} alt="" />
                        </div>
                        <div className="card">
                            <p>Briefly summarize this concept: urban planning </p>
                            <img src={assets.bulb_icon} alt="" />
                        </div>
                        <div className="card">
                            <p>Brainstorm team bonding activities for our work retreat  </p>
                            <img src={assets.message_icon} alt="" />
                        </div>
                        <div className="card">
                            <p>improve the readability of the following code </p>
                            <img src={assets.code_icon} alt="" />
                        </div>
                    </div>
                </>
                    : <div className='result'>
                        <div className='titleResult'>
                            <img src={assets.user_icon} alt="" />
                            <p>{RecentPrompt}</p>
                        </div>
                        <div className="resultData">
                            <img src={assets.gemini_icon} alt="" />
                            {Loading ? <div className='loader'>
                                <hr />
                                <hr />
                                <hr />
                            </div> :
                                <p dangerouslySetInnerHTML={{ __html: ResultData || '' }}></p>

                            }

                        </div>
                    </div>
                }


                <div className="main_bottom">
                    <div className="search_box">
                        <input onChange={(e) => setInput(e.target.value)} value={Input} type="text" placeholder='Enter a prompt here' />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            {Input ? <img onClick={() => onSent()} src={assets.send_icon} alt="" /> : null}
                        </div>
                    </div>
                    <p className='bottom-info'>
                        Gemini may display inaccurate info, including about people, so double-check its resonses and Gemini Apps
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main