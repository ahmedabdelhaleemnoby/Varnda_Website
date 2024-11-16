import { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import api from "../../API/ApiLink.js";
import { AllSearchOptions } from "../../utility/AllSearchOption.js";

export default function Search({ setAddress }) {
  const [searchOptions, setSearchOptions] = useState(AllSearchOptions);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/getAllCitiesAndGovernorates");
        setSearchOptions(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const handleOptionSelect = (event, value) => {
    if (value) {
      const groupedAddress = value.reduce((acc, item) => {
        acc[item.type] = acc[item.type] || [];
        acc[item.type].push(item.name);
        return acc;
      }, {});
      setAddress(groupedAddress);
    }
  };

  return (
    <Autocomplete
      multiple
      limitTags={2}
      id="multiple-limit-tags"
      options={searchOptions}
      onChange={handleOptionSelect}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      sx={{ width: "100%", background: "white", borderRadius: '10px' }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder='ادخل الموقع' 
          onKeyDown={handleKeyDown}
        />
      )}
      renderOption={(props, option, { selected }) => (
        <li {...props} key={`${option.name}-${props['data-option-index']}`}>
          {option.name}
        </li>
      )}
    />
  );
}


