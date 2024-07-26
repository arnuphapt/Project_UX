import React, { useState } from 'react';
import PinItem from './PinItem';

function Pin({ listOfPins }) {

    return (
        <div className="mt-7 px-5">
            <div className="grid grid-cols-6 gap-4 mx-auto">
                {listOfPins.map((item, index) => (

                    <PinItem pin={item} />

                ))}
            </div>
        </div>
    );
}

export default Pin;
