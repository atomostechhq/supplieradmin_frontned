import { Container, SearchBox, SearchIcon } from "./Search.style";
import { HiSearch } from "react-icons/hi";
import { useState } from "react";

const Search = ({ placeholder, onClick, ...restProps }) => {
  const [show, setShow] = useState(false);
  return (
    <Container>
      <SearchBox
        {...restProps}
        type="search"
        placeholder={placeholder}
      ></SearchBox>
      <SearchIcon onClick={(e) => onClick(e)} opacity={show}>
        <HiSearch />
      </SearchIcon>
    </Container>
  );
};

export default Search;
