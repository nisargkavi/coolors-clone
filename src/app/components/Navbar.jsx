"use client";
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import toast from 'react-hot-toast';

const Navbar = ({generateOnButton}) => {
    const pathname = usePathname();
    return (
        <div className='flex sm:flex-row flex-col justify-between items-center py-3 sm:px-20 px-10 shadow-lg'>
            <Link href='/'>
                <Image src="/logo.svg" width={100} height={30} className="h-auto" alt='coolors LOGO'/>
            </Link>
            <div className='flex justify-center items-center text-lg font-semibold'>
                <Link href='/saved-palette'>
                    <p className={`${ pathname == '/saved-palette' ? 'border-b-2':'hover:border-b-2' } border-[#0165fe] cursor-pointer`} onClick={() => toast.dismiss()}>My Palette</p>
                </Link>
                <div className='bg-[#ECECEC] mx-3 w-[1px] h-12'></div>
                { pathname.includes('/palette/') ? 
                    <button onClick={() => generateOnButton()} className={`${ pathname.includes('/palette/') ? 'border-b-2':'hover:border-b-2' } border-[#0165fe] cursor-pointer`}>Generate!</button>
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