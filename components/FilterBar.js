// components/FilterBar.js
import React from 'react';

const FilterBar = ({ filters, setFilters }) => {
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="filter-bar">
            <select name="saison" value={filters.saison} onChange={handleFilterChange}>
                <option value="">All Seasons</option>
                <option value="printemps">Spring</option>
                <option value="été">Summer</option>
                <option value="automne">Fall</option>
                <option value="hiver">Winter</option>
            </select>
            <select name="niveau" value={filters.niveau} onChange={handleFilterChange}>
                <option value="">All Levels</option>
                <option value="novice">Novice</option>
                <option value="moyen">Intermediate</option>
                <option value="pro">Pro</option>
            </select>
        </div>
    );
};

export default FilterBar;
