import { useEffect, useState } from 'react';
import './PreLoader.css';

interface PreLoaderProps {
    onComplete: () => void;
}

export default function PreLoader({onComplete} : PreLoaderProps) {
    const [progress, setProgress] = useState(0);
    const [isExiting, setIsExiting] = useState(false);

    //Fake progress
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                const next = prev + Math.random() * 8 + 2;
                if (next >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return next;
            });
        }, 150);

        return () => clearInterval(interval);

    }, []);

    //Once progress hits 100
    useEffect(() => {
        if (progress >= 100) {
            const pause = setTimeout(() => {
                setIsExiting(true);
                setTimeout(onComplete, 600);
            }, 300);

            return () => clearTimeout(pause);

        }
    }, [progress, onComplete])

    return (
        <div className={`preloader ${isExiting ? 'preloader--exiting':''}`}>
            <div className='preloader-bar'>
                <div 
                    className='preloader-bar-fill'
                    style={{ width: `${progress}%`}}
                />
            </div>
        </div>
    )
}
