import React from 'react';
import AddIcon from '@mui/icons-material/Add';

export default function AddButton({ onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} className="flex items-center justify-center fixed bottom-4 right-4 bg-primary hover:bg-primaryWithOp hover:opacity-100 text-white font-bold h-12 w-12 px-6 py-2 rounded-full shadow-lg">
        <AddIcon fontSize='medium' />
    </button>
  );
}