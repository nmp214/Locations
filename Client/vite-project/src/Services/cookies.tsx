export function setCookie(name: string, value: string, days: number) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

export function getCookie(name: string): string | null {
    console.log("getCookie");
    const cookieString = document.cookie;
    const cookies = cookieString.split(";");
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + "=")) {
            console.log("cookie: " + cookie.substring(name.length + 1))
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

export function removeCookie(name: string) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export function isToken() {
    const cookie = getCookie("token");
    if (cookie)
        return true;
    return false;
}