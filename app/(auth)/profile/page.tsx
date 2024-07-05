"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Banner from '@/components/banner';

const ProfilePage = () => {
    // const [user, setUser] = useState(null);

    // useEffect(() => {
    //     // Replace '/api/user' with the actual endpoint URL
    //     axios.get('/api/user/profile')
    //         .then(response => {
    //             setUser(response.data);
    //         })
    //         .catch(error => {
    //             console.error("There was an error fetching the user data!", error);
    //         });
    // }, []);

    // if (!user) {
    //     return <div className="flex justify-center items-center h-screen">Loading...</div>;
    // }

    return (

        <div className="flex flex-col items-center mt-10">
            {/* <img
                src={user.profilePicture}
                alt="Profile"
                className="rounded-full w-36 h-36"
            />
            <div className="text-center mt-4">
                <h2 className="text-2xl font-semibold">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
            </div> */}
            <Banner />
        </div>
    );
};

export default ProfilePage;
