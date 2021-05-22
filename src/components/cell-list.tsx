import React, { Fragment, useEffect } from "react";
import { useActions } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-types-selector";
import AddCell from "./add-cell";
import CellListItem from "./cell-list-item";

import "./cell-list.css";

const CellList: React.FC = () => {
  const { fetchCells } = useActions();
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );

  useEffect(() => {
    fetchCells();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderedCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div>
      {renderedCells}
      {renderedCells.length === 0 && <AddCell previousCellId={null} />}
    </div>
  );
};

export default CellList;
