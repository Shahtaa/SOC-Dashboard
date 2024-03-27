import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

const ReititinComponent = () => {
    const [logData, setLogData] = useState([]);

    useEffect(() => {
        const fetchLogData = async () => {
            try {
                const response = await fetch('https://raw.githubusercontent.com/bc-web-ohjelmistokehitys/soc_data/01e6194a0f01540db2d884135f479d64d557882f/reititin_mock.json');
                const data = await response.json();
                setLogData(data);
            } catch (error) {
                console.error('Error fetching log data:', error);
            }
        };

        fetchLogData();
    }, []);

    useEffect(() => {
        if (logData.length > 0) {
            renderChart();
        }
    }, [logData]);

    const renderChart = () => {
        const ctx = document.getElementById('reititinChart');
        const filteredData = logData.filter(entry => ['forwarded', 'denied', 'blocked', 'allowed'].includes(entry.action));
        const actionCounts = {};

        filteredData.forEach(entry => {
            const action = entry.action;
            if (actionCounts[action]) {
                actionCounts[action]++;
            } else {
                actionCounts[action] = 1;
            }
        });

        const labels = Object.keys(actionCounts);
        const data = Object.values(actionCounts);

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: '# of Actions',
                    data: data,
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    return (
        <div>
            <h2>Reititin Log Data</h2>
            <div>
                <canvas id="reititinChart" width="400" height="400"></canvas>
            </div>
        </div>
    );
};

export default ReititinComponent;
