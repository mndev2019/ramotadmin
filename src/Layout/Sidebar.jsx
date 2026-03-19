import { Link, useLocation } from "react-router-dom";
import logo from '../assets/Image/logo.png';
import googleform from '../assets/Image/googleform.png';
import contact from '../assets/Image/contacts.png';

const Sidebar = ({ closeSidebar }) => {
    const location = useLocation();

    return (
        <div className="w-full h-full bg-gradient-to-b from-[#0f172a] via-[#172554] to-[#1e293b] text-gray-300">

            {/* Mobile Top */}
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-700 md:hidden">
                <h2 className="text-white font-semibold">Menu</h2>
                <button onClick={closeSidebar} className="text-white text-xl">✕</button>
            </div>

            {/* Logo */}
            <div className="flex justify-center items-center py-4 border-b border-gray-700 lg:block hidden">
                <div className="bg-white rounded-md p-2">
                    <img src={logo} className="h-[40px]" />
                </div>
            </div>

            {/* Menu */}
            <ul className="mt-5 px-3 space-y-2">

                <li>
                    <Link
                        to="/"
                        onClick={closeSidebar}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition
                        ${location.pathname === "/"
                                ? "bg-indigo-500 text-white"
                                : "hover:bg-[#334155]"
                            }`}
                    >
                        <img src={googleform} className="h-[22px]" />
                        <span>Google Work Space</span>
                    </Link>
                </li>

                <li>
                    <Link
                        to="/conatct-form"
                        onClick={closeSidebar}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition
                        ${location.pathname === "/conatct-form"
                                ? "bg-indigo-500 text-white"
                                : "hover:bg-[#334155]"
                            }`}
                    >
                        <img src={contact} className="h-[22px]" />
                        <span>Contact Enquiry</span>
                    </Link>
                </li>

            </ul>
        </div>
    );
};

export default Sidebar;