import React from 'react';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { Filter } from 'lucide-react';
import FilterSection from './Filter/FilterSection'
import FilterYears from './Filter/FilterYears'
import Sorting from './Filter/Sorting'
const FilterModal = ({ 
  sections,
  selectedSection,
  setSelectedSection,
  selectedPeriod,
  setSelectedPeriod,
  sortBy,
  setSortBy
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:flex justify-between items-center w-full gap-4">
        <FilterSection 
          sections={sections} 
          selectedSection={selectedSection} 
          setSelectedSection={setSelectedSection} 
        />
        <FilterYears 
          selectedPeriod={selectedPeriod} 
          setSelectedPeriod={setSelectedPeriod}
        />
        <Sorting 
          sortBy={sortBy} 
          setSortBy={setSortBy} 
        />
      </div>

      {/* Mobile View */}
      <div className="md:hidden w-full">
        <Button
          onPress={handleOpen}
          className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200"
          variant="flat"
        >
          <Filter size={20} />
          <span>Filters</span>
        </Button>

        <Modal 
          isOpen={isOpen} 
          onClose={handleClose}
          placement="bottom"
          classNames={{
            backdrop: "bg-black/50",
            base: "rounded-t-lg",
            body: "p-0",
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Filters
                </ModalHeader>
                <ModalBody className="px-6 py-4 space-y-6">
                  {/* Section Filter */}
                  <div className="space-y-2">
                    <h1 className="font-medium">Section</h1>
                    <FilterSection 
                      sections={sections} 
                      selectedSection={selectedSection} 
                      setSelectedSection={setSelectedSection} 
                    />
                  </div>

                  {/* Year Filter */}
                  <div className="space-y-2">
                    <h1 className="font-medium">Period</h1>
                    <FilterYears 
                      selectedPeriod={selectedPeriod} 
                      setSelectedPeriod={setSelectedPeriod}
                    />
                  </div>

                  {/* Sort Options */}
                  <div className="space-y-2">
                    <h1 className="font-medium">Sort By</h1>
                    <Sorting 
                      sortBy={sortBy} 
                      setSortBy={setSortBy} 
                    />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button 
                    color="primary" 
                    onPress={onClose} 
                    className="w-full"
                  >
                    Apply Filters
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

export default FilterModal;