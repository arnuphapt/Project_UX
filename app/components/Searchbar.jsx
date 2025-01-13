import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, useDisclosure } from "@nextui-org/react";
import { Search, Tag, Layout, SlidersHorizontal,Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';

const SearchModal = ({ listOfPins = [], searchQuery, setSearchQuery }) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [selectedCategory, setSelectedCategory] = React.useState("trending");
  const [selectedTag, setSelectedTag] = React.useState(null);
  const [selectedSection, setSelectedSection] = React.useState(null);
  const [modalSearchQuery, setModalSearchQuery] = React.useState("");
  const [showPosts, setShowPosts] = React.useState(false);
  const router = useRouter();

  // Extract unique tags and count their occurrences
  const tagCounts = React.useMemo(() => {
    const counts = {};
    listOfPins.forEach(pin => {
      if (pin.techList) {
        pin.techList.forEach(tech => {
          counts[tech] = (counts[tech] || 0) + 1;
        });
      }
    });
    return Object.entries(counts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
  }, [listOfPins]);

  // Extract unique sections and count their occurrences
  const sectionCounts = React.useMemo(() => {
    const counts = {};
    listOfPins.forEach(pin => {
      if (pin.section) {
        counts[pin.section] = (counts[pin.section] || 0) + 1;
      }
    });
    return Object.entries(counts)
      .map(([section, count]) => ({ section, count }))
      .sort((a, b) => b.count - a.count);
  }, [listOfPins]);

  // Filter tags and sections based on search query
  const filteredTagCounts = React.useMemo(() => {
    if (!modalSearchQuery) return tagCounts;
    return tagCounts.filter(({ tag }) => 
      tag.toLowerCase().includes(modalSearchQuery.toLowerCase())
    );
  }, [tagCounts, modalSearchQuery]);

  const filteredSectionCounts = React.useMemo(() => {
    if (!modalSearchQuery) return sectionCounts;
    return sectionCounts.filter(({ section }) => 
      section.toLowerCase().includes(modalSearchQuery.toLowerCase())
    );
  }, [sectionCounts, modalSearchQuery]);

  const filteredPins = React.useMemo(() => {
    const searchLower = modalSearchQuery.toLowerCase();
    
    // First, filter by search query if it exists
    let searchedPins = listOfPins;
    if (modalSearchQuery) {
      searchedPins = listOfPins.filter(pin => (
        pin.title?.toLowerCase().includes(searchLower) ||
        pin.userName?.toLowerCase().includes(searchLower) ||
        pin.section?.toLowerCase().includes(searchLower) ||
        pin.techList?.some(tech => tech.toLowerCase().includes(searchLower))
      ));
    }
    
    // Then apply category-specific filters
    switch (selectedCategory) {
      case 'trending':
        return modalSearchQuery ? searchedPins : [];
        
      case 'tags':
        if (selectedTag) {
          return searchedPins.filter(pin => pin.techList?.includes(selectedTag));
        }
        return modalSearchQuery ? searchedPins : [];
        
      case 'sections':
        if (selectedSection) {
          return searchedPins.filter(pin => pin.section === selectedSection);
        }
        return modalSearchQuery ? searchedPins : [];
        
      default:
        return [];
    }
  }, [listOfPins, selectedTag, selectedSection, selectedCategory, modalSearchQuery]);

  const handleTagSelect = (tag) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
      setShowPosts(false);
    } else {
      setSelectedTag(tag);
      setSelectedSection(null);
      setShowPosts(true);
    }
  };

  const handleSectionSelect = (section) => {
    if (selectedSection === section) {
      setSelectedSection(null);
      setShowPosts(false);
    } else {
      setSelectedSection(section);
      setSelectedTag(null);
      setShowPosts(true);
    }
  };

  const handleClose = () => {
    setSelectedTag(null);
    setSelectedSection(null);
    setModalSearchQuery("");
    setShowPosts(false);
    onClose();
  };

  const categories = [
    { key: "trending", label: "Trending", icon: <Search size={18} /> },
    { key: "tags", label: "By Tags", icon: <Tag size={18} /> },
    { key: "sections", label: "By Sections", icon: <Layout size={18} /> }
  ];
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('th-TH', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="p-2 w-full md:w-2/5 flex items-center">
      <Input
        startContent={<Search className="text-[25px]" />}
        size="lg"
        variant="bordered"
        type="text"
        placeholder="Search"
        radius="full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        endContent={
          <Button
            isIconOnly
            variant="light"
            onPress={onOpen}
          >
            <SlidersHorizontal size={20} />
          </Button>
        }
      />
      
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        size="5xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Search Results
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  startContent={<Search size={20} />}
                  size="lg"
                  placeholder="Search tags and sections..."
                  variant="bordered"
                  value={modalSearchQuery}
                  onChange={(e) => setModalSearchQuery(e.target.value)}
                  className="mb-4"
                />

                <div className="flex gap-6">
                  {/* Sidebar Navigation */}
                  <div className="w-64 shrink-0 border-r">
                    <nav className="pr-4">
                      {categories.map((category) => (
                        <button
                          key={category.key}
                          onClick={() => {
                            if (selectedCategory === category.key) {
                              setSelectedCategory('trending');
                              setSelectedTag(null);
                              setSelectedSection(null);
                              setShowPosts(false);
                              setModalSearchQuery('');
                            } else {
                              setSelectedCategory(category.key);
                              setSelectedTag(null);
                              setSelectedSection(null);
                              setShowPosts(false);
                            }
                          }}
                          className={`w-full text-left px-4 py-2 rounded-lg mb-1 transition-colors flex items-center gap-2 ${
                            selectedCategory === category.key
                              ? 'bg-blue-100 text-blue-700'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          {category.icon}
                          {category.label}
                        </button>
                      ))}
                    </nav>
                  </div>

                  {/* Content Area */}
                  <div className="flex-grow">
                    {showPosts ? (
                      <div className="flex flex-col">
                        <p className="text-gray-500 mb-4">
                          Found {filteredPins.length} posts for {selectedTag ? `tag "${selectedTag}"` : `section "${selectedSection}"`}
                        </p>
                        <div className="flex flex-col divide-y">
                          {filteredPins.map((pin) => (
                            <div 
                              key={pin.id}
                              onClick={() => router.push(`/post/${pin.userName}/${pin.id}`)}
                              className="flex items-center justify-between py-3 hover:bg-gray-50 cursor-pointer"
                            >
                              <div className="flex flex-col gap-1">
                                <h3 className="text-base font-medium">{pin.title}</h3>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                  <span>{pin.userName}</span>
                                  <span>Section {pin.section}</span>
                                  <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{formatTimestamp(pin.timestamp)}</span>
          </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : selectedCategory === 'tags' ? (
                      <div className="flex flex-col">
                        <h3 className="text-base font-medium mb-4">Tags ({filteredTagCounts.length})</h3>
                        {filteredTagCounts.map(({ tag, count }) => (
                          <button
                            key={tag}
                            onClick={() => handleTagSelect(tag)}
                            className="group flex items-center justify-between py-2 hover:bg-gray-50"
                          >
                            <div className="flex items-center gap-2 text-gray-700">
                              <Tag size={14} className="text-gray-400" />
                              <span>{tag}</span>
                            </div>
                            <span className="text-gray-500 text-sm">{count}</span>
                          </button>
                        ))}
                        {filteredTagCounts.length === 0 && (
                          <p className="text-gray-500 text-center py-4">No matching tags found</p>
                        )}
                      </div>
                    ) : selectedCategory === 'sections' ? (
                      <div className="flex flex-col">
                        <h3 className="text-base font-medium mb-4">Sections ({filteredSectionCounts.length})</h3>
                        {filteredSectionCounts.map(({ section, count }) => (
                          <button
                            key={section}
                            onClick={() => handleSectionSelect(section)}
                            className="group flex items-center justify-between py-2 hover:bg-gray-50"
                          >
                            <div className="flex items-center gap-2 text-gray-700">
                              <Layout size={14} className="text-gray-400" />
                              <span>{section}</span>
                            </div>
                            <span className="text-gray-500 text-sm">{count}</span>
                          </button>
                        ))}
                        {filteredSectionCounts.length === 0 && (
                          <p className="text-gray-500 text-center py-4">No matching sections found</p>
                        )}
                      </div>
                    ) : selectedCategory === 'trending' ? (
                      <div className="flex flex-col">
                        {modalSearchQuery ? (
                          <>
                            <p className="text-gray-500 mb-4">
                              Found {filteredPins.length} posts matching "{modalSearchQuery}"
                            </p>
                            <div className="flex flex-col divide-y">
                              {filteredPins.map((pin) => (
                                <div 
                                  key={pin.id}
                                  onClick={() => router.push(`/post/${pin.userName}/${pin.id}`)}
                                  className="flex items-center justify-between py-3 hover:bg-gray-50 cursor-pointer"
                                >
                                  <div className="flex flex-col gap-1">
                                    <h3 className="text-base font-medium">{pin.title}</h3>
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                      <span>{pin.userName}</span>
                                      <span>Section {pin.section}</span>

                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            {filteredPins.length === 0 && (
                              <p className="text-gray-500 text-center py-4">No posts found matching your search</p>
                            )}
                          </>
                        ) : (
                          <div className="text-center text-gray-500 py-8">
                            Type to search posts
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center text-gray-500 py-8">
                        Select a category or type to search
                      </div>
                    )}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                {showPosts && (
                  <Button 
                    color="primary" 
                    variant="light" 
                    onPress={() => setShowPosts(false)}
                    className="mr-2"
                  >
                    Back
                  </Button>
                )}
                <Button color="danger" variant="light" onPress={handleClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SearchModal;