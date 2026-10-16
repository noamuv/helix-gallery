import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, DoubleSide, Texture } from 'three';
import type { ThreeEvent } from '@react-three/fiber'




interface TiltPlaneProps {
        position: [number, number, number];
        rotationY: number;
        texture: Texture;
        planeWidth: number;
        planeHeight: number;
}

const MAX_TILT = 0.25;
const TILT_EASE = 0.1;


export default function TiltPlane( { position, rotationY, texture, planeWidth, planeHeight}: TiltPlaneProps) {
    
    //Need to know which mesh without causing re-render
    const meshRef = useRef<Mesh>(null);
    const targetTilt = useRef({ x:0, y:0 });

    function handlePointerMove(e: ThreeEvent<PointerEvent>) {
        if (!e.uv) return;
        const offsetX = e.uv.x - 0.5;
        const offsetY = e.uv.y - 0.5;
        targetTilt.current = { x: -offsetY * MAX_TILT, y: offsetX * MAX_TILT };
    }

    function handlePointerOut() {
        targetTilt.current = { x: 0, y: 0 };
    }

    useFrame(() => {
        if (!meshRef.current) return;
        meshRef.current.rotation.x += (targetTilt.current.x - meshRef.current.rotation.x) * TILT_EASE;
        meshRef.current.rotation.y += (targetTilt.current.y - meshRef.current.rotation.y) * TILT_EASE;
    });

    return (
        <group position={position} rotation={[0, rotationY, 0]}>
            <mesh
                ref={meshRef}
                onPointerMove={handlePointerMove}
                onPointerOut={handlePointerOut}
            >
                <planeGeometry args={[planeWidth, planeHeight]} />
                <meshStandardMaterial side={DoubleSide} map={texture} />
            </mesh>
        </group>
    );
}