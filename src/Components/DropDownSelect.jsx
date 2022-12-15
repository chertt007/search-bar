import { useSelector, useDispatch } from "react-redux";
import {
  setQuery,
  setFilteredData,
  setSelectedItem,
  saveInHistory,
  setOfferedItems,
  removeFromHistory
} from "../store/searchBarSlice";
import { MAX_OFFERED_RESULTS } from "../constants";

import styled from "styled-components";
import React from "react";

import { RemoveCircle } from "@styled-icons/ionicons-sharp/RemoveCircle";
const DataResult = styled.div`
  margin-top: 5px;
  width: 400px;
  min-height: 30px;
  max-height: 200px;
  border-radius: 2px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  overflow: hidden;
  overflow-x: hidden;
  overflow-y: auto;
`;
const Item = styled.div`
  background-color: ${(props) => (props.isHistory || props.isActive ? "grey" : " inherit")};
  opacity: ${(props) => (props.isActive ? "0.5" : "1")};
  display: flex;
  height: 20px;
  width: 100%;
  padding: 5px 10px;
  font-size: 18px;
  cursor: pointer;
  color: ${(props) => (props.isActive ? "blue" : "inherit")};
  &:hover {
    color: blue;
  }
`;

const ItemRow = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding-right: 20px;
`;
const ItemRowCell = styled.div`
  display: flex;
`;
const DropDownSelect = ({ limit, isDropDownInFocus }) => {
  const filteredData = useSelector((state) => state.searchBarReducer.filteredData);
  const history = useSelector((state) => state.searchBarReducer.history);

  const maxLimitiedDataList = filteredData.slice(0, limit);

  const dispatch = useDispatch();
  const onItemClick = (item) => {
    dispatch(setSelectedItem(item));
    dispatch(saveInHistory(item));
    dispatch(setQuery(item.title));

    dispatch(
      setOfferedItems(
        filteredData
          .slice(0, MAX_OFFERED_RESULTS + 1)
          .filter((offeredItem) => offeredItem.title !== item.title)
      )
    );
    dispatch(setFilteredData([]));
  };

  const ref = React.useRef(null);
  React.useEffect(() => {
    if (isDropDownInFocus) {
      ref.current.focus();
    }
  }, [isDropDownInFocus]);
  const [activeItemIndex, setActiveItemIndex] = React.useState(0);

  const onKeyDownHandler = (event) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      if (activeItemIndex >= maxLimitiedDataList.length - 1) {
        setActiveItemIndex(0);
      } else {
        setActiveItemIndex(activeItemIndex + 1);
      }
    }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      if (activeItemIndex <= 0) {
        setActiveItemIndex(maxLimitiedDataList.length - 1);
      } else {
        setActiveItemIndex(activeItemIndex - 1);
      }
    }
    if (event.key === "Tab" || event.key === "Enter") {
      ref.current.focus();
      const item = maxLimitiedDataList[activeItemIndex];
      onItemClick(item);
    }
  };
  const onRemoveIconClick = (item, event) => {
    event.stopPropagation();
    dispatch(removeFromHistory(item));
  };
  return (
    <DataResult ref={ref} tabIndex="0" onKeyDown={onKeyDownHandler}>
      {maxLimitiedDataList.map((item, index) => {
        const isHistory = history.find((record) => record.title === item.title);
        return (
          <Item
            isActive={activeItemIndex === index}
            isHistory={isHistory}
            key={item + index}
            onClick={() => onItemClick(item)}
          >
            <ItemRow>
              <ItemRowCell> {item.title}</ItemRowCell>
              <ItemRowCell onClick={(event) => onRemoveIconClick(item, event)}>
                {isHistory && <RemoveCircle size={20} />}
              </ItemRowCell>
            </ItemRow>
          </Item>
        );
      })}
    </DataResult>
  );
};

export default DropDownSelect;
