import React, { useState } from 'react';
import PinItem from './PinItem';
import { HiSearch } from "react-icons/hi";

const Technology = [
    { id: 1, name: 'Wireframe', icon: '' },
    { id: 2, name: 'Ux' },
    { id: 3, name: 'Ui' },
    { id: 4, name: 'Canva' },
    { id: 5, name: 'Wix' },
    { id: 6, name: 'Figma' },
];

function PinList({ listOfPins }) {
    const [selectedTech, setSelectedTech] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Filter pins based on the selected tech and search query
    const filteredPins = listOfPins.filter(pin =>
        (selectedTech === 'All' || pin.techList.includes(selectedTech)) &&
        (pin.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
         pin.techList.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase())))
    );

    return (
        <div className="mt-7 px-5">
            <div className="bg-[#e9e9e9] p-3
        flex gap-3 items-center rounded-full w-full hidden md:flex">
            <HiSearch className='text-[25px] text-gray-500' />

                <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-[#e9e9e9] p-3 flex gap-3 items-center rounded-full w-full"
                />
                

            </div>
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
            <div className="grid grid-cols-4 gap-4 mx-auto">
                {filteredPins.map((item) => (
                    <PinItem key={item.id} pin={item} />
                ))}
            </div>
        </div>
    );
}

export default PinList;


/*import React, { useState } from 'react';
import PinItem from './PinItem';

const Technology = [
    { id: 1, name: 'Sec1' },
    { id: 2, name: 'Sec2' },
    { id: 3, name: 'Sec3' },
    { id: 4, name: 'Sec4' },
];

function PinList({ listOfPins }) {
    const [selectedGroup, setselectedGroup] = useState('All');

    // Filter pins based on the selected tech
    const filteredPins = listOfPins.filter(pin =>
        selectedGroup === 'All' || pin.techList.includes(selectedGroup)
    );

    return (
        <div className="mt-7 px-5">
            <div className="mb-4">
                <select
                    value={selectedGroup}
                    onChange={(e) => setselectedGroup(e.target.value)}
                    className="p-2 border border-gray-300 rounded"
                >
                    <option value="All">All</option>
                    {Technology.map(tech => (
                        <option key={tech.id} value={tech.name}>
                            {tech.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-4 gap-4 mx-auto">
                {filteredPins.map((item, index) => (
                    <PinItem key={index} pin={item} />
                ))}
            </div>
        </div>
    );
}

export default PinList;
 */