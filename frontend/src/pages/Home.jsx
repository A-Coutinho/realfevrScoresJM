import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import './../scss/app.scss';
import './../scss/home.scss';
import { useNavigate } from "react-router-dom";


const Home = () => {
    const navigate = useNavigate();
    function goPage(event) {
        event.preventDefault();
        navigate("/" + event.currentTarget.id);
    }

    return (        
        <div className='realfevrJM__home'>
            <div className='realfevrJM__home--listOfPages'>
                <div onClick={(event) => goPage(event)} id='AllRounds' className='listOfPages__weeklyRounds homeListContainer'>
                    <div className='listOfPages__weeklyRounds--image homeListImage'></div>
                    <div className='listOfPages__weeklyRounds--text homeListText'>Weekly Rounds</div>
                </div>

                <div onClick={(event) => goPage(event)} id='PlayerList' className='listOfPages__playerList homeListContainer'>
                    <div className='listOfPages__playerList--image homeListImage'></div>
                    <div className='listOfPages__playerList--text homeListText'>Teams List</div>
                </div>

                <div onClick={(event) => goPage(event)} id='RoundsWinners' className='listOfPages__playerWins homeListContainer'>
                    <div className='listOfPages__playerWins--image homeListImage'></div>
                    <div className='listOfPages__playerWins--text homeListText'>Weekly Winners</div>
                </div>

                <div onClick={(event) => goPage(event)} id='TotalPoints' className='listOfPages__currentRanking homeListContainer'>
                    <div className='listOfPages__currentRanking--image homeListImage'></div>
                    <div className='listOfPages__currentRanking--text homeListText'>Current Ranking</div>
                </div>
            </div>
        </div>
    )
}

export default Home