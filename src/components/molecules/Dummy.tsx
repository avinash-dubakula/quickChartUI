import React, { useState, useEffect } from 'react';

export const TimerComponent=()=> {
    const [seconds, setSeconds] = useState(0);
    const [restart, setrestart] = useState(false);
    useEffect(() => {
        const intervalId = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds + 1);
        }, 1000);

        // Cleanup function
        return () => {
            setSeconds(0);
            clearInterval(intervalId);
             // Clear the interval to prevent memory leaks
            console.log('Cleanup called: Timer stopped');
        };
    }, [restart]); // Empty dependency array means this effect runs only once (like componentDidMount)

    return (
        <div>
            Seconds: {seconds}
            <button onClick={()=>setrestart(!restart)}>Restart</button>
        </div>
    );
}
