import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Chart from 'chart.js/auto';

const PalomuuriComponent = () => {
    const [logData, setLogData] = useState([]);
    const [timeInterval, setTimeInterval] = useState('hour');
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        const fetchLogData = async () => {
            try {
                const response = await fetch('https://raw.githubusercontent.com/Shahtaa/mock_data/ff65950ddf8a169612b87c703566737c2d305f50/mock_data.json');
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
    }, [logData, timeInterval]);

    const renderChart = () => {
        if (chartInstance) {
            chartInstance.destroy(); // Destroy previous chart instance
        }

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
        const newChartInstance = new Chart(ctx, {
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

        setChartInstance(newChartInstance); // Store reference to new chart instance
    };
    const renderLogEntries = (action) => {
        let filteredEntries;
        if (timeInterval === 'all') {
            filteredEntries = logData.filter(entry => entry.action === action);
            if (filteredEntries.length > 10) {
                // Show only the last 10 entries
                filteredEntries = filteredEntries.slice(-10);
            }
        } else {
            filteredEntries = logData.filter(entry => entry.action === action && withinTimeInterval(entry.timestamp));
            // Show only the last 10 entries
            filteredEntries = filteredEntries.slice(-10);
        }

        // Sort the filtered entries by timestamp in ascending order
        filteredEntries.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

        console.log(`Filtered ${action} log entries:`, filteredEntries);
        return (
            <ul>
                {filteredEntries.map(entry => (
                    <li key={uuidv4()}>
                        {entry.source_ip} porttiin {entry.destination_port} timestamp{' '}
                        {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </li>
                ))}
            </ul>
        );
    };




    const withinTimeInterval = (timestamp) => {
        const now = new Date();
        const entryTime = new Date(timestamp);
        let oneMonthAgo;

        switch (timeInterval) {
            case 'hour':
                return entryTime >= new Date(now.getTime() - (60 * 60 * 1000)); // Check if the entry time is within the last hour
            case 'day':
                return entryTime >= new Date(now.getTime() - (24 * 60 * 60 * 1000)); // Check if the entry time is within the last day
            case 'week':
                return entryTime >= new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000)); // Check if the entry time is within the last week
            case 'month':
                oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()); // Get the date one month ago
                return entryTime >= oneMonthAgo; // Check if the entry time is within the last month
            default:
                return false;
        }
    };


    const handleTimeIntervalChange = (interval) => {
        setTimeInterval(interval);
    };

    return (
        <div>
            <h2>Palomuuri Log Data</h2>
            <div>
                <canvas id="palomuuriChart"></canvas>
            </div>
            <div>
                <button onClick={() => handleTimeIntervalChange('hour')}>Hour</button>
                <button onClick={() => handleTimeIntervalChange('day')}>Day</button>
                <button onClick={() => handleTimeIntervalChange('week')}>Week</button>
                <button onClick={() => handleTimeIntervalChange('month')}>Month</button>
                <button onClick={() => handleTimeIntervalChange('all')}>All</button>
            </div>
            <h3>Estetyt yhteydenotot:</h3>
            {renderLogEntries('blocked')}
            <h3>Hyökkäysten havainnointi:</h3>
            {renderLogEntries('detected')}
        </div>
    );
};

export default PalomuuriComponent;
