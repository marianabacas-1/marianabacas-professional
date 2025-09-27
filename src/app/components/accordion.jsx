import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AccordionComponent({ title, children }) {
  return (
    <div>
      <Accordion sx={{ 
            backgroundColor: "#f6685e"
          }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon color="action" 
          sx={{
            color: 'white'
          }}
          />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <span className="text-white text-xl">{title}</span>
        </AccordionSummary>
        <AccordionDetails>
          {children}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
