// ServerLogComponent.jsx
import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

const ServerLogComponent = () => {
    const [logData, setLogData] = useState([]);

    useEffect(() => {
        const fetchLogData = async () => {
            try {
                const response = await fetch('https://raw.githubusercontent.com/bc-web-ohjelmistokehitys/soc_data/01e6194a0f01540db2d884135f479d64d557882f/palvelin_mock.json');
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
        const eventCounts = {
            login: 0,
            update: 0,
            virus_scan: 0,
            abnormal_activity: 0
        };

        logData.forEach(entry => {
            if (entry.event_type === 'login') {
                eventCounts.login++;
            } else if (entry.event_type === 'update') {
                eventCounts.update++;
            } else if (entry.event_type === 'virus_scan') {
                eventCounts.virus_scan++;
            } else if (entry.event_type === 'abnormal_activity') {
                eventCounts.abnormal_activity++;
            }
        });

        const ctx = document.getElementById('serverLogChart');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(eventCounts),
                datasets: [{
                    label: 'Event Count',
                    data: Object.values(eventCounts),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
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
            <h2>Server Log Data</h2>
            <div>
                <canvas id="serverLogChart"></canvas>
            </div>
        </div>
    );
};

export default ServerLogComponent;
