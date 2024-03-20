import React, { useState, useEffect } from 'react';

const PalomuuriComponent = () => {
    const [logData, setLogData] = useState([]);

    useEffect(() => {
        const fetchLogData = async () => {
            try {
                const response = await fetch('https://raw.githubusercontent.com/bc-web-ohjelmistokehitys/soc_data/01e6194a0f01540db2d884135f479d64d557882f/palomuuri_mock.json');
                const data = await response.json();
                setLogData(data);
            } catch (error) {
                console.error('Error fetching log data:', error);
            }
        };

        fetchLogData();
    }, []);

    const renderTree = (logs) => (
        <ul>
            {logs.map((log, index) => (
                <li key={index}>
                    <p>Timestamp: {log.timestamp}</p>
                    <p>Source IP: {log.source_ip}</p>
                    <p>Destination IP: {log.destination_ip}</p>
                    <p>Destination Port: {log.destination_port}</p>
                    <p>Protocol: {log.protocol}</p>
                    <p>Action: {log.action}</p>
                    {log.description && <p>Description: {log.description}</p>}
                    {log.children && renderTree(log.children)}
                </li>
            ))}
        </ul>
    );

    return (
        <div>
            <h2>Palomuuri Log Data</h2>
            {renderTree(logData)}
        </div>
    );
};

export default PalomuuriComponent;
