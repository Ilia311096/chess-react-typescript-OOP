import React, { useEffect, useState } from "react";
import { FC } from "react";
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";
import { Player } from "../models/Player";
import { CellComponent } from "./CellComponent";

interface BroadProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
}

export const BoardComponent: FC<BroadProps> = ({
  board,
  setBoard,
  currentPlayer,
  swapPlayer,
}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  useEffect(() => {
    markAvailableCells();
  }, [selectedCell]);

  function onSelectCell(cell: Cell) {
    if (
      selectedCell &&
      selectedCell !== cell &&
      selectedCell.figure?.canMove(cell)
    ) {
      selectedCell.moveFigure(cell);
      setSelectedCell(null);
      swapPlayer();
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell);
      }
    }
  }
  console.log(currentPlayer);
  function markAvailableCells() {
    board.markAvailableCells(selectedCell);
    updateBoard();
  }
  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  return (
    <div>
      <h2>{currentPlayer?.color}</h2>

      <div className="board">
        {board.cells.map((row, index) => {
          return (
            <React.Fragment key={index}>
              {row.map((cell) => (
                <CellComponent
                  cell={cell}
                  key={cell.id}
                  selected={
                    selectedCell?.x === cell.x && cell.y === selectedCell.y
                  }
                  onSelectCell={onSelectCell}
                />
              ))}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
