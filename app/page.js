
"use client";  

import React, { useState, useEffect } from 'react';
import FilterBar from '../components/FilterBar';
import NumberDisplay from '../components/NumberDisplay';
import Charts from '../components/Charts';

const fetchData = async () => {
    
    const baseUrl = process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://your-production-url.com'; 

   
    const response = await fetch(`${baseUrl}/database.json`);
    const data = await response.json();
    return data;
};

const Home = () => {
    const [filters, setFilters] = useState({ saison: '', niveau: '' });
    const [filteredData, setFilteredData] = useState([]);
    const [averagePrice, setAveragePrice] = useState(0);
    const [seasonData, setSeasonData] = useState({});
    const [passTypeData, setPassTypeData] = useState({});

    
    useEffect(() => {
        const getData = async () => {
            const initialData = await fetchData();
            setFilteredData(initialData); 
        };
        getData();
    }, []);

    
    useEffect(() => {
        const data = filteredData.filter((item) => {
            return (
                (filters.saison === '' || item.saison === filters.saison) &&
                (filters.niveau === '' || item.niveau === filters.niveau)
            );
        });

        
        const total = data.reduce((sum, item) => sum + item.prix, 0);
        setAveragePrice(data.length ? total / data.length : 0);

        
        const seasonAvg = data.reduce((acc, item) => {
            acc[item.saison] = acc[item.saison]
                ? { total: acc[item.saison].total + item.prix, count: acc[item.saison].count + 1 }
                : { total: item.prix, count: 1 };
            return acc;
        }, {});

        const seasonChartData = Object.keys(seasonAvg).reduce((acc, key) => {
            acc[key] = seasonAvg[key].total / seasonAvg[key].count;
            return acc;
        }, {});

        setSeasonData(seasonChartData);

        
        
        const passCount = data.reduce((acc, item) => {
            acc[item.passe] = (acc[item.passe] || 0) + 1;
            return acc;
        }, {});

        setPassTypeData(passCount);
    }, [filters, filteredData]);

    return (
        <div>
            <h1>Dashboard</h1>
            <FilterBar filters={filters} setFilters={setFilters} />
            <NumberDisplay averagePrice={averagePrice} />
            <Charts seasonData={seasonData} passTypeData={passTypeData} />
        </div>
    );
};

export default Home;
