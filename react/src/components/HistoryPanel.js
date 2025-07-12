import React from 'react';
import { Box, Typography, List, ListItem, Divider } from '@mui/material';

const HistoryPanel = ({ history }) => {
  return (
    <Box
      sx={{
        width: '320px',
        maxHeight: '200px',
        overflowY: 'auto',
        backgroundColor: '#1C1C1E',
        borderRadius: '10px',
        padding: '10px',
        marginTop: '10px',
        color: 'white',
        scrollbarWidth: 'thin',
        scrollbarColor: '#8E8E93 #2C2C2E',
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: '#2C2C2E',
          borderRadius: '3px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#8E8E93',
          borderRadius: '3px',
        },
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'lighter', marginBottom: '10px' }}>
        History
      </Typography>
      <Divider sx={{ backgroundColor: '#3A3A3C', marginBottom: '10px' }} />
      {history.length > 0 ? (
        <List>
          {history.map((calc, index) => (
            <ListItem
              key={index}
              sx={{
                padding: '8px 0',
                justifyContent: 'space-between',
                borderBottom: index < history.length - 1 ? '1px solid #3A3A3C' : 'none',
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: 'lighter' }}>
                {calc.expression}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 'lighter', color: '#FF9500' }}>
                {calc.result}
              </Typography>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body2" sx={{ color: '#8E8E93', textAlign: 'center' }}>
          No calculations yet
        </Typography>
      )}
    </Box>
  );
};

export default HistoryPanel;
