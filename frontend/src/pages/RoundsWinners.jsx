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

    useEffect(() => {
        const fetchWeeklyList = async () => {
            try {
                const res = await axios.get("http://localhost:8800/roundsWinners");
                setPoints(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchWeeklyList();

        const fetchWeeklyWinnersList = async () => {
            try {
                const res = await axios.get("http://localhost:8800/roundsWinnersByTimes");
                setPointsWinners(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchWeeklyWinnersList();
    }, []);

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
        <div>
            <div className='justMansos'>
                <div className='justMansos__title'>
                    <header className='justMansos__title--header'>
                        <p>Realfevr JustMansos</p>
                    </header>
                </div>
                <div className='justMansos__data'>
                    {!isWeeklyWinners && (<div className='justMansos__table'>
                        <div className="justMansos__table--container">
                            <table>
                                <thead>
                                    <tr>
                                        <th className='round'>Round</th>
                                        <th className='team'>Team</th>
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
                    </div>)}

                    {isWeeklyWinners && (<div className='justMansos__table'>
                        <div className="justMansos__table--container">
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
                    {!isWeeklyWinners && (<div className='jmButton'><button onClick={(event) => changeList(event)}>Number of Weekly Winners</button></div>)}
                    {isWeeklyWinners && (<div className='jmButton'><button onClick={(event) => goBackToList(event)}>Back</button></div>)}
                    {!isWeeklyWinners && (<div className='jmButton'><button onClick={(event) => goHome(event)}>Home</button></div>)}
                </div>
            </div>

        </div>
    )
}

export default RoundsWinners