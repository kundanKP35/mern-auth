import React,{useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaCaretDown, FaUserCircle } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { clearCredentials } from '../slice/loginSlice';
import { useLogoutMutation } from '../slice/usersApiSlice';
import { toast } from 'react-toastify';

const Header = () => {

    const { userInfo } = useSelector((state) => state.login);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const [logoutApiCall] = useLogoutMutation();

    const handleLogout = async() => {
        try {
            await logoutApiCall().unwrap();
            dispatch(clearCredentials());
            toast.success('Logout Successful');
            navigate('/login');
        } catch (error) {
            toast.error(error?.data?.message);
        }
    };

    return (
        <header className="flex justify-between items-center px-10 py-4 bg-gray-900 text-white font-poppins">
            <div className='tracking-widest font-bold'>
                <Link to="/">
                    <h2>MERN AUTH</h2>
                    
                </Link>
            </div>
                <div>
                {userInfo ? (
                    <>
                        <div className="flex items-center">
                            <button onClick={toggleDropdown} className="ml-2 focus:outline-none flex items-center gap-2">
                                <span>{userInfo.name}</span>
                                <FaCaretDown />
                            </button>
                        </div>
                        {isDropdownOpen && (
                            <div className="absolute top-12 right-4 bg-white text-black shadow-md py-2 rounded-md">
                                <ul className="list-none p-0 m-0">
                                    <li className="cursor-pointer hover:bg-gray-200 py-1 px-4"><Link to="/profile" className='flex items-center gap-2'><FaUserCircle />Profile</Link></li>
                                    <li onClick={handleLogout} className="cursor-pointer hover:bg-gray-200 py-1 px-4 flex items-center gap-2"><FaSignOutAlt />Logout</li>
                                </ul>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <div className="flex items-center space-x-4">
                            <ul className="hidden space-x-4 md:flex">
                                <li className="mr-4">
                                    <Link to="/login" className='flex gap-2 justify-between items-center text-sm'><FaSignInAlt /> Sign In</Link>
                                </li>
                                <li className="navbarLink">
                                    <Link to="/register" className='flex gap-2 justify-between items-center text-sm'><FaSignOutAlt /> Sign Up</Link>
                                </li>
                            </ul>
                        </div>
                    </>)}
                </div>
                            </header>
    );
}

export default Header;
