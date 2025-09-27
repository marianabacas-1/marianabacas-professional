import React from 'react';
import { Tooltip } from 'react-tooltip';

export default function TableActionButton({ icon, onClick, tooltipText, whithoutMargin }) {
  return (
    <>
      <button
        onClick={onClick}
        className={`p-1 ${whithoutMargin ? '' : 'mx-1'} transform hover:scale-105 bg-secondary rounded-full p-1`}
        data-tooltip-id="my-tooltip" 
        data-tooltip-content={tooltipText}
      >
        {icon}
      </button>
      <Tooltip id="my-tooltip" place="bottom" style={{ backgroundColor: 'rgba(150, 29, 112, 1)', color: 'white', fontSize: '14px' }} />
    </>
  );
}