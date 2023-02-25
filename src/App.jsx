import { Box, Container, Grid, Link, Typography, Button } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import InputAmount from "./Components/InputAmount";
import SelectCountry from "./Components/SelectCountry";
import SwitchCurrency from "./Components/SwitchCurrency";
import { CurrencyContext } from "./Components/CurrencyContext";

function App() {
  const {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    firstAmount,
  } = useContext(CurrencyContext);
  const [resultCurrency, setResultCurrency] = useState(0);
  const codeFromCurrency = fromCurrency.split(" ")[1];
  const codeToCurrency = toCurrency.split(" ")[1];

  useEffect(() => {
    if (firstAmount) {
      axios("https://api.freecurrencyapi.com/v1/latest", {
        params: {
          apikey: import.meta.env.VITE_API_KEY,
          base_currency: codeFromCurrency,
          currencies: codeToCurrency,
        },
      })
        .then((response) =>
          setResultCurrency(response.data.data[codeToCurrency])
        )
        .catch((error) => console.log(error));
    }
  }, [firstAmount, fromCurrency, toCurrency]);

  const boxStyles = {
    background: "#fdfdfd",
    marginTop: "2rem",
    textAlign: "center",
    color: "#222",
    minHeight: "auto",
    borderRadius: 10,
    padding: "4rem 2rem",
    boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
    position: "relative",
  };

  return (
    <Container maxWidth="md" sx={boxStyles}>
    <Button variant="contained" component="label" sx={{ backgroundColor:"white", textAlign: "center", marginBottom: "1rem" }}>
        <a href="https://drive.google.com/uc?export=download&id=1ALTzf0Zp5_MyRogdCOUMWJwWOBzYjKnj" target="_blank" download>
          Download APK
        </a>
      </Button>
      <Typography variant="h5" sx={{ marginBottom: "2rem" }}>
        Stay Ahead with Accurate Conversions
      </Typography>
      <Grid container spacing={2}>
        <InputAmount />
        <SelectCountry
          value={fromCurrency}
          setValue={setFromCurrency}
          label="From"
        />
        <SwitchCurrency />
        <SelectCountry value={toCurrency} setValue={setToCurrency} label="To" />
      </Grid>

      {firstAmount ? (
        <Box sx={{ textAlign: "left", marginTop: "1rem" }}>
          <Typography>
            {firstAmount} {fromCurrency} =
          </Typography>
          <Typography
            variant="h5"
            sx={{ marginTop: "5px", fontWeight: "bold" }}
          >
            {resultCurrency * firstAmount} {toCurrency}
          </Typography>
        </Box>
      ) : (
        ""
      )}
    </Container>
  );
}

export default App;
