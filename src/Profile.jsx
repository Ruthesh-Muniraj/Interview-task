import React, { useEffect, useContext, useState } from 'react'
import { UserContext } from "./ProfileContext";


export default function Profile() {
    const { userContxt, setUserContxt } = useContext(UserContext);
    const [profile, setProfile] = useState([]);
    const [job, setJob] = useState("");

    const [updateFName, setUpdateFName] = useState("");
    const [updateLName, setUpdateLName] = useState("");
    const [updateEmail, setUpdateEmail] = useState("");
    const [updateJob, setUpdateJob] = useState("");

    useEffect(() => {
        fetch(`https://reqres.in/api/users/${userContxt.userID}`, { method: "GET" })
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                setProfile(json.data)
            });
    }, [])
    function handleJobUpdate() {
        fetch(`https://reqres.in/api/users/${userContxt.userID}`,
            {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "job": job,
                })
            })
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
            });
    }
    function handleProfileUpdate() {
        fetch(`https://reqres.in/api/users/${userContxt.userID}`,
            {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "first_name": updateFName,
                    "last_name": updateLName,
                    "email": updateEmail,
                    "job": updateJob,
                })
            })
            .then((res) => res.json())
            .then((json) => {
                setProfile(json);
            });
    }
    return (
        <div>
            <img src={profile.avatar} alt="avatar" />
            <h2>
                {profile.first_name} {profile.last_name}
            </h2>
            <p>{profile.email}</p>
            <input type="text" placeholder='Enter Job' onChange={(event) => setJob(event.target.value)} />
            <button onClick={() => handleJobUpdate()}>Update Job</button>

            <h2>Edit Profile</h2>
            <input type="text" placeholder='first name' value={updateFName} onChange={(event) => setUpdateFName(event.target.value)} />
            <input type="text" placeholder='last name' value={updateLName} onChange={(event) => setUpdateLName(event.target.value)} />
            <input type="email" placeholder='eamil' value={updateEmail} onChange={(event) => setUpdateEmail(event.target.value)} />
            <input type="text" placeholder='Job' value={updateJob} onChange={(event) => setUpdateJob(event.target.value)} />
            <button onClick={() => handleProfileUpdate()}>Update Profile</button>
        </div>
    )
}
