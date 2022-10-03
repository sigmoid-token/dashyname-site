import React from "react";
import { authService } from "fbase";

const Profile = () => {
    const onLogOutClick = () => authService.signOut();
    return (
        <>
            <button onClick={onLogOutClick}>Logout</button>
        </>
    );
};

export default Profile;