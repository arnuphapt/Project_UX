import React from 'react';
import { Tabs, Tab } from '@nextui-org/react';

function FilterYears({ selectedPeriod, setSelectedPeriod }) {
    const periods = [
        { label: '1/67', value: '1/67' },
        { label: '2/67', value: '2/67' },
    ];

    return (
        <Tabs
            aria-label="Filter by Years"
            selectedKey={selectedPeriod}
            onSelectionChange={setSelectedPeriod}
            variant="flat"
        >
<Tab key="" title="All Years" />
{periods.map((period) => (
    <Tab key={period.value} title={period.label} />
))}

        </Tabs>
    );
}

export default FilterYears;
