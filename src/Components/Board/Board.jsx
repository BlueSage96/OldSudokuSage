import BoardStyles from '../../css/Board.module.css';
import Squares from './Square';

function Board() {
    const squares = Array(3).fill(Array(3).fill(null));
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
        </>
    )
}

export default Board;