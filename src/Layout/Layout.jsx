import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import logo from '../assets/Image/logo.png'

const Layout = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (token) {
            navigate("/google-form");
        } else {
            navigate("/login");
        }
    }, [token, navigate]);

    return (
        <>
            <div className="flex">

                {/* Sidebar */}
                <div className={`
                    fixed top-0 left-0 h-screen z-50 transition-all duration-300
                    ${open ? "w-[70%]" : "w-0"} md:w-[240px] overflow-hidden
                `}>
                    <Sidebar closeSidebar={() => setOpen(false)} />
                </div>

                {/* Overlay */}
                {open && (
                    <div
                        className="fixed inset-0 bg-black/40 z-40 md:hidden"
                        onClick={() => setOpen(false)}
                    />
                )}

                {/* Main */}
                <div className="w-full md:ml-[240px] bg-gray-100 min-h-screen">

                    {/* Mobile Header */}
                    <div className="md:hidden flex justify-between items-center p-3 bg-white shadow sticky top-0 z-30">
                        <button onClick={() => setOpen(true)} className="text-2xl">☰</button>
                        <img src={logo} className="h-[40px]" />
                    </div>

                    <main>
                        <Outlet />
                    </main>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Layout;