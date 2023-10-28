import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import './../scss/app.scss';
import './../scss/playerList.scss';
import { useNavigate } from "react-router-dom";


const PlayerList = () => {
    const [players, setPlayers] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchPlayerList = async () => {
            try {
                const res = await axios.get("http://localhost:8800/listOfPlayers");
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

    return (
        <div className='realfevrJM__playerList'>
            <div className='realfevrJM__playerList--listOfPlayers'>

                {players.map((item, index) => (
                    <div  className="listOfPlayers_list" key={index} id={item["id"]} onClick={(event) => playerClick(event, item["id"])}>
                        <div className="listOfPlayers_list--name">{item["name"]}</div>
                        <div className="listOfPlayers_list--username">{item["username"]}</div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default PlayerList