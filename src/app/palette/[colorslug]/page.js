"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import { FiCopy, FiLock, FiShare2 } from "react-icons/fi";
import useWindowDimensions from '@/app/utils/useWindowDimensions'
import styles from "@/app/palette/[colorslug]/palette.module.css";
import generateHex from "@/app/utils/generateHex";

export const metadata = {
  title: "Coolors Palette",
  description: "Practice Coolors Project withg Next.js!",
};

const Page = ({ params }) => {
  const router = useRouter();
  const colorslug = params.colorslug;
  const colorSlugArray = colorslug.split("-");
  const [colours, setColours] = useState(colorSlugArray);
  const { width } = useWindowDimensions();

  useEffect(() => {
    const generateOnSpace = function (ev) {
      const code = ev.keyCode;
      if (code === 32) {
        ev.preventDefault();
        toast.dismiss();
        router.push(`/palette/${generateHex()}`);
        // const newColours = generateHex().split("-");
        // setColours(newColours);
      }
    };

    document.addEventListener("keydown", generateOnSpace);
    document.title = "Coolors Palette";
    return () => {
      document.removeEventListener("keydown", generateOnSpace);
    };
  }, []);

  const shareLink = () => {
    if (navigator.share) {
      const message = "Check out this awesome color palette!";
      navigator.share({
        title: message,
        url: window.location.href,
      }).then(() => toast.success("Share this awesome color palette!")).catch((error) => toast.error("Something went wrong!"));
    }
  };

  return (
    <>
      <Toaster position="bottom-left" reverseOrder={false} />
      <Navbar/>
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

        {width>800 &&
          <p className="text-lg text-center my-10 text-[#464858] font-semibold">
            Press "Space" to generate new colours
          </p>
        }
      </div>
    </>
  );
};

export default Page;
