"use client";
import React, { useState, useEffect, Fragment } from "react"
import Navbar from "@/app/components/Navbar"
import toast, { Toaster } from "react-hot-toast"
import { FiCopy, FiLock, FiUnlock, FiShare2 } from "react-icons/fi"
import { useGlobalContext } from "@/app/components/Context"

const Page = ({ params }) => {
  const colorslug = params.colorslug;
  const colorSlugArray = colorslug.split("-");
  const [colours, setColours] = useState(colorSlugArray);
  const [lockedIndices, setLockedIndices] = useState([]);
  const { windowSize, savedPalette, setSavedPalette } = useGlobalContext();
  const width = windowSize.width;

  const generateRandomColorString = () => {
    let s = ""
    for (let i = 0; i < 5; i++) {
      let randomColor = Math.floor(Math.random() * 16777215).toString(16)
      s += (randomColor + "-")
    }
    s = s.substring(0, s.length - 1)
    return s;
  }

  const generateOnButton = () => {
    toast.dismiss();
    if (lockedIndices.length == 5) return;
    const newColours = generateRandomColorString().split("-");
    if (lockedIndices.length > 0) {
      lockedIndices.forEach((index) => {
        newColours[index] = colours[index];
      });
    }
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
        if (lockedIndices.length == 5) return;
        const newColours = generateRandomColorString().split("-");
        if (lockedIndices.length > 0) {
          lockedIndices.forEach((index) => {
            newColours[index] = colours[index];
          });
        }
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
  }, [savedPalette, lockedIndices]);

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

    if (typeof window !== 'undefined') {
      const existingPalette = localStorage.getItem('paletteColors');
      if (existingPalette) {
        const palette = JSON.parse(existingPalette);
        if (!palette.includes(paletteColorsString)) {
          const newColorPalette = [...palette, paletteColorsString];
          localStorage.setItem("paletteColors", JSON.stringify(newColorPalette));
          setSavedPalette(newColorPalette);
          toast.success("Palette Saved!");
        } else {
          toast.error("Palette Already Exist!");
        }
      } else {
        const newColorPalette = [paletteColorsString];
        localStorage.setItem("paletteColors", JSON.stringify(newColorPalette));
        setSavedPalette(newColorPalette);
        toast.success("Palette Saved!");
      }
    }
  };


  const lockColorPalette = (index) => {
    const newLockedIndices = [...lockedIndices, index];
    setLockedIndices(newLockedIndices);
    const colorLockedColorName = colours[index];
    toast.success(`Locked #${colorLockedColorName}`);
  }

  const unLockColorPalette = (index) => {
    const updatedLockedIndices = [...lockedIndices];
    const indexOf = updatedLockedIndices.indexOf(index)
    updatedLockedIndices.splice(indexOf, 1);
    setLockedIndices(updatedLockedIndices);
    const colorUnlocked = colours[index];
    toast.success(`Unlocked #${colorUnlocked}`);
  }

  const isTooDark = (hexcolor) => {
    const rgb = parseInt(hexcolor, 16)
    var r = (rgb >> 16) & 0xff;
    var g = (rgb >> 8) & 0xff;
    var b = (rgb >> 0) & 0xff;
    // var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
    const luma = (r + g + b) / 3;
    return (luma < 128) ? 'text-white' : 'text-black';
  }


  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar generateOnButton={generateOnButton} />
      <div className="h-[calc(100vh-72px)] w-full">
        <div className={`grid md:grid-flow-col h-full`}>
          {
            colours.map((colorHex, index) => (
              <Fragment key={index}>
                <div className="relative group">
                  <div className="h-full w-full transition ease-in-out delay-150" style={{ backgroundColor: `#${colorHex}` }}></div>
                  <div className="bottom-40 absolute opacity-0 group-hover:opacity-100 transition-opacity w-full">
                    <div className="flex flex-col items-center gap-6">
                      <FiCopy
                        className={`${isTooDark(colorHex)} hover:scale-110 active:scale-90 transition ease-in-out delay-50 cursor-pointer text-2xl`}
                        onClick={() => {
                          navigator.clipboard
                            .writeText(`#${colorHex}`)
                            .then(toast.success(`#${colorHex} Copied!`));
                        }}
                      />
                      <FiShare2 className={`${isTooDark(colorHex)} hover:scale-110 cursor-pointer text-2xl`} onClick={() => shareLink()} />
                      {lockedIndices.includes(index) ? (
                        <FiLock className="text-[#00F] hover:scale-110 cursor-pointer text-2xl" onClick={() => unLockColorPalette(index)} />
                      ) : (
                        <FiUnlock className={`${isTooDark(colorHex)} hover:scale-110 cursor-pointer text-2xl`} onClick={() => lockColorPalette(index)} />
                      )}
                    </div>
                  </div>
                  <div className="absolute bottom-20 right-0 left-0">
                    <p className={`text-center text-2xl uppercase font-medium ${isTooDark(colorHex)}`}>#{colorHex}</p>
                  </div>
                </div>
              </Fragment>
            ))
          }
        </div>
      </div>
    </>
  );
};

export default Page;
