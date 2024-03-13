import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function Dropdown({ categories, name, handleChange }) {
  const [selectedCategory, setSelectedCategory] = React.useState(undefined); // Set initial state to undefined

  const handleLocalChange = (event) => {
    setSelectedCategory(event.target.value);
    handleChange(event);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{name}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedCategory !== undefined ? selectedCategory : ''} // Conditionally set value prop
          onChange={handleLocalChange}
        >
          {categories.map((category) => (
            <MenuItem key={category.value} value={category.value}>{category.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
