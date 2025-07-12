import React, { useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);

  const handleNumberClick = (value) => {
    if (display === '0' && value !== '.') {
      setDisplay(value);
    } else {
      if (value === '.' && display.includes('.')) {
        return;
      }
      setDisplay(display + value);
    }
    if (waitingForSecondValue) {
      setWaitingForSecondValue(false);
    }
  };

  const handleOperationClick = (op) => {
    setPreviousValue(parseFloat(display));
    setOperation(op);
    setWaitingForSecondValue(true);
    setDisplay('0');
  };

  const calculateResult = () => {
    if (!previousValue || !operation) return;

    const currentValue = parseFloat(display);
    let result = 0;

    if (operation === '+') {
      result = previousValue + currentValue;
    } else if (operation === '-') {
      result = previousValue - currentValue;
    } else if (operation === '×') {
      result = previousValue * currentValue;
    } else if (operation === '÷') {
      if (currentValue === 0) {
        setDisplay('Error');
        return;
      }
      result = previousValue / currentValue;
    }

    setDisplay(result.toString());
    setPreviousValue(null);
    setOperation(null);
    setWaitingForSecondValue(false);
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForSecondValue(false);
  };

  const handleToggleSign = () => {
    if (display !== '0') {
      if (display.startsWith('-')) {
        setDisplay(display.slice(1));
      } else {
        setDisplay('-' + display);
      }
    }
  };

  const handlePercent = () => {
    const value = parseFloat(display);
    if (value !== 0) {
      setDisplay((value / 100).toString());
    }
  };

  return (
    <Box className="calculator-container">
      <Box className="calculator-display">
        <Typography variant="h3" className="display-text">
          {display}
        </Typography>
      </Box>
      <Grid container className="calculator-buttons">
        <Grid container item spacing={1} className="calculator-row">
          <Grid item xs={3}>
            <Button
              variant="contained"
              className="button secondary-button"
              onClick={handleClear}
            >
              AC
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              className="button secondary-button"
              onClick={handleToggleSign}
            >
              ±
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              className="button secondary-button"
              onClick={handlePercent}
            >
              %
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              className="button operation-button"
              onClick={() => handleOperationClick('÷')}
            >
              ÷
            </Button>
          </Grid>
        </Grid>
        <Grid container item spacing={1} className="calculator-row">
          <Grid item xs={3}>
            <Button
              variant="contained"
              className="button number-button"
              onClick={() => handleNumberClick('7')}
            >
              7
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              className="button number-button"
              onClick={() => handleNumberClick('8')}
            >
              8
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              className="button number-button"
              onClick={() => handleNumberClick('9')}
            >
              9
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              className="button operation-button"
              onClick={() => handleOperationClick('×')}
            >
              ×
            </Button>
          </Grid>
        </Grid>
        <Grid container item spacing={1} className="calculator-row">
          <Grid item xs={3}>
            <Button
              variant="contained"
              className="button number-button"
              onClick={() => handleNumberClick('4')}
            >
              4
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              className="button number-button"
              onClick={() => handleNumberClick('5')}
            >
              5
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              className="button number-button"
              onClick={() => handleNumberClick('6')}
            >
              6
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              className="button operation-button"
              onClick={() => handleOperationClick('-')}
            >
              −
            </Button>
          </Grid>
        </Grid>
        <Grid container item spacing={1} className="calculator-row">
          <Grid item xs={3}>
            <Button
              variant="contained"
              className="button number-button"
              onClick={() => handleNumberClick('1')}
            >
              1
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              className="button number-button"
              onClick={() => handleNumberClick('2')}
            >
              2
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              className="button number-button"
              onClick={() => handleNumberClick('3')}
            >
              3
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              className="button operation-button"
              onClick={() => handleOperationClick('+')}
            >
              +
            </Button>
          </Grid>
        </Grid>
        <Grid container item spacing={1} className="calculator-row">
          <Grid item xs={6}>
            <Button
              variant="contained"
              className="button number-button zero-button"
              onClick={() => handleNumberClick('0')}
            >
              0
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              className="button number-button"
              onClick={() => handleNumberClick('.')}
            >
              .
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              className="button equals-button"
              onClick={calculateResult}
            >
              =
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Calculator;
