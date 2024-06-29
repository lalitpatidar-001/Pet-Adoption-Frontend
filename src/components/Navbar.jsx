import React from 'react'
import { Link } from 'react-router-dom'

function Navbar({ page }) {
    return (

        <>
            {/* Container */}
            <div className='flex w-[full]  z-50 h-[50px] justify-center shadow-md sticky top-0 bg-white'>
                {/* wrapper */}
                <div className='flex justify-between items-center w-[1200px] '>
                    {/* right div */}
                    <div className='flex flex-[3]  justify-between items-center gap-[10px]'>
                        <span className='flex-1 text-2xl items-center'>Pet-Adoption</span>
                        <ul className='flex flex-[3] text-xl items-center
                     gap-[10px]'>

                            <Link to='/'>
                                <li>Home</li>
                            </Link>
                            <li>About</li>
                            <li>Produts</li>
                        </ul>


                    </div>
                    {/* left div */}
                    <div className='flex flex-[1] '>
                        <ul className='flex w-[100%] justify-end gap-[10px] text-xl'>

                            <Link to="/profile/2">
                                <li>Profile</li>
                            </Link>
                            <li>Logout</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar