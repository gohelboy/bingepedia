import React from 'react'
import AuthForm from '../Auth/AuthForm';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, logout } from '../../redux/features/authSlice';
import testimg from "../../avatar.jpg"
import "./me.css"
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import Saved from '../Saved/Saved';
import { removeAllUsersList } from '../../redux/features/saveSlice';

const Me = ({ openUserMenu, setOpenUserMenu }) => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    if (!user) {
        return <AuthForm />;
    }

    const openEditProfile = () => alert("Edit profile");

    const openSaved = () => setOpenUserMenu('saved');

    const logoutUser = () => {
        dispatch(removeAllUsersList());
        dispatch(logout());
    }

    if (openUserMenu === 'saved') return <Saved />

    return (
        <div className='me'>
            <div className='image-name'>
                <div className='image'>
                    <img src={testimg} alt='profile_picture' />
                </div>
                <div className='username'>
                    {user.username || "user"}
                </div>
            </div>
            <div className='listview'>
                <div className='item' onClick={openEditProfile}><div className='item-name'><AccountBoxIcon />Edit Profile</div> <ArrowCircleRightIcon /></div>
                <div className='item' onClick={openSaved}><div className='item-name'><FavoriteIcon />saved</div> <ArrowCircleRightIcon /></div>
                <div className='item' onClick={logoutUser}><div className='item-name'><LogoutIcon />logout</div> <ArrowCircleRightIcon /></div>
            </div>
        </div>
    )
}

export default Me