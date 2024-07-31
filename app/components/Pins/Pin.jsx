import React, { useState } from 'react';
import PinItem from './PinItem';

function Pin({ listOfPins }) {

    return (
        <div className="mt-7 px-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {listOfPins.map((item, index) => (

                    <PinItem pin={item} />

                ))}
            </div>
            
        </div>
    );
}

export default Pin;
