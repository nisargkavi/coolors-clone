"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import { FiCopy, FiLock, FiShare2 } from "react-icons/fi";
import styles from "@/app/palette/[colorslug]/palette.module.css";
import { useGlobalContext } from "@/app/components/Context";

const generateRandomColorString = () => {
  let s = ""
  for (let i = 0; i < 5; i++) {
    let randomColor = Math.floor(Math.random() * 16777215).toString(16)
    s += (randomColor + "-")
  }
  s = s.substring(0, s.length - 1)
  return s;
}

const Page = ({ params }) => {
  const router = useRouter();
  const colorslug = params.colorslug;
  const colorSlugArray = colorslug.split("-");
  const [colours, setColours] = useState(colorSlugArray);
  // const [savedPalette, setSavedPalette] = React.useState(localStorage.getItem('paletteColors') ? JSON.parse(localStorage.getItem('paletteColors')) : []);
  const [savedPalette, setSavedPalette] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('paletteColors')
        ? JSON.parse(localStorage.getItem('paletteColors'))
        : [];
    }
    return [];
  });
  const { windowSize } = useGlobalContext();
  const width = windowSize.width;

  const generateOnButton = () => {
    toast.dismiss();
    const newColours = generateRandomColorString().split("-");
    setColours(newColours);
    history.pushState({}, null, window.location.href.split("/")[0] + "/palette/" + newColours.join("-"));
  };

  useEffect(() => {
    const generateOnSpace = function (ev) {
      const code = ev.keyCode;
      if (code === 32) {
        ev.preventDefault();
        toast.dismiss();
        // router.push(`/palette/${generateRandomColorString()}`);
        const newColours = generateRandomColorString().split("-");
        setColours(newColours);
        history.pushState({}, null, window.location.href.split("/")[0] + "/palette/" + newColours.join("-"));
      }
    };

    document.addEventListener("keydown", generateOnSpace);
    document.title = "Coolors Palette";
    setSavedPalette(savedPalette);
    return () => {
      document.removeEventListener("keydown", generateOnSpace);
    };
  }, [savedPalette]);

  const shareLink = () => {
    if (navigator.share) {
      const message = "Check out this awesome color palette!";
      navigator.share({
        title: message,
        url: window.location.href,
      }).then(() => toast.success("Share this awesome color palette!")).catch((error) => toast.error("Something went wrong!"));
    }
  };

  const saveColorPalette = () => {
    const paletteColorsString = colours.join("-");
    let palette = [];
    
    if (typeof window !== 'undefined') {
      const existingPalette = localStorage.getItem('paletteColors');
      if (existingPalette) {
        palette = JSON.parse(existingPalette);
      }
      if (!palette.includes(paletteColorsString)) {
        const newColorPalette = [...palette, paletteColorsString];
        localStorage.setItem("paletteColors", JSON.stringify(newColorPalette));
        toast.success("Palette Saved!"); 
      } else {
        toast.error("Palette Already Exist!");
      }
    }
  }

  const removeSavedColorPalette = (index) => {
    const savedColors = [...savedPalette];
    savedColors.splice(index, 1);
    setSavedPalette(savedColors);
    localStorage.setItem('paletteColors', JSON.stringify(savedColors));
  }



  return (
    <>
      <Toaster position="bottom-left" reverseOrder={false} />
      <Navbar generateOnButton={generateOnButton} />
      <div className={styles.appContainerWrapper}>
        <div className={`${styles.coloursGrid} grid ${width > 800 ? `grid-flow-col grid-cols-${colours.length}` : `grid-flow-row grid-row-${colours.length}`} gap-4 mb-5`}>
          {colours &&
            colours.map((colorHex, i) => (
              <div className={`${styles.colour}`} key={i}>
                <div className="transition ease-in-out delay-150" style={{ backgroundColor: `#${colorHex}` }} />
                <p className="text-center text-[#464858] cursor-pointer font-semibold">{`#${colorHex}`}</p>
                <div className="flex justify-around">
                  <FiCopy
                    className="text-[#464858] hover:scale-110 active:scale-90 transition ease-in-out delay-50 cursor-pointer text-2xl"
                    onClick={() => {
                      navigator.clipboard
                        .writeText(`#${colorHex}`)
                        .then(toast.success(`#${colorHex} Copied!`));
                    }}
                  />
                  <FiShare2 className="text-[#464858] hover:scale-110 cursor-pointer text-2xl" onClick={() => shareLink()} />
                  <FiLock className="text-[#464858] hover:scale-110 cursor-pointer text-2xl" />
                </div>
              </div>
            ))}
        </div>

        {width > 800 &&
          // <p className="text-lg text-center my-10 text-[#464858] font-semibold">
          //   Press "Space" to generate new colours
          // </p>
          <div className="flex justify-center items-center">
            <button onClick={() => saveColorPalette()} className="bg-blue-500 hover:bg-blue-700 my-2 p-4 h-[55px] text-white font-bold rounded-xl">
              Save this palette!
            </button>
          </div>
        }
        {width < 800 &&
          <div className="flex justify-center h-[70px]">
            <button onClick={() => generateOnButton()} className="bg-blue-500 hover:bg-blue-700 my-2 p-4 text-white font-bold rounded-xl">
              Generate!
            </button>
          </div>
        }
      </div>
    </>
  );
};

export default Page;
