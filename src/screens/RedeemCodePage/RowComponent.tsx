import React from "react";
import { TableCell } from "@mui/material";
import NumericInput from "react-numeric-input";

export type Item = Readonly<{
  receivedType: string;
  gameplayNotes: string;
  bundleQuantity: string;
  buttonCostText: string;
  userAmountText: string;
  canPurchase: boolean;
  imageUrl: string;
  id: string;
  limit: number;
}>;

const RowComponent = ({
  rowData,
  onRedeem,
}: {
  rowData: Item;
  onRedeem: (id: string, quantity: number) => void;
}): JSX.Element => {
  const [quantity, setQuantity] = React.useState(1);

  return (
    <>
      <TableCell align="center">
        <div className="cell-wrapper">
          <img src={rowData.imageUrl} alt="Image" />
          <span>{rowData.receivedType}</span>
        </div>
      </TableCell>
      <TableCell component="th" scope="row">
        {rowData.gameplayNotes}
      </TableCell>
      <TableCell>{rowData.bundleQuantity}</TableCell>
      <TableCell>
        <NumericInput
          value={quantity}
          min={1}
          max={rowData.limit}
          onChange={(e) => setQuantity(e || 1)}
        />
      </TableCell>
      <TableCell>
        <div className="cell-wrapper right">
          <button
            className={rowData.canPurchase ? "confirm-btn" : "reject-btn"}
            onClick={() => {
              onRedeem(rowData.id, quantity);
            }}
          >
            {rowData.buttonCostText}
          </button>
          <span>{rowData.userAmountText}</span>
        </div>
      </TableCell>
    </>
  );
};

export default RowComponent;
