import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import './../scss/app.scss';
import './../scss/playerRounds.scss';
import { useNavigate } from "react-router-dom";
import Charts from './charts/Line.tsx';


const PlayerRounds = () => {
    const [points, setPoints] = useState([]);
    const [player, setPlayer] = useState([]);
    const [averagePoints, setAveragePoints] = useState([]);
    const params = useParams();
    const navigate = useNavigate();
    const [showChart, setShowChart] = useState(false);
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

    function goHome(event) {
        event.preventDefault();
        navigate("/");
    }

    function getAverage(valuesList) {
        const sum = valuesList.reduce((a, b) => a + b, 0);
        const avg = (sum / valuesList.length) || 0;
        setAveragePoints(avg.toFixed());
    }

    function manageChart(event) {
        event.preventDefault();
        setShowChart(current => !current);
    }

    useEffect(() => {
        if (token !== null) {
        const headerAxios = { headers: { "authorization": `Bearer ` + token } };
        const axiosURL = "http://server2.noslined.com.br:9090/playerRoundsSec/" + params.player;
            const fetchAllPoints = async () => {
                try {
                    const res = await axios.get(axiosURL, headerAxios);
                    setPoints(res.data);
                    getAverage(res.data.map(p => p.points));
                } catch (err) {
                    console.log(err);
                }
            };
            fetchAllPoints();

            const axiosURLPlayer = "http://server2.noslined.com.br:9090/playersSec/" + params.player;
            const fetchPlayer = async () => {
                try {
                    const res = await axios.get(axiosURLPlayer, headerAxios);
                    setPlayer(res.data[0]["name"]);
                } catch (err) {
                    console.log(err);
                }
            };
            fetchPlayer();
        };
    }, [params, token]);

    return (
        <div>
            <div className={`realfevrJM__playerRounds ${showChart}`}>
                <div className='realfevrJM__playerRounds--title'>
                    <h3>{player}</h3>
                    <h4>AVG {averagePoints} points</h4>
                </div>
                {showChart && (<Charts Points={points} />)}
                <div className='realfevrJM__playerRounds--data'>
                    {!showChart && (<div className='data__table'>
                        <div className="data__table--container">
                            <table>
                                <thead>
                                    <tr>
                                        <th className='round'>#</th>
                                        <th className='points'>Points</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {points.map((item, index) => (
                                        <tr key={index + 1}>
                                            <td className='round'>Week {index + 1}</td>
                                            <td className='points'>{item["points"]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>)}
                    <div className='jmButton onlyDesktop'><button onClick={(event) => manageChart(event)}>Toggle Chart</button></div>
                    <div className='jmButton'><button onClick={(event) => goHome(event)}>Home</button></div>
                </div>
            </div>
        </div>
    )
}

export default PlayerRounds