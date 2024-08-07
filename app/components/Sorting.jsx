import React, { useState } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

function Sorting({ sortBy, setSortBy }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));
  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
  const handleSortChange = (key) => {
    setSortBy(key);
    setIsOpen(false); // Close the dropdown after selecting an option
  };

  return (
    <Dropdown isOpen={isOpen} onOpenChange={setIsOpen} >
      <DropdownTrigger>
        <Button className="capitalize"
          variant="bordered" endContent={isOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}>
          {sortBy === 'default' ? 'Newest posts' : sortBy.charAt(0).toUpperCase() + sortBy.slice(1).replace(/-/g, ' ')}
        </Button>
      </DropdownTrigger>
      <DropdownMenu disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys} onSelectionChange={setSelectedKeys}

        aria-label="Sorting Options" onAction={handleSortChange}>
        <DropdownItem key="default">Newest posts</DropdownItem>
        <DropdownItem key="Oldest posts">Oldest posts</DropdownItem>
        <DropdownItem key="Most Liked">Most Liked</DropdownItem>
        <DropdownItem key="Most Viewed">Most Viewed</DropdownItem>
        <DropdownItem key="Name A-Z">Name A-Z</DropdownItem>
        <DropdownItem key="Name Z-A">Name Z-A</DropdownItem>
        <DropdownItem key="userName">User Name Alphabet</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default Sorting;
