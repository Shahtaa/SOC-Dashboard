// ServerLogComponent.jsx
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Chart from 'chart.js/auto';

const ServerLogComponent = () => {
    const [logData, setLogData] = useState([]);

    useEffect(() => {
        const fetchLogData = async () => {
            try {
                const response = await fetch('https://raw.githubusercontent.com/bc-web-ohjelmistokehitys/soc_data/01e6194a0f01540db2d884135f479d64d557882f/palvelin_mock.json');
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
            <h3>Käyttäjän kirjautuminen:</h3>
            <ul>
                {logData.map(entry =>
                    entry.event_type === 'login'
                        ? <li key={uuidv4()}>Käyttäjä {entry.username} kirjautui palvelimelle {entry.server_name} klo. {' '}
                            {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</li>
                        : null
                )}
            </ul>
            <h3>Ohjelmistopäivitykset:</h3>
            <ul>
                {logData.map(entry =>
                    entry.event_type === 'update'
                        ? <li key={uuidv4()}>Palvelimella {entry.server_name} asennettiin päivitys {entry.update_name} klo. {' '}
                            {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</li>
                        : null
                )}
            </ul>
            <h3>Virustentarkastukset:</h3>
            <ul>
                {logData.map(entry =>
                    entry.event_type === 'virus_scan'
                        ? <li key={uuidv4()}>Palvelimella {entry.server_name} suoritettiin virustentarkistus koko järjestelmälle klo. {' '}
                            {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</li>
                        : null
                )}
            </ul>
            <h3>Poikkeavat toiminnot:</h3>
            <ul>
                {logData.map(entry =>
                    entry.event_type === 'abnormal_activity'
                        ? <li key={uuidv4()}>Epätavallisen suuri määrä epäonnistuneita kirjautumisyrityksiä havaittiin palvelimella {entry.server_name} klo. {' '}
                            {new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</li>
                        : null
                )}
            </ul>
        </div>
    );
};

export default ServerLogComponent;
