import { useEffect, useState } from "react";
import { Text, Card } from "@mantine/core";

/**
 * Renders a countdown timer based on an initial time, format MM:SS.
 * @param {number} initialTime - The initial time in seconds.
 * @param {function} onTimeUp - Callback function to be called when time is up.
 */
function Timer({ initialTime, onTimeUp }) {
    const [time, setTime] = useState(() => {
        const savedEndTime = localStorage.getItem("endTimestamp");
        const now = Date.now();
        if (savedEndTime) {
            return Math.max(0, Math.ceil((parseInt(savedEndTime, 10) - now) / 1000));
        } else {
            const endTimestamp = now + initialTime * 1000;
            localStorage.setItem("endTimestamp", endTimestamp);
            return initialTime;
        }
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            const savedEndTime = parseInt(localStorage.getItem("endTimestamp"), 10);
            const remainingTime = Math.max(0, Math.ceil((savedEndTime - now) / 1000));

            if (remainingTime <= 0) {
                clearInterval(interval);
                localStorage.removeItem("endTimestamp");
                if (onTimeUp) onTimeUp();
            } else {
                setTime(remainingTime);
            }
        }, 1000);

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