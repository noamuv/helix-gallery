//Camera Rig for handling camera movement and positioning
import { helixPosition, type HelixConfig } from './helixMath.ts';
import { Vector3, PointLight } from 'three';
import { Line } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';  
import { useRef } from 'react';
import { MotionValue } from 'framer-motion';

const SHOW_DEBUG_LINE = false;

interface CameraRigProps {
    scrollYProgress: MotionValue<number>;
    config: HelixConfig;
    totalT: number;
    lightIntensity: number;
    lightDistance: number;
}

export default function CameraRig({ scrollYProgress, config, totalT, lightIntensity, lightDistance }: CameraRigProps){
    const currentT = useRef(0);
    const lightRef = useRef<PointLight>(null);
    const MAX_STEP = 0.1;

    useFrame(({ camera }) => {
        const progress = scrollYProgress.get();
        const targetT = progress * totalT;
        
        const diff = targetT - currentT.current;

        //Smooth scrolling
        if (Math.abs(diff) < 0.001) {
            currentT.current = targetT;
        } else {
            const step = diff * 0.05;
            const clampedStep = Math.sign(step) * Math.min(Math.abs(step), MAX_STEP);
            currentT.current += clampedStep;
            // currentT.current += (diff) * 0.025; // Smooth interpolation
        }

        const pos = helixPosition(currentT.current, config);
        camera.position.set(pos.x, pos.y, pos.z);
        camera.lookAt(0, pos.y, 0); // Always look at the origin

        if (lightRef.current) {
            lightRef.current.position.copy(camera.position);
        }
    });

    const cameraHelix: Vector3[] = [];
    if (SHOW_DEBUG_LINE) {
        for (let t = 0; t < 4 * Math.PI; t += 0.1) {
            const v = helixPosition(t, config);
            cameraHelix.push(new Vector3(v.x, v.y, v.z));
        }
    }

    return SHOW_DEBUG_LINE ? (
        <Line points={cameraHelix} color="red" lineWidth={1} /> 
    ) : <pointLight ref={lightRef} intensity={lightIntensity} distance={lightDistance} decay={2}/>;
}