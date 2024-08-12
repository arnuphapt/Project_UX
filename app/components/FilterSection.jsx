import React from 'react';
import { Tabs,Tab } from '@nextui-org/react';

function FilterSection({ sections, selectedSection, setSelectedSection }) {
    // Sort sections numerically
    const sortedSections = sections.sort((a, b) => a - b);

    return (
            <Tabs
                aria-label="Filter Tabs"
                selectedKey={selectedSection}
                onSelectionChange={(key) => setSelectedSection(key)}
                className="flex justify-center items-center  "
                size='md'
                variant='light'
                color='primary'
            >
                <Tab key="" title="All Section" className='font-semibold p-5'/>
                {sortedSections.map((section) => (
                    <Tab
                        key={section}
                        title={section.toString()}
                        className=' p-5'
                    />
                ))}
            </Tabs>
    );
}

export default FilterSection;
