import BoardStyles from '../../css/Board.module.css';
import Squares from './Square';
import { gameState } from '../../Store/GameState';

function Board() {
    const { time, isPause, startGAme, mistake, totalMistakes, isComplete, mode, changeQBoard, tryAgain } = gameState();
    const squares = Array(3).fill(Array(3).fill(null));
    const numbers = Array(9).fill(null);
    return (
        <>
          <div className={BoardStyles.Main}>
            {squares.map((arr,row) => (
                <div key={row} className={BoardStyles.Rows}>
                    {arr.map((_,col) => (
                        <Squares key={col} row={row} col={col}/>
                    ))}
                </div>
            ))}
          </div>
          {/* Row of numbers below the board */}
          <div className={BoardStyles.NumContainer}>
              {numbers.map((_,i) => (
                    <span onClick={() => changeQBoard(i + 1)} key={i} className={BoardStyles.NumRow}>
                        {i + 1}
                    </span>
              ))}
          </div>
        </>
    )
}

export default Board;