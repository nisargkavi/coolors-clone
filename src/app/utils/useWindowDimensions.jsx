import { useState, useEffect } from 'react';

// function getWindowDimensions() {

//     if (typeof window !== "undefined") {
//         const { innerWidth: width, innerHeight: height } = window;
//         return {
//             width,
//             height
//         };
//     }
//     return {
//         width: window.innerWidth,
//         height: window.innerHeight
//     };

// }

// export default function useWindowDimensions() {
//     const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

//     useEffect(() => {
//         function handleResize() {
//             setWindowDimensions(getWindowDimensions());
//         }

//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     return windowDimensions;
// }

export default function useWindowDimensions() {
    const [windowSize, setWindowSize] = useState({
      width: 1920,
      height: 1920,
    });
    useEffect(() => {
        function handleResize() {
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        }
        window.addEventListener("resize", handleResize);
        handleResize();
    
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
}
