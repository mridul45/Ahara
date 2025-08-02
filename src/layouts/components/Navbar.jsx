import React from 'react'
import logo from '../../assets/logo/navlogo.png'

function Navbar({t1,t2,t3,t4,t5,t6}) {
  return (
    <>
      <div className="w-full h-fit flex justify-between p-[1rem]">
        
        <img src={logo} alt="Logo" className="w-[10%] h-[12rem] object-contain relative top-[-4.7rem]"/>

        <div className="w-[30%] h-fit">
          <ul className="list-none w-full height-fit flex items-center justify-evenly text-shiva-black font-inter font-medium">
            {[t1, t2, t3, t4, t5, t6].map((item) => (
              <li key={item} className="relative cursor-pointer pb-1 group">
                {item}
                <span
                  className="absolute left-0 bottom-0 h-[2px] bg-shiva-black rounded transition-all duration-300 ease-in-out w-0 group-hover:w-full"
                  aria-hidden="true"
                ></span>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </>
  )
}

export default Navbar