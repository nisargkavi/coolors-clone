"use client";
import React, { useEffect } from 'react'
import { useRouter } from "next/navigation";

export const metadata = {
  title: 'Generating...',
  description: 'Generating...',
}

const Generate = () => {
  const router = useRouter();
  const generateRandomColorString = () => {
    let s = "";
    for (let i = 0; i < 5; i++) {
      let randomColor = Math.floor(Math.random() * 16777215).toString(16);      
      randomColor = randomColor.padStart(6, '0');
      s += (randomColor + "-");
    }
    s = s.substring(0, s.length - 1);
    router.push(`/palette/${s}`);
  }

  useEffect(() => {
    console.log('here');
    generateRandomColorString()
  }, [])


  return (
    <>
      <div>Generating Colors...</div>
    </>
  )
}

export default Generate