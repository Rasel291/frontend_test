// components/Charts.js
import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

// Register required components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const Charts = ({ seasonData, passTypeData }) => {
    const barChartData = {
        labels: Object.keys(seasonData),
        datasets: [
            {
                label: 'Average Price per Season',
                data: Object.values(seasonData),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const pieChartData = {
        labels: Object.keys(passTypeData),
        datasets: [
            {
                label: 'Pass Type Distribution',
                data: Object.values(passTypeData),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    return (
        <div className="charts">
            <div className="bar-chart">
                <Bar data={barChartData} />
            </div>
            <div className="pie-chart">
                <Pie data={pieChartData} />
            </div>
        </div>
    );
};

export default Charts;
