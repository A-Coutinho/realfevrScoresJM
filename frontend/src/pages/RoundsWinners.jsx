import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './../scss/app.scss';
import './../scss/roundsWinners.scss';
import { useNavigate } from "react-router-dom";

const RoundsWinners = () => {
    const [points, setPoints] = useState([]);
    const [pointsWinners, setPointsWinners] = useState([]);
    const [isWeeklyWinners, setIsShown] = useState(false);
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
                    const res = await axios.get("https://antonioapp.noslined.com.br/authToken", { headers: headerAxios });
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
            const fetchWeeklyList = async () => {
                try {
                    const res = await axios.get("https://antonioapp.noslined.com.br/roundsWinnersSec", headerAxios);
                    setPoints(res.data);
                } catch (err) {
                    console.log(err);
                }
            };
            fetchWeeklyList();

            const fetchWeeklyWinnersList = async () => {
                try {
                    const res = await axios.get("https://antonioapp.noslined.com.br/roundsWinnersByTimesSec", headerAxios);
                    setPointsWinners(res.data);
                } catch (err) {
                    console.log(err);
                }
            };
            fetchWeeklyWinnersList();
        };
    }, [token]);

    function goHome(event) {
        event.preventDefault();
        navigate("/");
    }

    function changeList(event) {
        event.preventDefault();
        setIsShown(current => !current);
    }

    function goBackToList(event) {
        event.preventDefault();
        setIsShown(current => !current);
    }

    return (
        <div className='realfevrJM__roundsWinners'>
            <div className='realfevrJM__roundsWinners--title'>
            </div>
            <div className='realfevrJM__roundsWinners--data'>
                <div className='data__table'>
                    <div className="data__table--container">
                        <table>
                            <thead>
                                <tr>
                                    <th className='round'>#</th>
                                    <th className='team'>Team</th>
                                    <th className='points'>Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {points.map((item, index) => (
                                    <tr key={index + 1}>
                                        <td className='round'>{index + 1}</td>
                                        <td className='team'>{item["NAME"]}</td>
                                        <td className='points'>{item["points"]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {isWeeklyWinners && (<div className='data__table'>
                    <div className="data__table--container">
                        <table>
                            <thead>
                                <tr>
                                    <th className='team'>Team</th>
                                    <th className='wins'>Wins</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pointsWinners.map((item, index) => (
                                    <tr key={index}>
                                        {Object.values(item).map((val, index) => (
                                            <td key={index} className={'index' + index}>{val}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>)}
            </div>
            {!isWeeklyWinners && (<div className='jmButton'><button onClick={(event) => changeList(event)}>Show weekly winners</button></div>)}
            {isWeeklyWinners && (<div className='jmButton'><button onClick={(event) => goBackToList(event)}>Hide weekly winners</button></div>)}
            <div className='jmButton'><button onClick={(event) => goHome(event)}>Home</button></div>
        </div>
    )
}

export default RoundsWinners