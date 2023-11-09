import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './../scss/app.scss';
import './../scss/InsertPoints.scss';
import { useNavigate } from "react-router-dom";

const InsertPoints = () => {
    const [players, setPlayers] = useState([]);
    const navigate = useNavigate();

    const [roundInfo, setRoundInfo] = useState({
        round: 0,
        player1: 0,
        points1: 0,
        player2: 0,
        points2: 0,
        player3: 0,
        points3: 0,
        player4: 0,
        points4: 0,
        player5: 0,
        points5: 0,
        player6: 0,
        points6: 0,
        player7: 0,
        points7: 0,
        player8: 0,
        points8: 0,
        player9: 0,
        points9: 0,
        player10: 0,
        points10: 0,
        player11: 0,
        points11: 0,
    });

    const handleChange = (e) => {
        //setRoundInfo(roundInfo.player = 1)
        console.log(roundInfo);
    }

    const setRound = (e) => {
        setRoundInfo(roundInfo.round = e.target.value)
        console.log(roundInfo);
    }

    useEffect(() => {
        const fetchPlayerList = async () => {
            try {
                const res = await axios.get("http://192.168.2.45:8800/listOfPlayers");
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
            const res = await axios.post("http://192.168.2.45:8800/rounds", roundInfo);
            handleChange(res.data);
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
                            <div className='roundNumberInput__input'> <input type='text' maxLength={2} onBlur={setRound}/> </div>
                        </div>
                        {players.map((item, index) => (
                            <div className="data__insertData--insertPointsList" key={index} id={item["id"]}>
                                <div className="insertPointsList__team">{item["name"]}</div>
                                <input className='insertPointsList__input' type='text' onChange={handleChange} maxLength={3} name={item["id"]} />
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