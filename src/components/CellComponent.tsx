import { FC } from "react";
import { Cell } from "../models/Cell";

interface CellProps {
  cell: Cell;
  selected: boolean;
  onSelectCell(cell: Cell): void;
}

export const CellComponent: FC<CellProps> = ({
  cell,
  selected,
  onSelectCell,
}) => {
  return (
    <div
      className={["cell", cell.color, selected ? "selected" : null].join(" ")}
      onClick={() => onSelectCell(cell)}
      style={{ background: cell.figure && cell.available ? "green" : "" }}
    >
      {cell.available && !cell.figure && <div className={"available"} />}
      {cell.figure?.logo && <img src={cell.figure.logo} alt="" />}
    </div>
  );
};
