//All equations live here

export interface HelixConfig {
    radius: number;
    pitch: number;
}

export interface Vec3 {
    x: number;
    y: number;
    z: number;
}

//Helix Position Formula
export function helixPosition(t: number, config: HelixConfig): Vec3 {
    const { radius, pitch } = config;
    const x = radius * Math.cos(t);
    const z = radius * Math.sin(t);
    const y = -(pitch * (t / (2 * Math.PI)));
    return {x, y, z};
}



