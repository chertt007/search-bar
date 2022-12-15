import styled from "styled-components";
import "./App.css";
import SearchBar from "./Components/SearchBar";
import SearchResults from "./Components/SearchResults";
import { MAX_PRODUCTS_IN_DROP_DOWN } from "./constants";
const AppStyledContainer = styled.div`
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  background-image: linear-gradient(90deg, #fdc830, #f37335);
`;
function App() {
  //*configurable limit of tips list for user in serachBar. should be placed with other config constants.
  //*you can try to search apple - in mock data set there are 15 different apples but you will see not much than MAX_PRODUCTS_IN_DROP_DOWN
  return (
    <AppStyledContainer>
      <SearchBar limit={MAX_PRODUCTS_IN_DROP_DOWN} />
      <SearchResults />
    </AppStyledContainer>
  );
}

export default App;
