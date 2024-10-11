import Cookies from "js-cookie";

export function getAuthorizationHeader(){
    const currentUser = Cookies.get("currentUser");
    if (!currentUser) {
        console.warn('No currentUser cookie found');
        return {};
    }
    console.log(JSON.parse(currentUser || '')?.token)
    return {
        Authorization: `Bearer ${JSON.parse(currentUser || "")?.token}`
    };
}