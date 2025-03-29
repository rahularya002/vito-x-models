export const Navbar = () => {
    return (
        <div className="w-full h-20 py-8 px-20 flex item-center justify-between">
            <div>
                <h1>Logo</h1>
            </div>

            <div>
                <ul className="flex gap-4 uppercase font-semibold cursor-pointer">
                    <li>Our Models</li>
                    <li>talents</li>
                    <li>about me</li>
                    <li>news & articles</li>
                </ul>
            </div>
            <div>
                <button className="bg-red-800 rounded-full py-2 px-10 text-white font-semibold">Contact Us</button>
            </div>
        </div>
    )
} 