import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Pause, Play,  Undo, Redo,  Eraser, PencilLine, Lightbulb, } from 'lucide-react';
import GameStyles from '../../css/Game.module.css';
import Board from '../Board/Board';
import { gameState } from '../../Store/GameState';

function Game() {
    const navigate = useNavigate();
    const timeRef = useRef();
    const { time, increaseTime, isStart, isPause, isComplete, hints } = gameState();

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
                <div className={GameStyles.ButtonDiv}>
                    <button className={GameStyles.Exit}><LogOut/></button>
                    <button className={GameStyles.Pause}><Play/></button>
                    <button className={GameStyles.Undo}><Undo/></button>
                    <button className={GameStyles.Reset}>Reset</button>
                    <button className={GameStyles.Redo}><Redo/></button>
                    <button className={GameStyles.Eraser}><Eraser/></button>
                    <button className={GameStyles.Pencil}><PencilLine/></button>
                    <button className={GameStyles.Bulb}>
                        <span className={GameStyles.Hints}>{hints}</span>
                        <Lightbulb/></button>
                </div>
            </div>
        </>
    )
}
export default Game;
