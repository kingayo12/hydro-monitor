import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import animationData from '../assets/data/FU02dnOuij.json'; // Replace with your animation file

const Lottieanimation = () => {
  const animationContainer = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainer.current,
      animationData: animationData,
      renderer: 'svg', // Set the renderer type (svg, canvas, html)
      loop: true, // Set loop to true
      autoplay: true, // Set autoplay to true
    });

    return () => anim.destroy(); // Clean up on unmount
  }, []);

  return <div ref={animationContainer}></div>;
};

export default Lottieanimation;
