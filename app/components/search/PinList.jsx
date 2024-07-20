import React, { useState } from 'react';
import PinItem from './PinItem';

const Technology = [
    { id: 1, name: 'Wireframe', icon: '' },
    { id: 2, name: 'Ux' },
    { id: 3, name: 'Ui' },
    { id: 4, name: 'Canva' },
    { id: 5, name: 'Wix' },
    { id: 6, name: 'Figma' },
];

function PinList({ listOfPins, searchQuery }) {
    const [selectedTech, setSelectedTech] = useState('All');

    // Filter pins based on the selected tech and search query
    const filteredPins = listOfPins.filter(pin =>
        (selectedTech === 'All' || pin.techList.includes(selectedTech)) &&
        (pin.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
         pin.techList.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase())))
    );

    return (
        <div className="mt-7 px-5">
            <div className="mb-4">
                {['All', ...Technology.map(tech => tech.name)].map(tech => (
                    <button
                        key={tech}
                        onClick={() => setSelectedTech(tech)}
                        className={`mr-2 px-4 py-2 rounded ${
                            selectedTech === tech
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200'
                        }`}
                    >
                        {tech}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-4 gap-4 mx-auto">
                {filteredPins.map((item) => (
                    <PinItem key={item.id} pin={item} />
                ))}
            </div>
        </div>
    );
}

export default PinList;
