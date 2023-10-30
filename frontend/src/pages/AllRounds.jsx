import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import './../scss/app.scss';
import './../scss/allRounds.scss';
import { useNavigate } from "react-router-dom";

const AllRounds = () => {
    const [rounds, setRounds] = useState([]);
    const [pageNumber, setCount] = useState(1);
    const params = useParams();
    const navigate = useNavigate();

    const numberOfRounds = 8;
    const disablePrev = shouldDisablePrev();
    const disableNext = shouldDisableNext();

    function shouldDisablePrev() {
        return pageNumber == 1;
    }

    function shouldDisableNext() {
        return pageNumber == 8;
    }

    function increment() {
        setCount(function (prevCount) {
            if (prevCount < numberOfRounds) return (prevCount += 1);
            else return (prevCount = 8);
        });
    }

    function decrement() {
        setCount(function (prevCount) {
            if (prevCount > 1) return (prevCount -= 1);
            else return (prevCount = 0);
        });
    }

    const axiosURL = "http://localhost:8800/allRounds/" + pageNumber;

    useEffect(() => {
        const fetchRound = async () => {
            try {
                const res = await axios.get(axiosURL);
                setRounds(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchRound();
    }, [pageNumber]);

    function goHome(event) {
        event.preventDefault();
        navigate("/");
    }

    return (
        <div>
            <div className='realfevrJM__allRounds'>
                <div className='realfevrJM__allRounds--title'>
                    <header className='title--header'>
                        <p>Realfevr JustMansos</p>
                    </header>
                    <p>Round {pageNumber}</p>
                </div>
                <div className='realfevrJM__allRounds--data'>
                    <div className='data--tableWithPrevNext'>
                        <div className='tableWithPrevNext__table'>
                            <div className="tableWithPrevNext__table--container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className='round'>Rank</th>
                                            <th className='team'>Team</th>
                                            <th className='team'>Coach</th>
                                            <th className='points'>Points</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rounds.map((item, index) => (
                                            <tr key={index + 1}>
                                                <td>{index + 1}</td>
                                                <td>{item["NAME"]}</td>
                                                <td>{item["USERNAME"]}</td>
                                                <td>{item["points"]}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className='jmButtonPrevNext'>
                            <div className='jmButton buttons__container--prev'><button onClick={decrement} disabled={disablePrev}>Prev</button></div>
                            <div className='jmButton buttons__container--next'><button onClick={increment} disabled={disableNext}>Next</button></div>
                        </div>
                        <div className='jmButton buttons__container--next'><button onClick={(event) => goHome(event)}>Home</button></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllRounds