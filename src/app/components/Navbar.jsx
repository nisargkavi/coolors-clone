"use client";
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import toast from 'react-hot-toast';
// import { useGlobalContext } from '@/app/components/Context';
// import LinkTo from '@/app/components/LinkTo';
// import generateHex from '@/app/utils/generateHex'

const Navbar = ({generateOnButton}) => {
    const pathname = usePathname();
    // const { randomColorPalette } = useGlobalContext();
    return (
        <div className='flex sm:flex-row flex-col justify-between items-center py-3 sm:px-20 px-10 shadow-lg'>
            <Link href='/'>
                <p className='text-[#0165fe] text-2xl cursor-pointer font-bold'>Coolors Clone</p>
            </Link>
            <div className='flex justify-center items-center text-lg font-semibold'>
                <Link href='/saved-palette'>
                    <p className={`${ pathname == '/saved-palette' ? 'border-b-2':'hover:border-b-2' } border-[#0165fe] cursor-pointer`} onClick={() => toast.dismiss()}>My Palette</p>
                </Link>
                <div className='bg-[#ECECEC] mx-3 w-[1px] h-12'></div>
                { pathname.includes('/palette/') ? 
                    <p onClick={() => generateOnButton()} className={`${ pathname.includes('/palette/') ? 'border-b-2':'hover:border-b-2' } border-[#0165fe] cursor-pointer`}>Generate!</p>
                : 
                    <Link href={'/generate'}>
                        <p className={`${ pathname.includes('/palette/') ? 'border-b-2':'hover:border-b-2' } border-[#0165fe] cursor-pointer`}>Generate!</p>
                    </Link> 
                }
                
            </div>
        </div>
    )
}

export default Navbar