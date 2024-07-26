// FilterBar.js
import React from 'react';

const Technology = [
    { id: 1, name: 'Wireframe' },
    { id: 2, name: 'UX' },
    { id: 3, name: 'UI' },
    { id: 4, name: 'Canva' },
    { id: 5, name: 'Wix' },
    { id: 6, name: 'Figma' },
];

function FilterBar({ selectedTech, setSelectedTech }) {
    const toggleTech = (tech) => {
        if (tech === 'All') {
            // If 'All' is clicked, clear all selections
            setSelectedTech([]);
        } else {
            // Toggle technology selection
            setSelectedTech((prev) =>
                prev.includes(tech)
                    ? prev.filter((t) => t !== tech) // Remove tech if already selected
                    : [...prev, tech] // Add tech if not selected
            );
        }
    };

    return (
        <div className="flex justify-center mb-7">
            {['All', ...Technology.map(tech => tech.name)].map(tech => (
                <button
                    key={tech}
                    onClick={() => toggleTech(tech)}
                    className={`mr-2 px-4 py-2 rounded ${
                        (tech === 'All' && selectedTech.length === 0) || selectedTech.includes(tech)
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200'
                    }`}
                >
                    {tech}
                </button>
            ))}
            
        </div>
        
    );
}

export default FilterBar;
