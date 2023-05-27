"use client";
import dynamic from "next/dynamic";
import { useGlobalContext } from "@/app/components/Context";
import { AiFillDelete,AiOutlineShareAlt } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

const PaletteCard = () => {
    const { savedPalette, setSavedPalette } = useGlobalContext();
    const removeSavedColorPalette = (index) => {
        const savedColors = [...savedPalette];
        savedColors.splice(index, 1);
        setSavedPalette(savedColors);
        localStorage.setItem('paletteColors', JSON.stringify(savedColors));
        toast.success("Palette Deleted!");
    }
    const shareLink = (palette) => {
        if (navigator.share) {
          const message = "Check out this awesome color palette!";
          navigator.share({
            title: message,
            url: window.location.origin + "/palette/" + palette,
          }).then(() => toast.success("Share this awesome color palette!")).catch((error) => toast.error("Something went wrong!"));
        }
    };
    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            {savedPalette.length === 0 && <p className="text-center mt-20 text-xl">No Saved Palette Found!</p> } 
            <div className="grid grid-cols-12 gap-5 p-10">
                {savedPalette.map((palette, index) => {
                    const colors = palette.split("-");
                    return (
                        <div className="col-span-12 xs:col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-3 2xl:col-span-2" key={index}>
                            <div className="max-w-sm rounded overflow-hidden shadow-lg">
                                <Link href={`/palette/${palette}`}>
                                    <div className="flex">
                                        {colors.map((color, colorIndex) => (
                                            <div
                                                key={colorIndex}
                                                className="h-[200px] w-20"
                                                style={{ backgroundColor: `#${color}` }}
                                            ></div>
                                        ))}
                                    </div>
                                </Link>
                                <div className="px-6 py-4">
                                    <div className="flex justify-between items-center">
                                        <p className="font-bold text-xl">Palette {index + 1}</p>
                                        <div className="flex gap-2">
                                            <AiFillDelete title="Delete" className="text-xl cursor-pointer text-red-600 hover:scale-110 transition duration-150" onClick={() => removeSavedColorPalette(index)} />
                                            <AiOutlineShareAlt title="Share" className="text-xl cursor-pointer hover:scale-110 transition duration-150" onClick={() => shareLink(palette)}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default dynamic(() => Promise.resolve(PaletteCard), { ssr: false });
