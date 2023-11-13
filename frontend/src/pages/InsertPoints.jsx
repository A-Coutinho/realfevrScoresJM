import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './../scss/app.scss';
import './../scss/InsertPoints.scss';
import { useNavigate } from "react-router-dom";

const InsertPoints = () => {
    const [players, setPlayers] = useState([]);
    const navigate = useNavigate();

    const [roundInfo, setRoundInfo] = useState({});
    const [roundNumber, setRoundNumber] = useState({});

    const handleRoundChange = (e) => {
        if (!isNaN(e.target.value)) setRoundNumber((prev) => ({ ...prev, "number": e.target.value }));
    }

    const handlePointsChange = (e) => {
        if (!isNaN(e.target.value)) setRoundInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    console.log(roundInfo);

    useEffect(() => {
        const fetchPlayerList = async () => {
            try {
                const res = await axios.get("http://server2.noslined.com.br:9090/listOfPlayers");
                setPlayers(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchPlayerList();
    }, []);

    const submitPoints = async (e) => {
        e.preventDefault();
        try {
            let params = { 'round': roundNumber, 'roundInfo': roundInfo };
            await axios.post("http://192.168.2.45:8800/rounds", params)
            .then((response) => {
                navigate("/");
            });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <div className='realfevrJM__insertPoints'>
                <div className='realfevrJM__insertPoints--title'>
                    <p>Insert Round Points</p>
                </div>
                <div className='realfevrJM__insertPoints--data'>
                    <div className='data__insertData'>
                        <div className='data__insertData--roundNumberInput'>
                            <div className='roundNumberInput__text'> Round Number </div>
                            <div className='roundNumberInput__input'> <input type='text' maxLength={2} onChange={handleRoundChange} name="round" /> </div>
                        </div>
                        {players.map((item, index) => (
                            <div className="data__insertData--insertPointsList" key={index} id={item["id"]}>
                                <div className="insertPointsList__team">{item["name"]}</div>
                                <input className='insertPointsList__input' type='text' onChange={handlePointsChange} maxLength={3} name={item["id"]} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='realfevrJM__insertPoints--submit'><button onClick={submitPoints}>Submit</button></div>
            </div>
        </div>
    )
}

export default InsertPoints