import React from 'react';
import logo from "../public/logo.png";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);

    const handleClick = () => {
        navigate("/profile");
    };

    return (
        <div className='fixed top-0 left-0 right-0 bg-white z-10 grid grid-flow-col p-2 shadow-lg shadow-sky-700 border border-solid'>
            <div className='flex col-span-4'>
                <img className="h-28 px-4 mx-4" src={logo} alt="logo" />
                <input className='border border-solid rounded-full mx-4 px-4 h-10 mt-8 w-80' type="text" placeholder='Search' />
                <button>🔍</button>
            </div>
            <div className='flex col-span-8 h-24 justify-self-end'>
                <button className='p-4 m-4 text-2xl font-semibold'>Home</button>
                <button className='p-4 m-4 text-2xl font-semibold'>Announcements</button>
                <img className='h-24 w-24 mx-4 mr-8 mt-4 rounded-full' src={user.avatar ?? "https://cdn-icons-png.freepik.com/512/10302/10302971.png"} alt="Profile" onClick={handleClick} />
            </div>
        </div>
    );
};

export default Header;
