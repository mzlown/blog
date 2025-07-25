import Link from "next/link";


const Header = () => {
    return (
        <div className="px-[16px] bg-[#F64A8A] w-full h-[60px] flex flex-row items-center justify-between">
            <h1 className="text-[22px] text-white font-bold">Zoe Lown's Website</h1>
            <div className="flex flex-row gap-[16px] items-center justify-center">
                <Link className="text-[22px] text-white font-bold" href="/" >Blog</Link>
                <Link className="text-[22px] text-white font-bold" href="/videos" >Videos</Link>
                <Link className="text-[22px] text-white font-bold" href="/recommendations" >Recommendations</Link>
            </div>
        </div>
    )
};

export default Header;