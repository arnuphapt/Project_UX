import React from 'react';
import { Button, ButtonGroup } from "@nextui-org/react";

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
        <div className="flex flex-wrap justify-center mb-7">
            {['All', ...Technology.map(tech => tech.name)].map(tech => (
                <ButtonGroup>

                    <Button variant='light'
                        key={tech}
                        onClick={() => toggleTech(tech)}
                        className={`mr-4 mb-2 px-3 py-2 border-b-3 ${(tech === 'All' && selectedTech.length === 0) || selectedTech.map(t => t.toLowerCase()).includes(tech.toLowerCase()) ? 'text-black'
                                : 'text-gray-500 border-transparent hover:border-gray-300'}`}>
                        {tech}
                    </Button>
                </ButtonGroup>

            ))}
        </div>
    );
}

export default FilterBar;
