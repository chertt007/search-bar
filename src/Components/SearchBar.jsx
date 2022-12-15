import React from "react";
import "./SearchBar.css";
import styled from "styled-components";

import { SearchAlt } from "@styled-icons/boxicons-regular/SearchAlt";
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline";
import { useSelector, useDispatch } from "react-redux";
import {
  setQuery,
  setFilteredData,
  setSelectedItem,
  setOfferedItems,
  setIsDropDownOpen
} from "../store/searchBarSlice";
import DropDownSelect from "./DropDownSelect";

import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import ClickAwayListener from "@mui/base/ClickAwayListener";
const SearcIcon = styled(SearchAlt)`
  color: grey;
`;
const CrossIcon = styled(CloseOutline)`
  color: grey;
`;
const SearchStyledContainer = styled.div``;
const SearchInputs = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;

const SearchIconPlaceHolder = styled.div`
  height: 60px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ClearIconPlaceHolder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const SearchBar = ({ limit }) => {
  const data = useSelector((state) => state.searchBarReducer.data);
  const query = useSelector((state) => state.searchBarReducer.query);
  const filteredData = useSelector((state) => state.searchBarReducer.filteredData);
  const history = useSelector((state) => state.searchBarReducer.history);
  const isDropDownOpen = useSelector((state) => state.searchBarReducer.isDropDownOpen);

  const dispatch = useDispatch();

  const onFilterChange = (event) => {
    const query = event.target.value;
    dispatch(setQuery(query));
    const newFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(query.toLowerCase());
    });

    if (query === "") {
      dispatch(setFilteredData([]));
    } else {
      dispatch(setFilteredData(newFilter));
    }
  };

  const clear = () => {
    dispatch(setFilteredData([]));
    dispatch(setQuery(""));
    dispatch(setSelectedItem(null));
    dispatch(setOfferedItems([]));
  };
  const onClickAway = () => {
    dispatch(setIsDropDownOpen(false));
  };
  const onFocus = () => {
    if (filteredData.length > 0) dispatch(setIsDropDownOpen(true));
  };
  const dropDownKeyActions = ["ArrowRight", "ArrowDown", "ArrowUp", "ArrowLeft", "Tab", "Enter"];
  const [isDropDownInFocus, setIsDropDownInFocus] = React.useState(false);

  const onKeyDownHandler = (event) => {
    if (dropDownKeyActions.includes(event.key)) {
      setIsDropDownInFocus(true);
    } else {
      setIsDropDownInFocus(false);
    }
  };

  return (
    <SearchStyledContainer>
      <ClickAwayListener onClickAway={onClickAway}>
        <SearchInputs>
          <FormControl variant="standard">
            <InputLabel htmlFor="input-with-icon-adornment">Search...</InputLabel>
            <Input
              onKeyDown={onKeyDownHandler}
              autoFocus={true}
              onFocus={onFocus}
              id="input-with-icon-adornment"
              value={query}
              onChange={onFilterChange}
              endAdornment={
                <InputAdornment position="end">
                  {filteredData.length === 0 ? (
                    <SearchIconPlaceHolder>
                      <SearcIcon size={20} />
                    </SearchIconPlaceHolder>
                  ) : (
                    <ClearIconPlaceHolder onClick={clear}>
                      <CrossIcon size={20} />
                    </ClearIconPlaceHolder>
                  )}
                </InputAdornment>
              }
            />
          </FormControl>
          {isDropDownOpen && (
            <DropDownSelect history={history} limit={limit} isDropDownInFocus={isDropDownInFocus} />
          )}
        </SearchInputs>
      </ClickAwayListener>
    </SearchStyledContainer>
  );
};

export default SearchBar;
