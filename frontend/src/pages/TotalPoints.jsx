import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './../scss/app.scss';
import './../scss/totalPoints.scss';

const TotalPoints = () => {

    //#region const
    const [points, setPoints] = useState([]);
    const navigate = useNavigate();
    //#endregion const

    useEffect(() => {
        const fetchAllPoints = async () => {
            try {
                const res = await axios.get("http://localhost:8800/totalPoints");
                setPoints(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllPoints();
    }, []);

    //#region functions
    function handleSubmit(event, playerID) {
        event.preventDefault();
        var urlToGo = "/playerRounds/" + playerID;
        navigate(urlToGo);
    }

    function goHome(event) {
        event.preventDefault();
        navigate("/");
    }
    //#endregion functions

    return (
        <div>
            <div className='realfevrJM__totalPoints'>
                <div className='realfevrJM__totalPoints--title'>
                    <header className='title--header'>
                        <p>Realfevr JustMansos Standings</p>
                    </header>
                </div>
                <div className='realfevrJM__totalPoints--data'>
                    <div className='data__table'>
                        <div className="data__table--container">
                            <table>
                                <thead>
                                    <tr>
                                        <th className='team'>Team</th>
                                        <th className='points'>Total Points</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {points.map((item, index) => (
                                        <tr key={item["ID"]}>
                                            <td className='team' onClick={(event) => handleSubmit(event, item["ID"])}>{item["TEAM"]}</td>
                                            <td className='points'>{item["TOTAL"]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='jmButton'><button onClick={(event) => goHome(event)}>Go Home</button></div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default TotalPoints