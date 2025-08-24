import { useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Pause, Play,  Undo, Redo,  Eraser, PencilLine, Lightbulb, } from 'lucide-react';
import GameStyles from '../../css/Game.module.css';
import Board from '../Board/Board';
import { gameState } from '../../Store/GameState';

function Game() {
    const navigate = useNavigate();
    const timeRef = useRef();
    const { time, increaseTime, isStart, isPause, pauseGame, isComplete, pencilMode, togglePencilMode, 
            eraserMode, toggleEraserMode, hints, giveHint, changeQBoard, resetQBoard, selectedCell, setSelectedCell, 
            undoMove, redoMove, quitGame } = gameState();

    const handleQuit = useCallback(() => {
        quitGame();
    },[quitGame]);

    const handlePause = useCallback(() => {
        pauseGame();
    },[pauseGame]);

    const handleUndo = useCallback(() => {
        undoMove();
    },[undoMove]);

    const handleReset = useCallback(() => {
        resetQBoard();
    },[resetQBoard]); 

    const handleRedo = useCallback(() => {
        redoMove();
    },[redoMove]);

    const handleHint = useCallback(() => {
        giveHint();
    },[giveHint]);

    const handleErase = useCallback(() => {
        // only erase if button is activated
        if (eraserMode) changeQBoard(0);
    },[eraserMode, changeQBoard]);

    useEffect(() => {
        function handleKeyPress(event) {
            const isMetaKey = event.metaKey || event.ctrlKey;
            // use 'e' for erasing!!
            if (event.key.toLowerCase() == 'q') {
                handleQuit();
            } else if (event.key.toLowerCase() == 'p') {
                handlePause();
                if (isPause) return;
            }  else if (isMetaKey && event.key.toLowerCase() == 'z') {
                event.preventDefault();
                handleUndo();
            } else if (event.key.toLowerCase() == 'r') {
                handleReset();
            } else if (isMetaKey && event.key.toLowerCase() == 'y') {
                handleRedo();
            } else if (event.key.toLowerCase() == 'e') {
                if (eraserMode) handleErase();
            } else if (event.key.toLowerCase() == 'h') {
                handleHint();
            }
           
            let r = selectedCell.row;
            let c = selectedCell.col;
            let key = event.key;

            switch (key) {
                case "ArrowUp":
                case "w":
                case "W":
                    r = Math.max(0, r - 1);
                    event.preventDefault();
                    break;
                
                case "ArrowDown":
                case "s":
                case "S":
                    r = Math.min(8, r + 1);
                    console.log(r);
                    event.preventDefault();
                    break;
                
                case "ArrowLeft":
                case "a":
                case "A":
                    c = Math.max(0, c - 1);
                    event.preventDefault();
                    break;

                case "ArrowRight":
                case "d":
                case "D":
                    c = Math.min(8, c + 1);
                    event.preventDefault();
                    break;
            }

            setSelectedCell(r,c);

            if (!selectedCell) return;
            if (parseInt(event.key)) {
                let num = parseInt(event.key);
                if (num < 1 || num > 9) return;
                changeQBoard(num);
            }
        }
        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    },[changeQBoard, handleQuit, isPause, handlePause, handleUndo, handleReset, handleRedo, 
        handleHint, selectedCell, setSelectedCell, handleErase, eraserMode]);

    useEffect(() => {
        if (!isStart) {
            navigate('/', { replace: true });
        }
        timeRef.current = setInterval(() => {
            if (!isPause && !isComplete) increaseTime();
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
                    <button className={GameStyles.Undo} onClick={handleUndo}><Undo/></button>
                    <button className={GameStyles.Reset} onClick={handleReset}>Reset</button>
                    <button className={GameStyles.Redo} onClick={handleRedo}><Redo/></button>

                    <button className={`${GameStyles.Eraser} ${GameStyles.button} ${eraserMode ? GameStyles.eraserActive: ''}`} onClick={toggleEraserMode}><Eraser/></button>
                    <button className={`${GameStyles.Pencil} ${GameStyles.button} ${pencilMode ? GameStyles.pencilActive: ''}`}
                    onClick={togglePencilMode}><PencilLine/></button>
                    <button className={GameStyles.Bulb} onClick={handleHint}>
                        <span className={GameStyles.Hints}>{hints}</span>
                        <Lightbulb/></button>
                </div>
            </div>
        </>
    )
}

export default Game;