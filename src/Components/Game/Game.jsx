import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import GameStyles from '../../css/Game.module.css';
import Board from '../Board/Board';
import { gameState } from '../../Store/GameState';

function Game() {
    const navigate = useNavigate();
    const timeRef = useRef();
    const { time, increaseTime, isStart, isPause, isComplete } = gameState();

    useEffect(() => {
        if (!isStart) {
            navigate('/', { replace: true });
        }
        timeRef.current = setInterval(() => {
            if (!isPause && !isPause) increaseTime();
        }, 1000);
        return () => clearInterval(timeRef.current);
    },[time, increaseTime, isPause, isStart, isComplete, navigate]);
    return (
        <>
            <div className={GameStyles.Container}>
                <Board/>
            </div>
        </>
    )
}
export default Game;
