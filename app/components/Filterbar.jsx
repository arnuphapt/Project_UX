// FilterBar.js
import React from 'react';

const Technology = [
    { id: 1, name: 'Wireframe' },
    { id: 2, name: 'Ux' },
    { id: 3, name: 'Ui' },
    { id: 4, name: 'Canva' },
    { id: 5, name: 'Wix' },
    { id: 6, name: 'Figma' },
];

function FilterBar({ selectedTech, setSelectedTech }) {
    return (
        <div className="flex justify-center mb-7">
            {['All', ...Technology.map(tech => tech.name)].map(tech => (
                <button
                    key={tech}
                    onClick={() => setSelectedTech(tech)}
                    className={`mr-2 px-4 py-2 rounded ${selectedTech === tech ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    {tech}
                </button>
            ))}
        </div>
    );
}

export default FilterBar;
