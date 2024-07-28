// Sorting.js
import React from 'react';

function Sorting({ sortBy, setSortBy }) {
    return (
        <div className="mb-4">
            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 border border-gray-300 rounded"
            >
                <option value="default">Oldest</option>
                <option value="newest">Newest</option> {/* Added */}
                <option value="likes">Most Liked</option>
                <option value="views">Most Viewed</option>
                <option value="title-asc">Name A-Z</option> {/* Added */}
                <option value="title-desc">Name Z-A</option> {/* Added */}
                <option value="userName">User Name</option>
            </select>
        </div>
    );
}

export default Sorting;
