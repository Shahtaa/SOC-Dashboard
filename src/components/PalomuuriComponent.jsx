// PalomuuriComponent.jsx
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Chart from 'chart.js/auto';

const PalomuuriComponent = () => {
    const [logData, setLogData] = useState([]);

    useEffect(() => {
        const fetchLogData = async () => {
            try {
                const response = await fetch('https://raw.githubusercontent.com/bc-web-ohjelmistokehitys/soc_data/01e6194a0f01540db2d884135f479d64d557882f/palomuuri_mock.json');
                const data = await response.json();
                setLogData(data);
                console.log(data)
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
        const actionCounts = {
            allowed: 0,
            blocked: 0,
            detected: 0
        };

        logData.forEach(entry => {
            if (entry.action === 'allowed') {
                actionCounts.allowed++;
            } else if (entry.action === 'blocked') {
                actionCounts.blocked++;
            } else if (entry.action === 'detected') {
                actionCounts.detected++;
            }
        });

        const ctx = document.getElementById('palomuuriChart');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(actionCounts),
                datasets: [{
                    label: 'Action Count',
                    data: Object.values(actionCounts),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
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
            <h2>Palomuuri Log Data</h2>
            <div>
                <canvas id="palomuuriChart"></canvas>
            </div>
            <h3>Estetyt yhteydenotot:</h3>
            <ul>
                {logData.map(entry => 
                    entry.action === 'blocked'
                        ? <li key={uuidv4()}>{entry.source_ip} porttiin {entry.destination_port} timestamp{' '}
                              {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</li>
                        : null
                )}
            </ul>
            <h3>Hyökkäysten havainnointi:</h3>
            <div>
            {logData.map(entry => 
                    entry.action === 'detected'
                        ? <li key={uuidv4()}>{entry.source_ip} porttiin {entry.destination_port} timestamp{' '}
                              {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</li>
                        : null
                )}
            </div>
        </div>
    );
};

export default PalomuuriComponent;