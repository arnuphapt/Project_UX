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
    const toggleTech = (tech) => {
        if (tech === 'All') {
            setSelectedTech([]);
        } else {
            const techLower = tech.toLowerCase();
            setSelectedTech((prev) => {
                const prevLower = prev.map(t => t.toLowerCase());
                return prevLower.includes(techLower)
                    ? prev.filter((t) => t.toLowerCase() !== techLower)
                    : [...prev, tech];
            });
        }
    };

    return (
        <div className="flex justify-center mb-7 ">
            {['All', ...Technology.map(tech => tech.name)].map(tech => (
                <button
                    key={tech}
                    onClick={() => toggleTech(tech)}
                    className={`mr-4 px-1 py-2 hover:border-b-2 border-black  ${
                        (tech === 'All' && selectedTech.length === 0) || selectedTech.map(t => t.toLowerCase()).includes(tech.toLowerCase())
                            ? 'text-black border-b-2 border-black'
                            : 'text-black'
                    }`}
                >
                    {tech}
                </button>
            ))}
        </div>
    );
}

export default FilterBar;
