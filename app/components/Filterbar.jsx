import React from 'react';
import { Button, ButtonGroup } from "@nextui-org/react";
import { FaProjectDiagram, FaPencilRuler, FaPaintBrush } from 'react-icons/fa';

import { MdViewQuilt } from 'react-icons/md';
import { SiWix, SiFigma } from 'react-icons/si';
import { AiOutlineAppstore } from 'react-icons/ai';
import { HiMiniPresentationChartLine } from "react-icons/hi2";

const Technology = [
    { id: 1, name: 'Project', icon: <FaProjectDiagram /> },
    { id: 2, name: 'Ux', icon: <FaPencilRuler /> },
    { id: 3, name: 'Ui', icon: <FaPaintBrush /> },
    { id: 4, name: 'Wireframe', icon: <MdViewQuilt /> },
    { id: 5, name: 'Wix', icon: <SiWix /> },
    { id: 6, name: 'Figma', icon: <SiFigma /> },
    { id: 7, name: 'Canva', icon: <HiMiniPresentationChartLine /> },


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
            {['All', ...Technology.map(tech => tech.name)].map((tech, index) => (
                <ButtonGroup key={tech}>
                    <Button
                        variant='light'
                        onClick={() => toggleTech(tech)}
                        className={`mr-4 mb-2 px-3 py-2 border-b-3  ${(tech === 'All' && selectedTech.length === 0) || selectedTech.map(t => t.toLowerCase()).includes(tech.toLowerCase()) ? 'text-blue-600 border-blue-200'
                                : 'text-black border-transparent hover:border-gray-300'}`}>
                        {tech === 'All' ? <AiOutlineAppstore /> : Technology.find(t => t.name === tech)?.icon} {/* Icon */}
                        <span className="ml-2">{tech}</span>
                    </Button>
                </ButtonGroup>
            ))}
        </div>
    );
}

export default FilterBar;
