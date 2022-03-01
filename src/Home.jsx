import { useState, useEffect, useContext } from "react";
import { UserContext } from "./ProfileContext";
import { useNavigate } from "react-router-dom";


export default function Home() {
    const { userContxt, setUserContxt } = useContext(UserContext);
    const history = useNavigate();
    const [user, setUser] = useState([]);
    useEffect(() => {
        fetch("https://reqres.in/api/users", { method: "GET" })
            .then((res) => res.json())
            .then((json) => {
                setUser(json.data);
            });
    }, []);
    function handleProfileClick(id) {
        setUserContxt({ userID: id });
        history("/profile")
    }
    return (
        <div className="App">
            <div className="profile-container">
                {user.length !== 0 ? (
                    user.map(({ id, email, first_name, last_name, avatar }, i) => {
                        return (
                            <div key={i} onClick={() => handleProfileClick(id)}>
                                <img src={avatar} alt="profile" />
                                <h2>
                                    {first_name} {last_name}
                                </h2>
                                <p>{email}</p>
                            </div>
                        );
                    })
                ) : (
                    <div>No User</div>
                )}
            </div>
        </div>
    );
}
