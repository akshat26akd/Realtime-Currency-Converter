import { Grid, TextField } from "@mui/material";
import { useContext } from "react";
import { CurrencyContext } from "./CurrencyContext";

const InputAmount = () => {
  const { firstAmount, setFirstAmount } = useContext(CurrencyContext);

  return (
    <Grid item xs={12} md>
      <TextField
        value={firstAmount}
        onChange={(e) => setFirstAmount(e.target.value)}
        label="Amount"
        fullWidth
        InputProps={{
          type: "number",
        }}
      />
    </Grid>
  );
};

export default InputAmount;
