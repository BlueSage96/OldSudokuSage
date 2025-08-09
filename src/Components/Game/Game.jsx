import { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Pause, Play,  Undo, Redo,  Eraser, PencilLine, Lightbulb, } from 'lucide-react';
import GameStyles from '../../css/Game.module.css';
import Board from '../Board/Board';
import { gameState } from '../../Store/GameState';

function Game() {
    const navigate = useNavigate();
    const timeRef = useRef();
    const { time, increaseTime, isStart, isPause, pauseGame, isComplete, hints, giveHint,
            changeQBoard, resetQBoard, selectedCell, quitGame } = gameState();

    const handleQuit = useCallback(() => {
        quitGame();
    },[quitGame]);

    const handlePause = useCallback(() => {
        pauseGame();
    },[pauseGame]);

    const handleReset = useCallback(() => {
        resetQBoard();
    },[resetQBoard]); 

    const handleHint = useCallback(() => {
        giveHint();
    },[giveHint]);

    useEffect(() => {
        function handleKeyPress(event) {
            const isMetaKey = event.metaKey || event.ctrlKey;
            if (event.key.toLowerCase() == 'q') {
                handleQuit();
            } else if (event.key.toLowerCase() == 'p') {
                handlePause();
            } else if (event.key.toLowerCase() == 'r') {
                handleReset();
            } else if (event.key.toLowerCase() == 'h') {
                handleHint();
            }

            if (!selectedCell) return;
            if (parseInt(event.key)) {
                let num = parseInt(event.key);
                if (num < 1 || num > 9) return;
                changeQBoard(num);
            }
        }
        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    },[changeQBoard, handleQuit, handlePause, handleReset, handleHint, selectedCell]);

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
                    <button className={GameStyles.Exit} onClick={handleQuit}><LogOut/></button>
                    <button className={GameStyles.Pause} onClick={handlePause}>{isPause ? <Play/> : <Pause/>}</button>
                    <button className={GameStyles.Undo}><Undo/></button>
                    <button className={GameStyles.Reset} onClick={handleReset}>Reset</button>
                    <button className={GameStyles.Redo}><Redo/></button>
                    <button className={GameStyles.Eraser}><Eraser/></button>
                    <button className={GameStyles.Pencil}><PencilLine/></button>
                    <button className={GameStyles.Bulb} onClick={handleHint}>
                        <span className={GameStyles.Hints}>{hints}</span>
                        <Lightbulb/></button>
                </div>
            </div>
        </>
    )
}
export default Game;
