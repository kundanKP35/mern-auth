import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import FormContainer from '../components/form_container';
import { useLoginMutation } from "../slice/usersApiSlice";
import { setCredentials } from "../slice/loginSlice";
import { toast } from 'react-toastify';


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loginApiCall, {isLoading, error}]  = useLoginMutation();

    const {userInfo} = useSelector((state) => state.login);

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    },[userInfo, navigate]);

    const submitHandler = async(e) => {
        e.preventDefault();
        try {
            const response = await loginApiCall({email, password}).unwrap(); // Making request to the bakend
            dispatch(setCredentials({...response}));
            toast.success('Login Successful');
            navigate('/');
        } catch (error) {
            toast.error(error?.data?.message);
        }
    };

    return (
        <FormContainer>
            <h1 className="text-2xl font-bold mb-6">Sign In</h1>

            <form onSubmit={submitHandler}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded-md px-3 py-2 mt-1"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded-md px-3 py-2 mt-1"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#ff3f6c] text-white font-semibold py-2 rounded-md hover:bg-[#f15075]"
                >
                    Sign In
                </button>
            </form>

            <div className="py-4 text-center">
                New User? <Link to="/register" className="text-blue-500 ">Register</Link>
            </div>
        </FormContainer>
    )
}

export default LoginPage;