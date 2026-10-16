//Canvas wrapper
//Add HelixGallery and Camera Rig to scene

import './Scene.css';
import HelixGallery from './HelixGallery.tsx';
import CameraRig from './CameraRig.tsx';
import { Canvas } from "@react-three/fiber";
// import { PerspectiveCamera } from "three";
import { MotionValue } from 'framer-motion';
import { useResponsiveHelix } from './useResponsiveHelix.ts';


// function CameraHelper() {
//     const camera = new PerspectiveCamera(70, 1.77, 1, 10);
//     return (
//         <group position={[0, 0, 8]}>
//             <cameraHelper args={[camera]}/>
//         </group>
//     )
// }

interface SceneProps {
    scrollYProgress: MotionValue<number>;
}

export default function Scene({scrollYProgress}: SceneProps) {
    const { imageConfig, cameraConfig, fov, planeWidth, planeHeight, lightIntensity, lightDistance } = useResponsiveHelix();

    return (
        <div className="canvas-container" id="work">
            <Canvas camera={{ position: [0, 0, 8], fov, near: 1, far: 1000}} orthographic={false}>
                {/* <axesHelper args={[10]} />
                <gridHelper args={[25, 25]} />
                <OrbitControls />
                <CameraHelper /> */}

                <HelixGallery 
                    config = {imageConfig}
                    angleStepDeg = {75}
                    planeWidth={planeWidth}
                    planeHeight={planeHeight}
                />
                <CameraRig
                    scrollYProgress={scrollYProgress}
                    config={cameraConfig}
                    totalT={3 * Math.PI}
                    lightIntensity={lightIntensity}
                    lightDistance={lightDistance}
                />

                <ambientLight intensity={0.2}/>
            </Canvas>
        </div>
    )
}



