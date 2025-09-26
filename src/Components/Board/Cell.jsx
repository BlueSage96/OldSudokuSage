import CellStyle from 'styled-components';
// Draw individuals cells & styling
const Cells = CellStyle.div`
    display: flex; 
    justify-content: center; 
    align-items: center; 
    width: 100%; 
    height: 100%; 
    cursor: pointer; 
    user-select: none; 
    background-color: rgb(30,40,200);
    outline: 1px solid transparent;
    border-radius: 8px;
    
    // width: 100%;
    // aspect-ratio: 1 / 1;
    // 
    // position: relative;
    // cursor: pointer;
    // transition: background-color 0.2s, outline 0.2s;
      
    &:hover { 
        outline: 4px solid skyblue;
        outline-offset: -2px;
        z-index: 2;
    }

   &.selected {
    background-color: black; 
    outline: 2px solid #3b82f6; 
   }

  &.related {
    background-color: black;
  }
`;

const CellValue = CellStyle.span`
  font-size: 40px;

  @media (min-width: 768px) {
    font-size: 40px;
  }

  &.default {
    color: white; /* gray-400 */
  }

  &.correct {
    color: #3b82f6; /* blue-600 */
  }

  &.incorrect {
    color: #dc2626; /* red-600 */
  }
`;

const PencilValue = CellStyle.span`
  color: #16a34a; /* green-600 */
  font-size: 18px;
  position: absolute;
  top: -4px;
  right: 18px; //18px
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 1px;

  span {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

import { gameState } from '../../Store/GameState';
import { useRef } from 'react';

function Cell({ row, col }) {
  const { setSelectedCell, selectedCell, qBoard, board, isPause } = gameState();
  const cellRef = useRef();

  function handleClick() {
    if (isPause) return;
    cellRef.current?.focus();
    setSelectedCell(row, col);
  }

  function isSelected() {
    // determines what cell(s) are highlighted with each click
    const query = { other: false, current: false };
    if (selectedCell.cell) {
      // highlight for block
      selectedCell.squares.forEach((sq) => {
        if (sq[0] === row && sq[1] === col) query.other = true;
      });
      // highlight for row & col
      if (selectedCell.row === row || selectedCell.col === col) query.other = true;
      //  highlight for single cell
      if (selectedCell.cell.row === row && selectedCell.cell.col === col) {
        query.current = true;
      }
    }
    return query;
  }

  const { current, other } = isSelected();

  return (
    <>
      <Cells ref={cellRef} onClick={handleClick} className={`${current ? 'selected' : ''} ${other ? 'related' : ''}`}>
        {qBoard[row][col].value !== 0 && (
          <CellValue className={qBoard[row][col].default ? 'default' : qBoard[row][col].value === board[row][col] ? 'correct' : 'incorrect'}>{qBoard[row][col].value}</CellValue>
        )}
        {Array.isArray(qBoard[row][col].pencilValue) && qBoard[row][col].pencilValue.length > 0 && !qBoard[row][col].default && (
          <PencilValue>
            {Array(9)
              .fill(null)
              .map((_, i) => (
                <span key={i}>{qBoard[row][col].pencilValue.includes(i + 1) ? i + 1 : ''}</span>
              ))}
          </PencilValue>
        )}
      </Cells>
    </>
  );
}
export default Cell;
