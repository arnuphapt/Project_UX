import React from 'react';
import { Select, SelectItem } from "@heroui/react";

function FilterSection({ sections, selectedSection, setSelectedSection }) {
    // Sort sections numerically
    const sortedSections = sections.sort((a, b) => a - b);

    return (
        <Select
        selectedKeys={[selectedSection]}
        onSelectionChange={(keys) => setSelectedSection(Array.from(keys)[0] || '')}
        className="max-w-40 "
        variant='flat'
    >
        <SelectItem key="" value="" >
            All Sections
        </SelectItem > 
        {sortedSections.map((section) => (
            <SelectItem key={section} value={section}>
                {section === '' ? 'All Sections' : `Section ${section}`}
            </SelectItem>
        ))}

    </Select>
    );
}

export default FilterSection;
