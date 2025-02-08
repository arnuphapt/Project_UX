import React, { useEffect, useState } from 'react';
import { Tabs, Tab } from "@heroui/react";
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../Shared/firebaseConfig';

function FilterYears({ selectedPeriod, setSelectedPeriod }) {
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const q = query(collection(db, 'filterdata'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const filtersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFilters(filtersData);
      } catch (error) {
        console.error('Error fetching filters:', error);
      }
    };

    fetchFilters();
  }, []);

  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return `${start.toLocaleDateString('th-TH', { 
      year: '2-digit',
      month: 'short'
    })} - ${end.toLocaleDateString('th-TH', { 
      year: '2-digit',
      month: 'short'
    })}`;
  };

  return (
    <Tabs
      aria-label="Filter by Years"
      selectedKey={selectedPeriod}
      onSelectionChange={setSelectedPeriod}
      variant="flat"
      className="max-w-md"
    >
      <Tab key="" title="All Periods" />
      {filters.map((filter) => (
        <Tab 
          key={filter.id} 
          title={filter.name}
          description={formatDateRange(filter.startDate, filter.endDate)}
        />
      ))}
    </Tabs>
  );
}

export default FilterYears;