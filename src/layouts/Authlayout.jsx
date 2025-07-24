import React from 'react'
import logo from '../assets/logo/navlogo.png'


function Authlayout({children}) {
    return (
        <>
            <div className="w-[100vw] h-[100vh] flex flex-row justify-center items-center">
                <div className="w-[50%] h-[100%] bg-shiva-blue flex items-center justify-center">
                    <img src={logo} alt="Logo" className="w-1/2 h-auto filter brightness-0 invert" />
                </div>
                <div className="w-[50%] h-[100%] bg-shiva-white flex items-center justify-center">
                    {children}
                </div>
            </div>
        </>
    )
}

export default Authlayout