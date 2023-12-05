import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './../scss/app.scss';
import './../scss/InsertPoints.scss';
import { useNavigate } from "react-router-dom";

const InsertPoints = () => {
    const [players, setPlayers] = useState([]);
    const navigate = useNavigate();
    const [token, setToken] = useState(null);

    const [roundInfo, setRoundInfo] = useState({});
    const [roundNumber, setRoundNumber] = useState({});

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

    const handleRoundChange = (e) => {
        if (!isNaN(e.target.value)) setRoundNumber((prev) => ({ ...prev, "number": e.target.value }));
    }

    const handlePointsChange = (e) => {
        if (!isNaN(e.target.value)) setRoundInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    console.log(roundInfo);

    useEffect(() => {
        if (token !== null) {
            const headerAxios = { headers: { "authorization": `Bearer ` + token } };
            const fetchPlayerList = async () => {

                try {
                    const res = await axios.get("https://antonioapp.noslined.com.br/listOfPlayersSec", headerAxios);
                    setPlayers(res.data);
                } catch (err) {
                    console.log(err);
                }
            };
            fetchPlayerList();
        };
    }, [token]);

    const submitPoints = async (e) => {
        if (token !== null) {
            try {
                let params = { headers: { "authorization": `Bearer ` + token }, 'round': roundNumber, 'roundInfo': roundInfo };
                await axios.post("https://antonioapp.noslined.com.br/roundsSec", params)
                    .then((response) => {
                        navigate("/");
                    });
            } catch (err) {
                console.log(err);
            }
        };
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