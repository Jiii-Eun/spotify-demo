import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { MenuItem, Select, styled } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import { SEARCH_TYPE_OPTIONS } from "../../../configs/searchConfig";
import type { SearchType } from "../../../types/searchType";

const FilterSelect = styled(Select)(({ theme }) => ({
  minWidth: 108,
  height: 28,
  borderRadius: 4,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.black200,
  fontSize: 13,
  fontWeight: 600,
  "& .MuiSelect-select": {
    padding: "4px 28px 4px 10px",
    display: "flex",
    alignItems: "center",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiSvgIcon-root": {
    color: theme.palette.text.secondary,
  },
}));

const menuPaperSx = {
  backgroundColor: "background.black200",
  borderRadius: 1,
  mt: 0.5,
};

const menuItemSx = {
  fontSize: 13,
  fontWeight: 500,
  color: "text.primary",
  "&.Mui-selected": {
    backgroundColor: "background.black100",
  },
  "&.Mui-selected:hover": {
    backgroundColor: "background.black100",
  },
  "&:hover": {
    backgroundColor: "background.black300",
  },
};

export default function SearchTypeFilter({
  value,
  onChange,
}: {
  value: SearchType;
  onChange: (type: SearchType) => void;
}) {
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    onChange(event.target.value as SearchType);
  };

  return (
    <FilterSelect
      value={value}
      onChange={handleChange}
      IconComponent={ArrowDropDownIcon}
      MenuProps={{
        slotProps: {
          paper: { sx: menuPaperSx },
        },
      }}
      inputProps={{ "aria-label": "검색 필터" }}
    >
      {SEARCH_TYPE_OPTIONS.map((option) => (
        <MenuItem key={option.value} value={option.value} sx={menuItemSx}>
          {option.label}
        </MenuItem>
      ))}
    </FilterSelect>
  );
}
