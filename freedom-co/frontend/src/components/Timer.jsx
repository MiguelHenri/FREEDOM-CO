import { useEffect, useState } from "react";
import { Text, Card } from "@mantine/core";

/**
 * Renders a countdown timer based on an initial time, format MM:SS.
 * @param {number} initialTime - The initial time in seconds.
 * @param {function} onTimeUp - Callback function to be called when time is up.
 */
function Timer({ initialTime, onTimeUp }) {
    const [time, setTime] = useState(() => {
        const savedTime = localStorage.getItem("timer");
        return savedTime ? savedTime : initialTime;
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prevTime => {
                if (prevTime <= 0) {
                    clearInterval(interval);
                    localStorage.removeItem("timer");
                    if (onTimeUp) onTimeUp();
                    return 0;
                }
                const newTime = prevTime - 1;
                localStorage.setItem("timer", newTime);
                return newTime;
            });
        }, 1000); // For a second

        return () => clearInterval(interval);
    }, [onTimeUp]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text align="center" size="xl" weight={700}>
                {formatTime(time)}
            </Text>
        </Card>
    );
}

export default Timer;