import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './../scss/app.scss';
import './../scss/playerList.scss';
import { useNavigate } from "react-router-dom";


const PlayerList = () => {
    const [players, setPlayers] = useState([]);
    const navigate = useNavigate();
    const [token, setToken] = useState(null);

    useEffect(() => {
        const getToken = async () => {
            if (token === null) {
                try {
                    const headerAxios = {
                        "Authorization": `Bearer ` + process.env.REACT_APP_JWTKEYDOCARALHO,
                        "userid": process.env.REACT_APP_JWTUSRDOCARALHO,
                        "passw": process.env.REACT_APP_JWTPWDDOCARALHO
                    }
                    const res = await axios.get("http://server2.noslined.com.br:9090/authToken", { headers: headerAxios });
                    setToken(res.data.token);
                } catch (err) {
                    console.log(err);
                }
            };
        }
        getToken();
    }, [token]);

    useEffect(() => {
        if (token !== null) {
        const headerAxios = { headers: { "authorization": `Bearer ` + token } };
        const fetchPlayerList = async () => {
                try {
                    const res = await axios.get("http://server2.noslined.com.br:9090/listOfPlayersSec", headerAxios);
                    setPlayers(res.data);
                } catch (err) {
                    console.log(err);
                }
            };
            fetchPlayerList();
        };
    }, [token]);

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
                    <div className="listOfPlayers_list" key={index} id={item["id"]} onClick={(event) => playerClick(event, item["id"])}>
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