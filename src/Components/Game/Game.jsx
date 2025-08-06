import GameStyles from '../../css/Game.module.css';
import Board from '../Board/Board';

function Game() {
    return (
        <>
            <div className={GameStyles.Container}>
                <Board/>
            </div>
        </>
    )
}
export default Game;
