import React, { useState } from 'react';
import { Box, Grid, Button, Typography } from '@mui/material';

// Constants for button types and operations
const BUTTONS = [
  { label: 'AC', type: 'function', color: 'lightgrey', textColor: 'black' },
  { label: '+/-', type: 'function', color: 'lightgrey', textColor: 'black' },
  { label: '%', type: 'function', color: 'lightgrey', textColor: 'black' },
  { label: '÷', type: 'operation', color: 'orange', textColor: 'white' },
  { label: '7', type: 'number', color: 'darkgrey', textColor: 'white' },
  { label: '8', type: 'number', color: 'darkgrey', textColor: 'white' },
  { label: '9', type: 'number', color: 'darkgrey', textColor: 'white' },
  { label: '×', type: 'operation', color: 'orange', textColor: 'white' },
  { label: '4', type: 'number', color: 'darkgrey', textColor: 'white' },
  { label: '5', type: 'number', color: 'darkgrey', textColor: 'white' },
  { label: '6', type: 'number', color: 'darkgrey', textColor: 'white' },
  { label: '-', type: 'operation', color: 'orange', textColor: 'white' },
  { label: '1', type: 'number', color: 'darkgrey', textColor: 'white' },
  { label: '2', type: 'number', color: 'darkgrey', textColor: 'white' },
  { label: '3', type: 'number', color: 'darkgrey', textColor: 'white' },
  { label: '+', type: 'operation', color: 'orange', textColor: 'white' },
  { label: '0', type: 'number', color: 'darkgrey', textColor: 'white', span: 2 },
  { label: '.', type: 'number', color: 'darkgrey', textColor: 'white' },
  { label: '=', type: 'operation', color: 'orange', textColor: 'white' },
];

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForSecondInput, setWaitingForSecondInput] = useState(false);

  const handleNumberClick = (value) => {
    if (display === '0' && value !== '.') {
      setDisplay(value);
    } else if (waitingForSecondInput) {
      setDisplay(value);
      setWaitingForSecondInput(false);
    } else {
      // Prevent multiple decimal points
      if (value === '.' && display.includes('.')) return;
      setDisplay(display + value);
    }
  };

  const handleOperationClick = (op) => {
    if (op === '=') {
      if (previousValue !== null && operation) {
        const result = calculateResult(previousValue, parseFloat(display), operation);
        setDisplay(result.toString());
        setPreviousValue(null);
        setOperation(null);
      }
    } else {
      setPreviousValue(parseFloat(display));
      setOperation(op);
      setWaitingForSecondInput(true);
    }
  };

  const calculateResult = (first, second, op) => {
    switch (op) {
      case '+':
        return first + second;
      case '-':
        return first - second;
      case '×':
        return first * second;
      case '÷':
        return second !== 0 ? first / second : 'Error';
      default:
        return second;
    }
  };

  const handleFunctionClick = (func) => {
    if (func === 'AC') {
      setDisplay('0');
      setPreviousValue(null);
      setOperation(null);
      setWaitingForSecondInput(false);
    } else if (func === '+/-') {
      if (display !== '0') {
        setDisplay((parseFloat(display) * -1).toString());
      }
    } else if (func === '%') {
      setDisplay((parseFloat(display) / 100).toString());
    }
  };

  const handleButtonClick = (button) => {
    if (button.type === 'number') {
      handleNumberClick(button.label);
    } else if (button.type === 'operation') {
      handleOperationClick(button.label);
    } else if (button.type === 'function') {
      handleFunctionClick(button.label);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '400px',
        margin: 'auto',
        backgroundColor: 'black',
        borderRadius: '20px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        userSelect: 'none',
      }}
    >
      <Typography
        variant="h3"
        sx={{
          color: 'white',
          textAlign: 'right',
          padding: '20px',
          fontWeight: '300',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {display}
      </Typography>
      <Grid container spacing={1} sx={{ padding: '10px' }}>
        {BUTTONS.map((btn) => (
          <Grid
            item
            xs={btn.span ? 6 : 3}
            key={btn.label}
            sx={{ minHeight: '80px' }}
          >
            <Button
              fullWidth
              variant="contained"
              sx={{
                height: '100%',
                borderRadius: btn.label === '0' ? '40px' : '50%',
                backgroundColor:
                  btn.color === 'lightgrey'
                    ? '#A5A5A5'
                    : btn.color === 'darkgrey'
                    ? '#333333'
                    : '#FF9500',
                color: btn.textColor,
                fontSize: '1.5rem',
                '&:hover': {
                  backgroundColor:
                    btn.color === 'lightgrey'
                      ? '#8C8C8C'
                      : btn.color === 'darkgrey'
                      ? '#4C4C4C'
                      : '#CC7700',
                },
              }}
              onClick={() => handleButtonClick(btn)}
            >
              {btn.label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Calculator;
