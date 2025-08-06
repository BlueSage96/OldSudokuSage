import CellStyle from 'styled-components';
// Draw individuals cells & styling
const Cells = CellStyle.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(30,40,200);
    border-radius: 6px;
    cursor: pointer;
    position: relative;

    &:hover { 
        outline: 4px solid aqua;
        outline-offset: -2px;
        z-index: 2px;
    }

    &.current {
        background-color: black;
        outline: 3px solid #3b82f6;
        outline-offset: -3px;
        z-index: 1px;
    }
    
    &.related {
        background-color: black;
    }

    &.square {
        background-color: black;
    }
`;

import { useRef } from 'react';
function Cell() {
  const cellRef = useRef();
  return (
    <>
      <Cells ref={cellRef}></Cells>
    </>
  );
}
export default Cell;
