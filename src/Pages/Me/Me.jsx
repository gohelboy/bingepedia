import React, { useState } from "react";
import AuthForm from "../Auth/AuthForm";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, logout, loggedin } from "../../redux/features/authSlice";
import testimg from "../../avatar.jpg";
import "./me.css";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LogoutIcon from "@mui/icons-material/Logout";
import Saved from "../Saved/Saved";
import { removeAllUsersList, BASE_URL } from "../../redux/features/saveSlice";
import { getLocalData } from "../../helper/quickeFunctions";
import { useSeo } from "../../hooks/useSeo";

const Me = ({ openUserMenu, setOpenUserMenu }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user?.username || "");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useSeo({
    title: user ? "Your Profile & Saved List" : "Login / Sign up",
    description: user
      ? "Manage your Bingepedia profile, edit your details, and browse your saved watchlist and watched items."
      : "Log in or create a Bingepedia account to sync your watchlist and watched movies and series.",
  });

  if (!user) {
    return <AuthForm />;
  }

  const openEditProfile = () => {
    setIsEditing(true);
    setUsername(user.username || "");
    setSelectedFile(null);
    setError("");
    setSuccess("");
  };

  const openSaved = () => setOpenUserMenu("saved");

  const logoutUser = () => {
    dispatch(removeAllUsersList());
    dispatch(logout());
  };

  if (openUserMenu === "saved") return <Saved />;

  const profileImageSrc = user?.profile_picture
    ? `${BASE_URL}/public/profile-picture/${user.profile_picture}`
    : testimg;

  const handleFileChange = (e) => {
    if (!e.target.files || !e.target.files[0]) return;
    setSelectedFile(e.target.files[0]);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (isSaving) return;
    setIsSaving(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      if (username && username !== user.username) {
        formData.append("username", username);
      }
      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      if (!formData.has("username") && !formData.has("image")) {
        setError("Nothing to update.");
        setIsSaving(false);
        return;
      }

      const token = getLocalData("token");
      const res = await fetch(`${BASE_URL}/user/upload-profile-picture`, {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: formData,
      });
      const resData = await res.json();

      if (resData.status === 0) {
        setError(resData.message || "Failed to update profile.");
      } else if (resData.status === 1 && resData.data) {
        dispatch(loggedin(resData.data));
        setSuccess(resData.message || "Profile updated.");
        setIsEditing(false);
      } else {
        setError("Something went wrong while updating profile.");
      }
    } catch (err) {
      setError("Network error while updating profile.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="me">
      <div className="image-name">
        <div className="image">
          <img src={profileImageSrc} alt="profile_picture" />
        </div>
        <div className="username">{user.username || "user"}</div>
      </div>
      {isEditing && (
        <form className="edit-profile-form" onSubmit={handleSaveProfile}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="edit-input"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="edit-input"
          />
          {error && <div className="edit-error">{error}</div>}
          {success && <div className="edit-success">{success}</div>}
          <div className="edit-actions">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              disabled={isSaving}
            >
              Cancel
            </button>
            <button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      )}
      <div className="listview">
        <div className="item" onClick={openEditProfile}>
          <div className="item-name">
            <AccountBoxIcon />
            Edit Profile
          </div>{" "}
          <ArrowCircleRightIcon />
        </div>
        <div className="item" onClick={openSaved}>
          <div className="item-name">
            <FavoriteIcon />
            saved
          </div>{" "}
          <ArrowCircleRightIcon />
        </div>
        <div className="item" onClick={logoutUser}>
          <div className="item-name">
            <LogoutIcon />
            logout
          </div>{" "}
          <ArrowCircleRightIcon />
        </div>
      </div>
    </div>
  );
};

export default Me;

