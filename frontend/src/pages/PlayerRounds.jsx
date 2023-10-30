import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import './../scss/app.scss';
import './../scss/playerRounds.scss';
import { useNavigate } from "react-router-dom";

const PlayerRounds = () => {
    const [points, setPoints] = useState([]);
    const [player, setPlayer] = useState([]);
    const params = useParams();
    const axiosURL = "http://localhost:8800/playerRounds/" + params.player;
    const axiosURLPlayer = "http://localhost:8800/players/" + params.player;
    const navigate = useNavigate();

    function goHome(event) {
        event.preventDefault();
        navigate("/");
    }

    useEffect(() => {
        const fetchAllPoints = async () => {
            try {
                const res = await axios.get(axiosURL);
                setPoints(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllPoints();
    }, []);

    useEffect(() => {
        const fetchPlayer = async () => {
            try {
                const res = await axios.get(axiosURLPlayer);
                setPlayer(res.data[0]["name"]);
            } catch (err) {
                console.log(err);
            }
        };
        fetchPlayer();
    }, []);

    return (
        <div>
            <div className='realfevrJM__playerRounds'>
                <div className='realfevrJM__playerRounds--title'>
                    <header className='title--header'>
                        <p>Realfevr JustMansos</p>
                    </header>
                    <div>Score for</div><h3>{player}</h3>
                </div>
                <div className='realfevrJM__playerRounds--data'>
                    <div className='data__table'>
                        <div className="data__table--container">
                            <table>
                                <thead>
                                    <tr>
                                        <th className='round'>Round</th>
                                        <th className='points'>Points</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {points.map((item, index) => (
                                        <tr key={index}>
                                            {Object.values(item).map((val, index) => (
                                                <td key={index} className={'index' + index}>{val}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='jmButton'><button onClick={(event) => goHome(event)}>Home</button></div>
            </div>
        </div>
    )
}

export default PlayerRounds