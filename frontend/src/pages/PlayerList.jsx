import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './../scss/app.scss';
import './../scss/playerList.scss';
import { useNavigate } from "react-router-dom";


const PlayerList = () => {
    const [players, setPlayers] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchPlayerList = async () => {
            try {
                const res = await axios.get("http://server2.noslined.com.br:9090/listOfPlayers");
                setPlayers(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchPlayerList();
    }, []);

    function playerClick(event, playerID) {
        event.preventDefault();
        navigate("/playerRounds/" + playerID);
    }

    function goHome(event) {
        event.preventDefault();
        navigate("/");
    }

    return (
        <div className='realfevrJM__playerList'>
            <div className='realfevrJM__playerList--listOfPlayers'>

                {players.map((item, index) => (
                    <div  className="listOfPlayers_list" key={index} id={item["id"]} onClick={(event) => playerClick(event, item["id"])}>
                        <div className='listOfPlayers_list--icon'></div>
                        <div className="listOfPlayers_list--name">{item["name"]}</div>
                        <div className="listOfPlayers_list--username">{item["username"]}</div>
                    </div>
                ))}

            </div>
            <div className='jmButton buttons__container--next'><button onClick={(event) => goHome(event)}>Home</button></div>
        </div>
    )
}

export default PlayerList