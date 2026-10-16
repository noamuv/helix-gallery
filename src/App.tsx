import './App.css';
import Scene from './helix/Scene';
import Navbar from './Navbar.tsx';
import Hero from './Pages/Hero';
import PreLoader from './Pages/PreLoader';
import { useScroll } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(true)

  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: isLoading ? undefined : wrapperRef,
    offset: ["start start", "end end"]
  })

  return (
    <>
      {isLoading ? <PreLoader onComplete={() => setIsLoading(false)}/> 
      : 
      <>
        <div ref={wrapperRef} style={{ height: "400vh", width: "100%" }}>
          <div style={{ position: "sticky", top: 0, height: "100vh" }}>
            <Scene scrollYProgress={scrollYProgress}/>
          </div>
        </div>
      </>
      }
    </>
  )
}

export default App
