"use client";
import React, { useEffect, useState } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { useRouter } from "next/navigation"

const colorFacts = [
  "The human eye can perceive millions of different colors.",
  "Red is the first color that a baby sees after being born.",
  "The color blue is often associated with calm and tranquility.",
  "Colors can have a profound impact on human emotions and behavior.",
  "The color black is the absence of color, while white is the combination of all colors.",
  "Colors can be used to enhance memory and learning.",
  "The perception of color is influenced by culture and personal experiences.",
  "Some animals can see a wider range of colors than humans.",
  "Color blindness is more common in men than in women.",
  "The study of color is known as chromatics."
];

const Generate = () => {
  const router = useRouter();
  const [randomFunFact, setRandomFunFact] = useState("..........");
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
    document.title = 'Generating...';
    setRandomFunFact(colorFacts[Math.floor(Math.random() * colorFacts.length)]);
    generateRandomColorString();
    return () => {
      document.title = 'Generating...';
    };
  }, [])


  return (
    <>
    <div className='h-screen w-screen p-5'>
      <div className='flex justify-center items-center flex-col h-full'>
        <div className='relative flex justify-center items-center'>
          <AiFillHeart className='h-16 w-16 text-red-600 absolute animate-ping'/>
          <AiFillHeart className='h-20 w-20 text-red-600'/>
        </div>
        <p className='text-center font-bold mt-10 text-xl'>Generating Colors.....</p>
        <p className='text-center font-semibold text-lg'>Fun Fact : {randomFunFact}</p>
      </div>
    </div>
    </>
  )
}

export default Generate