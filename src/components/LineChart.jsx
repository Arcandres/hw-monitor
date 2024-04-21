import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import { invoke } from "@tauri-apps/api/tauri";

const LineChart = () => {
    const chartRef = useRef(null);
    const [totalUsages, setTotalUsages] = useState([]);
    const [error, setError] = useState(null);
    const [cpuUsage, setcpuUsage] = useState([]);
    const chartInstance = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedTotalUsages = await invoke("get_total_usages");
                setTotalUsages(fetchedTotalUsages);
        
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Error: Failed to fetch data");
            }
        };

        fetchData();
        const intervalId = setInterval(fetchData, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (totalUsages && totalUsages.cpu) {
            setcpuUsage(prevcpuUsage => [...prevcpuUsage, totalUsages.cpu]);
        }
    }, [totalUsages]);

    useEffect(() => {
        if (chartRef.current !== null) {
            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [{
                        label: 'CPU Usage',
                        data: [],
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1,
                        fill:true,
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });
        }

        return () => {
            if (chartInstance.current !== null) {
                chartInstance.current.destroy();
            }
        };
    }, []);

    useEffect(() => {
        if (chartInstance.current !== null) {
            updateChartData();
        }
    }, [cpuUsage]);

    const updateChartData = () => {
        chartInstance.current.data.labels.push( (chartInstance.current.data.labels.length + 1) + "s");
        chartInstance.current.data.datasets[0].data = cpuUsage;
        chartInstance.current.update();
    };

    return <canvas ref={chartRef} width={500} height={300}></canvas>;
};

export default LineChart;
