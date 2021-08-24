import { useState, useEffect } from 'react'
import getCookies from '../utils/GetCookies';

const useCookies = (defaultValue = {}) => {
    const [cookies, setCookies] = useState(defaultValue);

    useEffect(() => {
        const cookies = getCookies();
        setCookies(cookies);
    }, []);

    return [cookies, setCookies];
};

export default useCookies;
