// import React from 'react'

// import smile from '../assets/Image/smile.png'
const TopHeader = () => {
    return (
        <>
            <div className="mainContainer bg-gradient-to-r from-indigo-200 to-purple-200">
                <div className="w-full h-full e">
                    <div className="w-full sticky top-0 ">
                        <nav className="w-full topbarNav bg-nav   py-3 z-20 relative">
                            <div className="container mx-auto">
                                <div className="flex w-full navcontent  justify-between items-center">
                                    <div className="px-5">
                                        <div className="">
                                            <p className="text-[#A6A6A6] text-[15px]">Hello</p>
                                            <h4 className="text-[16px] font-[600]">Welcome Back!</h4>

                                        </div>
                                    </div>
                                    {/* <div className="px-5">
                                        <div className="bg-white shadow  rounded-full" >

                                            <img src={smile} style={{ height: "50px", width: "50px" }} alt="" />
                                        </div>
                                      
                                    </div> */}

                                </div>

                            </div>
                        </nav>

                    </div>
                </div>
            </div>
        </>
    )
}

export default TopHeader
