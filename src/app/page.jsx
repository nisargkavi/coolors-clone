import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: 'Coolors.co Next.js',
  description: 'Practice Coolors Project withg Next.js!',
}

export default function Home() {
  // const randomColorString = generateHex();
  // const { randomColorPalette } = useGlobalContext();
  return (
    <>
      <Navbar />
      <div className="md:flex">
        <div className="md:w-1/2 w-full lg:px-40 sm:px-10 px-10 flex flex-col justify-center items-center xl:mt-0 lg:mt-32 md:mt-32 sm:mt-10 mt-10">
          <p className="lg:text-5xl text-3xl font-bold text-center alfa">
            Lightning-Fast Color Palette Generator!
          </p>
          <p className="lg:text-2xl text-lg text-center my-10 text-[#464858] font-semibold">
            Craft your ideal palette or draw inspiration from a myriad of exquisite color schemes.
          </p>
          <div>
            <Link href={`/generate`}>
              <p className="bg-[#0165fe] transition duration-150 hover:scale-105 .hover:shadow-lg text-white text-center font-semibold px-20 py-3 text-xl rounded-xl cursor-pointer">
                Generate!
              </p>
            </Link>
          </div>
        </div>
        <div className="w-1/2 xl:p-32 p-24 sm:px-10 xl:mt-0 mt-32 justify-center md:flex hidden">
          <Image className="m-0" src="/coolors-logo.png" width={400} height={400} alt="coolors logo" priority />
        </div>
      </div>
      <Footer />
    </>
  );
}
