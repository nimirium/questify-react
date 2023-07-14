import React, { useEffect, useState } from "react";
import Button from "../ui/Button";

type focusType = "stopwatch" | "timer";

export default function FocusMode() {
    const [focusMode, setFocusMode] = useState(false);
    const [stopwatchSec, setStopwatchSec] = useState(0);
    const [stopwatchOn, setStopwatchOn] = useState(false);

    const stopwatchHours = Math.floor(stopwatchSec / 3600);
    const stopwatchMinutes = Math.floor(stopwatchSec / 60) % 60;
    const stopwatchSeconds = stopwatchSec % 60;

    useEffect(() => {
        if (stopwatchOn) {
            const interval = setInterval(() => {
                setStopwatchSec(s => s + 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [stopwatchOn]);


    return (
        <div>
            {!focusMode && <Button text="Focus" color="bg-amber-600" onClick={() => setFocusMode(true)} />}

            {/* stopwatch */}
            {focusMode &&
                <div className="flex flex-col items-center">
                    <div className="rounded-lg p-2 text-6xl">
                        {stopwatchHours > 0 && <span>{stopwatchHours.toString().padStart(2, '0')}:</span>}
                        {stopwatchMinutes.toString().padStart(2, '0')}:
                        {stopwatchSeconds.toString().padStart(2, '0')}
                    </div>

                    <div>
                        {!stopwatchOn && <Button text={stopwatchSec > 0 ? "Continue" : "Start"} color="bg-amber-600" onClick={() => setStopwatchOn(true)} />}
                        {stopwatchOn && <Button text="Stop" color="bg-amber-600" onClick={() => setStopwatchOn(false)} />}
                        {!stopwatchOn && stopwatchSec > 0 && <Button text="Reset" color="bg-amber-600" onClick={() => setStopwatchSec(0)} />}
                        {!stopwatchOn && <Button text="Exit Focus" color="bg-amber-600" onClick={() => setFocusMode(false)} />}
                    </div>
                </div>
            }
            {/* end of stopwatch */}
        </div>
    );
}
