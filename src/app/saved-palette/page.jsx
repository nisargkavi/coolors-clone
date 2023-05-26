import Navbar from "@/app/components/Navbar";
import PaletteCard from "@/app/components/PaletteCard";

export const metadata = {
    title: 'Saved Palette',
    description: 'Practice Coolors Project withg Next.js!',
}

const savedPalettePage = () => {
    return (
        <>
            <Navbar />
            <PaletteCard />
        </>
    );
}

export default savedPalettePage;