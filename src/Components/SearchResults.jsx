import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

const ResultsStyledWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
  flex-direction: column;
  margin-top: 50px;
  background-color: white;
  border: 0;
  border-radius: 2px;
  font-size: 18px;
  padding: 15px;
  width: 600px;
`;
const Header = styled.div`
  display: flex;
  margin-bottom: 20px;
  font-size: 32px;
  text-decoration-line: underline;
`;
const ResultCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  padding: 5px;
  background-color: lightgrey;
  opacity: 0.5;
  margin-bottom: 10px;
`;
const ResultCardMainContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
`;
const ResultCardDescription = styled.a`
  font-size: 18px;
`;
const Devider = styled.div`
  width: 100%;
  height: 1px;
  background-color: black;
  margin-bottom: 20px;
`;
const SearchResults = () => {
  const selectedItem = useSelector((state) => state.searchBarReducer.selectedItem);

  const offeredSelectedItems = useSelector((state) => state.searchBarReducer.offeredSelectedItems);
  if (selectedItem !== null) {
    return (
      <ResultsStyledWrapper>
        <Header>Search Results : </Header>
        <ResultCard>
          <ResultCardMainContent>
            <div>- {selectedItem.title}</div>
            <div>{selectedItem.price}</div>
          </ResultCardMainContent>
          <ResultCardDescription href={selectedItem.link} target="_blank">
            <p>{selectedItem.link}</p>
          </ResultCardDescription>
        </ResultCard>
        <Devider></Devider>
        <Header style={{ fontSize: "24px" }}>Common Results:</Header>
        {offeredSelectedItems.length > 0 ? (
          <>
            {offeredSelectedItems.map((item, index) => {
              return (
                <ResultCard key={item.title + index}>
                  <ResultCardMainContent>
                    <div>- {item.title}</div>
                    <div>{item.price}</div>
                  </ResultCardMainContent>
                  <ResultCardDescription href={item.link} target="_blank">
                    <p>{item.link}</p>
                  </ResultCardDescription>
                </ResultCard>
              );
            })}
          </>
        ) : (
          <>Nothing Else Was Found :) </>
        )}
      </ResultsStyledWrapper>
    );
  } else {
    return <></>;
  }
};
export default SearchResults;
