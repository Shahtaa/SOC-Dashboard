// TyoasemaComponent.jsx
import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

const TyoasemaComponent = () => {
    const [logData, setLogData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://raw.githubusercontent.com/bc-web-ohjelmistokehitys/soc_data/01e6194a0f01540db2d884135f479d64d557882f/tyoasema_mock.json');
                const data = await response.json();
                setLogData(data);
            } catch (error) {
                console.error('Error fetching log data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (logData.length > 0) {
            renderChart();
        }
    }, [logData]);

    const renderChart = () => {
        const usernameCount = {};
        logData.forEach(log => {
            if (log.username in usernameCount) {
                usernameCount[log.username]++;
            } else {
                usernameCount[log.username] = 1;
            }
        });

        const labels = Object.keys(usernameCount);
        const data = Object.values(usernameCount);

        const ctx = document.getElementById('tyoasemaChart');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Number of Events',
                    data: data,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
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
            <h2>Tyoasema Log Data</h2>
            <div>
                <canvas id="tyoasemaChart" width="400" height="400"></canvas>
            </div>
        </div>
    );
};

export default TyoasemaComponent;
