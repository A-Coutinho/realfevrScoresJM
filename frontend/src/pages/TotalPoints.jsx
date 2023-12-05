import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './../scss/app.scss';
import './../scss/totalPoints.scss';

const TotalPoints = () => {

    //#region const
    const [points, setPoints] = useState([]);
    const [token, setToken] = useState(null);
    const navigate = useNavigate();
    //#endregion const

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
        const fetchAllPoints = async () => {
            if (token !== null) {
                try {
                    const headerAxiosPoints = { headers: { "authorization": `Bearer ` + token } };
                    const res = await axios.get("https://antonioapp.noslined.com.br/totalPointsSec", headerAxiosPoints);
                    setPoints(res.data);
                } catch (err) {
                    console.log(err);
                }
            };
        }
        fetchAllPoints();
    }, [token]);

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
                </div>
                <div className='realfevrJM__totalPoints--data'>
                    <div className='data__table'>
                        <div className="data__table--container">
                            <table>
                                <thead>
                                    <tr>
                                        <th className='team'>Team</th>
                                        <th className='points'>Points</th>
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