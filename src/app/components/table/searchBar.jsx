import React from "react";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import styles from "./searchBar.module.css";

export default function SearchBar({ className = "", searchableColumns, searchValue, onChangeSearch, typeValue, onChangeType }) {

    return(
        <>
        <div className="pb-2 mt-4 p-2">
            <FormControl className={styles.searchBarInput} sx={{
                '& .MuiInputLabel-root': { color: 'black' },
                '& .MuiOutlinedInput-root': { color: 'black', borderColor: 'black',
                    '& fieldset': { borderColor: 'black' },
                    '&:hover fieldset': { borderColor: 'black' },
                    '&.Mui-focused fieldset': { borderColor: 'black' },
                }
            }}>
                <InputLabel htmlFor="outlined-adornment-amount">Buscar</InputLabel>
                <OutlinedInput
                    id="search-bar-table"
                    size="small"
                    startAdornment={<InputAdornment position="start"><SearchIcon sx={{ color: 'black' }}/></InputAdornment>}
                    label="Buscar"
                    value={searchValue}
                    onChange={(e) => onChangeSearch(e.target.value)}
                />
            </FormControl>
            <TextField
                className={styles.searchBarType}
                id="search-bar-type"
                select
                label="Buscar por"
                value={typeValue}
                onChange={(e) => onChangeType(e.target.value)}
                size="small"
                sx={{ '& .MuiInputLabel-root': { color: 'black' }, '& .MuiOutlinedInput-root': { color: 'black', borderColor: 'black', '& fieldset': { borderColor: 'black' }, '&:hover fieldset': { borderColor: 'black' }, '&.Mui-focused fieldset': { borderColor: 'black' } }, '& .MuiSelect-icon': { color: 'black' } }}
            >
            {searchableColumns.map(column => (
                <MenuItem key={column.name} value={column.name}>
                    {column.name}
                </MenuItem>
            ))}
            </TextField>
        </div>
    </>);
} 