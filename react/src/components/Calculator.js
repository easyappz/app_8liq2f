import React, { useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);

  const handleDigitClick = (value) => {
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

    const current = parseFloat(display);
    let result = 0;

    if (operation === '+') {
      result = previousValue + current;
    } else if (operation === '-') {
      result = previousValue - current;
    } else if (operation === '×') {
      result = previousValue * current;
    } else if (operation === '÷') {
      if (current === 0) {
        setDisplay('Error');
        return;
      }
      result = previousValue / current;
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
    setDisplay((value / 100).toString());
  };

  return (
    <Box className="calculator-container">
      <Box className="calculator-display">
        <Typography variant="h2" className="display-text">
          {display}
        </Typography>
      </Box>
      <Grid container spacing={1} className="calculator-buttons">
        <Grid item xs={3}>
          <Button
            fullWidth
            className="button secondary"
            onClick={handleClear}
          >
            AC
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            fullWidth
            className="button secondary"
            onClick={handleToggleSign}
          >
            ±
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            fullWidth
            className="button secondary"
            onClick={handlePercent}
          >
            %
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            fullWidth
            className="button operation"
            onClick={() => handleOperationClick('÷')}
          >
            ÷
          </Button>
        </Grid>

        <Grid item xs={3}>
          <Button
            fullWidth
            className="button primary"
            onClick={() => handleDigitClick('7')}
          >
            7
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            fullWidth
            className="button primary"
            onClick={() => handleDigitClick('8')}
          >
            8
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            fullWidth
            className="button primary"
            onClick={() => handleDigitClick('9')}
          >
            9
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            fullWidth
            className="button operation"
            onClick={() => handleOperationClick('×')}
          >
            ×
          </Button>
        </Grid>

        <Grid item xs={3}>
          <Button
            fullWidth
            className="button primary"
            onClick={() => handleDigitClick('4')}
          >
            4
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            fullWidth
            className="button primary"
            onClick={() => handleDigitClick('5')}
          >
            5
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            fullWidth
            className="button primary"
            onClick={() => handleDigitClick('6')}
          >
            6
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            fullWidth
            className="button operation"
            onClick={() => handleOperationClick('-')}
          >
            −
          </Button>
        </Grid>

        <Grid item xs={3}>
          <Button
            fullWidth
            className="button primary"
            onClick={() => handleDigitClick('1')}
          >
            1
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            fullWidth
            className="button primary"
            onClick={() => handleDigitClick('2')}
          >
            2
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            fullWidth
            className="button primary"
            onClick={() => handleDigitClick('3')}
          >
            3
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            fullWidth
            className="button operation"
            onClick={() => handleOperationClick('+')}
          >
            +
          </Button>
        </Grid>

        <Grid item xs={6}>
          <Button
            fullWidth
            className="button primary zero"
            onClick={() => handleDigitClick('0')}
          >
            0
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            fullWidth
            className="button primary"
            onClick={() => handleDigitClick('.')}
          >
            .
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            fullWidth
            className="button equals"
            onClick={calculateResult}
          >
            =
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Calculator;
