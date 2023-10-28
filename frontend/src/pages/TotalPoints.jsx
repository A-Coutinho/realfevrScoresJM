import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './../scss/app.scss';

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
            <div className='justMansos'>
                <div className='justMansos__title'>
                    <header className='justMansos__title--header'>
                        <p>Realfevr JustMansos Standings</p>
                    </header>
                </div>
                <div className='justMansos__data'>
                    <div className='justMansos__data--totalPoints'>
                        <div className='justMansos__table'>
                            <div className="justMansos__table--container">
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
                                                <td onClick={(event) => handleSubmit(event, item["ID"])}>{item["TEAM"]}</td>
                                                <td>{item["TOTAL"]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='jmButton'><button onClick={(event) => goHome(event)}>Go Home</button></div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default TotalPoints