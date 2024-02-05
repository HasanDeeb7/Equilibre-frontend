import React from 'react'
import EditeUserProfile from '../../components/UeserProfile/UserProfile'
import { Helmet } from 'react-helmet-async';
const UserProfile = () => {
    return (
        <>
            <Helmet>
                <title>Equilibre - edit user profile</title>
                <meta name="decription" content="" />
            </Helmet>
            <EditeUserProfile />
        </>
    )
}

export default UserProfile