import React, { useState } from 'react';
import { Box, Grid, Button, Typography } from '@mui/material';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);

  const handleNumberClick = (value) => {
    if (display === '0' && value !== '.') {
      setDisplay(value);
    } else if (waitingForSecondValue) {
      setDisplay(value);
      setWaitingForSecondValue(false);
    } else {
      // Prevent multiple decimal points
      if (value === '.' && display.includes('.')) {
        return;
      }
      setDisplay(display + value);
    }
  };

  const handleOperationClick = (op) => {
    setPreviousValue(parseFloat(display));
    setOperation(op);
    setWaitingForSecondValue(true);
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
    if (display === '0') return;
    if (display.startsWith('-')) {
      setDisplay(display.slice(1));
    } else {
      setDisplay('-' + display);
    }
  };

  const handlePercent = () => {
    const value = parseFloat(display);
    setDisplay((value / 100).toString());
  };

  const buttonLayout = [
    ['AC', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ];

  const getButtonStyle = (value) => {
    if (['AC', '±', '%'].includes(value)) {
      return { backgroundColor: '#A5A5A5', color: 'black' };
    } else if (['÷', '×', '-', '+'].includes(value)) {
      return { backgroundColor: '#FF9500', color: 'white' };
    } else if (value === '=') {
      return { backgroundColor: '#FF9500', color: 'white' };
    }
    return { backgroundColor: '#333333', color: 'white' };
  };

  const handleButtonClick = (value) => {
    if (value === 'AC') {
      handleClear();
    } else if (value === '±') {
      handleToggleSign();
    } else if (value === '%') {
      handlePercent();
    } else if (['+', '-', '×', '÷'].includes(value)) {
      handleOperationClick(value);
    } else if (value === '=') {
      calculateResult();
    } else {
      handleNumberClick(value);
    }
  };

  return (
    <Box
      sx={{
        width: '320px',
        margin: 'auto',
        backgroundColor: 'black',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)'
      }}
    >
      <Typography
        variant="h3"
        align="right"
        sx={{
          color: 'white',
          backgroundColor: 'black',
          padding: '20px',
          borderRadius: '5px',
          marginBottom: '20px',
          fontWeight: 'lighter',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}
      >
        {display}
      </Typography>
      <Grid container spacing={1}>
        {buttonLayout.map((row, rowIndex) =>
          row.map((btn, btnIndex) => (
            <Grid
              item
              xs={btn === '0' ? 6 : 3}
              key={`${rowIndex}-${btnIndex}`}
            >
              <Button
                variant="contained"
                fullWidth
                sx={{
                  height: '60px',
                  borderRadius: btn === '0' ? '5px' : '50%',
                  fontSize: '1.2rem',
                  fontWeight: 'lighter',
                  textTransform: 'none',
                  ...getButtonStyle(btn)
                }}
                onClick={() => handleButtonClick(btn)}
              >
                {btn}
              </Button>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default Calculator;
