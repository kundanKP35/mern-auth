import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import FormContainer from '../components/form_container';
import { useUpdateProfileMutation } from "../slice/usersApiSlice";
import {setCredentials} from '../slice/loginSlice';
import { toast } from 'react-toastify';

const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();

    const {userInfo} = useSelector((state) => state.login);

    const [updateProfileApi, {error}] = useUpdateProfileMutation();

    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);
    },[userInfo.name, userInfo.email]);

    const submitHandler = async(e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        } else {
            try {
                const response = await updateProfileApi({
                    _id: userInfo._id,
                    name,
                    email,
                    password,
                }).unwrap();
                dispatch(setCredentials({...response}));
                toast.success('Profile Updated Successfully');
            } catch (error) {
                toast.error(error?.data?.message);
            }
        }
    };

    return (
        <FormContainer>
            <h1 className="text-2xl font-bold mb-6">Update Profile</h1>

            <form onSubmit={submitHandler}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border rounded-md px-3 py-2 mt-1"
                    />
                </div>

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

                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full border rounded-md px-3 py-2 mt-1"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#ff3f6c] text-white font-semibold py-2 rounded-md hover:bg-[#f15075]"
                >
                    Update
                </button>
            </form>
        </FormContainer>
    )
}

export default Profile;