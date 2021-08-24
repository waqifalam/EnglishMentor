import { useState, useEffect } from 'react'
import getCookies from '../utils/GetCookies';

interface Cookies {
    uuid: string
}

const useCookies = (defaultValue: Cookies = { uuid: '' }) => {
    const [cookies, setCookies] = useState(defaultValue);

    useEffect(() => {
        const cookies: Cookies = getCookies();
        setCookies(cookies);
    }, []);

    return [cookies, setCookies];
};

export default useCookies;
