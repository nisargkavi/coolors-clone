import { FiGithub } from 'react-icons/fi';
import { CgWebsite } from 'react-icons/cg';

const Footer = () => {
    let copyright = String.fromCodePoint(0x000a9);
    return (
        <div className='absolute bottom-0 w-full'>
            <div className='flex justify-between items-center sm:px-20 px-8 bg-[#00a0fb] py-5'>
                <p className='text-white lg:text-sm text-xs'>{copyright} {new Date().getFullYear()} Coolors Clone By <span className='font-bold cursor-pointer'>Nisarg Kavi</span></p>
                <div className='flex justify-center gap-5 items-center text-lg font-semibold'>
                    <a href="https://github.com/nisargkavi" target={"_blank"} rel="noreferrer" className='hover:scale-110 transition-transform delay-50'>
                        <FiGithub className='text-white' />
                    </a>
                    <a href="https://nisargkavi.in" target={"_blank"} rel="noreferrer" className="hover:scale-110 transition-transform delay-50">
                        <CgWebsite className='text-white' />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Footer