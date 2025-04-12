import React from "react";
import { checkLogIn } from "../../utils/api";

export default function Protected() {

    const [user, setUser] = useState(null);

    useEffect(() => {
    fetch("http://localhost:3000/user/me", {
        method: "GET",
        credentials: "include", // ✅ must include this
    })
        .then(async (res) => {
        if (res.ok) {
            const data = await res.json();
            setUser(data); // 👈 store user data
        } else {
            setUser(null); // not logged in
        }
        })
        .catch(() => setUser(null));
    }, []);



    return (
    <div>
        <h1>protected mofo</h1>
    </div>
    )
}