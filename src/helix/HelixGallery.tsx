import { useTexture } from '@react-three/drei';
import TiltPlane  from './TiltPlane.tsx';
import { helixPosition, type HelixConfig } from './helixMath.ts';
import { degToRad } from 'three/src/math/MathUtils.js';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';
import img5 from '../assets/img5.jpg';

const images = [
    { id: 1, src: img1 },
    { id: 2, src: img2 },
    { id: 3, src: img3 },
    { id: 4, src: img4 },
    { id: 5, src: img5 },
    { id: 6, src: img1 },
    { id: 7, src: img2 }
];

interface HelixGalleryProps {
    config: HelixConfig;
    angleStepDeg: number;
    planeWidth: number;
    planeHeight: number;
}

export default function HelixGallery({config, angleStepDeg, planeWidth, planeHeight}: HelixGalleryProps) {
    // const imageRef = useRef(null);
    const textures = useTexture(images.map(image => image.src));

    const angleStep = degToRad(angleStepDeg); //Convert degrees to radians
    const tValues = Array.from({ length: images.length }, (_, i) => i * angleStep); //Make an array with count slots

    // const imageHelixDebug = tValues.map((t) => {
    //     const v = helixPosition(t, config);
    //     return new Vector3(v.x, v.y, v.z);
    // });

    const imageHelix = tValues.map((t, i) => {
        const v = helixPosition(t, config);
        const angle = Math.atan2(v.x, v.z);
        return (<TiltPlane 
            key={i}
            position={[v.x, v.y, v.z]}
            rotationY={angle}
            texture={textures[i]}
            planeWidth={planeWidth}
            planeHeight={planeHeight}
        />);
    });

    return (
            <>
                {imageHelix}
                {/* <mesh>
                    <Line points={imageHelixDebug} color="red" lineWidth={1} />
                </mesh> */}
            </>
    )
}


    // const imageHelix = tValues.map((t, i) => {
    //     const v = helixPosition(t, config);
    //     const angle = Math.atan2(v.x, v.z);
    //     return (<mesh position={[v.x, v.y, v.z]} rotation={[0, angle, 0]} key={i} ref={imageRef}>
    //                     <planeGeometry args={[planeWidth, planeHeight]}/>
    //                     <meshStandardMaterial side={DoubleSide} map={textures[i]}/>
    //             </mesh>);
    // });