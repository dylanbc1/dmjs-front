import { useEffect, useState } from "react";
import Cookies from "js-cookie";


export const useCurrentUser = () => {

    const [user, setUser] = useState<any | null>(null);

    useEffect( () => {
        const currentUser = Cookies.get("currentUser");
        if (currentUser) {
          setUser(JSON.parse(currentUser));
        }
        
        console.log("this is the current user "+ currentUser)
    }, []);

    return {user}

}