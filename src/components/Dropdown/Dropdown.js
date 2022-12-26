import React from "react";
import { useState } from "react";
import {
  DropdownContainer,
  DropdownHeader,
  DropdownHeaderContainer,
  DropdownList,
  DropdownListContainer,
  IconWrapper,
  ListItem,
} from "./Dropdown.style";
import { FiChevronDown } from "react-icons/fi";
import { MdKeyboardArrowUp } from "react-icons/md";

const Dropdown = ({
  options: options,
  dropdownText,
  label,
  value,
  onChange,
  ...restProps
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // console.log(options);
  const toggling = () => setIsOpen(!isOpen);
  const [selectedOption, setSelectedOption] = useState(null);

  const onOptionClicked = (value) => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  const [dvalue, setDValue] = useState("");
  // const handleDataSave = (e, value) => {
  //   setDValue(e.target.value);
  // };

  // const handleListChange = (e, value) => {
  //   // setDValue(e, value)
  //   onChange(e);
  // };

  return (
    <DropdownContainer {...restProps}>
      <DropdownHeaderContainer onClick={toggling}>
        <DropdownHeader>{selectedOption || dropdownText}</DropdownHeader>
        <IconWrapper>
          {isOpen ? <MdKeyboardArrowUp /> : <FiChevronDown />}
        </IconWrapper>
      </DropdownHeaderContainer>
      {isOpen && (
        <DropdownListContainer>
          <DropdownList>
            {options.map((option) => (
              <ListItem
                value={option?.value}
                onClick={() => {
                  onChange(option);
                  onOptionClicked(option?.label);
                }}
              >
                {option.label}
              </ListItem>
            ))}
          </DropdownList>

          {/* {options.map((option) => (
              <ListItem onClick={onOptionClicked(option)}>{option}</ListItem>
            ))} */}
        </DropdownListContainer>
      )}
    </DropdownContainer>
  );
};

export default Dropdown;
