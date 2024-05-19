import React, { useState, useEffect } from "react";
import Graph from "./Graph";
import useMemoryData from "../hooks/useMemoryData";
import { useSetMemory } from "../services/store";
import useDataConverter from "../helper/useDataConverter";

interface MemoryProps {
    hidden: boolean;
}

const Memory: React.FC<MemoryProps> = ({ hidden }) => {
    const memoryUsage = useMemoryData();
    const [activeMem, setActiveMem] = useState<number[]>([]);
    const setMemory = useSetMemory();
    const convertData = useDataConverter();

    const [memoryData, setMemoryData] = useState<{
        total: { value: number, unit: string },
        free: { value: number, unit: string },
        available: { value: number, unit: string },
        cached: { value: number, unit: string },
        active: { value: number, unit: string },
        swapTotal: { value: number, unit: string },
        swapCache: { value: number, unit: string }
    } | null>(null);

    useEffect(() => {
        if (memoryUsage !== null) {
            setMemoryData({
                total: convertData(memoryUsage.total),
                free: convertData(memoryUsage.free),
                available: convertData(memoryUsage.available),
                cached: convertData(memoryUsage.cached),
                active: convertData(memoryUsage.active),
                swapTotal: convertData(memoryUsage.swap_total),
                swapCache: convertData(memoryUsage.swap_cache)
            });
        }
    }, [memoryUsage, convertData]);

    useEffect(() => {
        if (memoryUsage !== null && memoryUsage.active !== null) {
            setActiveMem(prevActiveMem => {
                const newActiveMem = [...prevActiveMem, convertData(memoryUsage.active).value as number];
                // Trim the array to keep only the last 20 elements
                if (newActiveMem.length > 20) {
                    return newActiveMem.slice(newActiveMem.length - 20);
                } else {
                    return newActiveMem;
                }
            });
        }
    }, [memoryUsage]);

    useEffect(() => {
        if (memoryUsage !== null) {
            setMemory(activeMem);
        }
    }, [activeMem, setMemory]);

    return (
        <div style={{ display: hidden ? 'none' : 'block', width: '100%' }}>
            {memoryData && (
                <>
                    <Graph
                        firstGraphValue={activeMem}
                        maxValue={Math.floor(memoryData.total.value)}
                    />

                    <p>Total Memory: {memoryData.total.value} {memoryData.total.unit}</p>
                    <p>Free: {memoryData.free.value} {memoryData.free.unit}</p>
                    <p>Available: {memoryData.available.value} {memoryData.available.unit}</p>
                    <p>Cached: {memoryData.cached.value} {memoryData.cached.unit}</p>
                    <p>Active: {memoryData.active.value} {memoryData.active.unit}</p>
                    <p>Swap Total: {memoryData.swapTotal.value} {memoryData.swapTotal.unit}</p>
                    <p>Swap Cache: {memoryData.swapCache.value} {memoryData.swapCache.unit}</p>
                </>
            )}
        </div>
    );
};

export default Memory;
