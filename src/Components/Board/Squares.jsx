import Cell from './Cell';
import SquareStyles from 'styled-components';

const Square = SquareStyles.div`
    display: flex;
    flex-direction: column;
    gap: 1px;
    width: 100%;
    height; 100%;
`;

const MiniSquares = SquareStyles.div`
    display: flex;
    gap: 1px;
    width: 100%;
    height: 100%;
`;

// 3x3 squares
function Squares ({ row, col }) {
    const squares = Array(3).fill(Array(3).fill(null));
    return (
        <>
            <Square>
                {squares.map((arr,i) => (
                    <MiniSquares key={i}>
                        {arr.map((_,k) => (
                            <Cell key={k} row={row * 3 + 1} col={col * 3 + k}/>
                        ))}
                    </MiniSquares>
                ))}
            </Square>
        </>
    );
}

export default Squares;