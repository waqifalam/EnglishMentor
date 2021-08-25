import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import getCookies from '../utils/GetCookies';

interface Cookies {
  uuid: string
}

const useCookies = (defaultValue: Cookies = { uuid: '' }): [Cookies, Dispatch<SetStateAction<Cookies>>] => {
  const [cookies, setCookies] = useState(defaultValue);

  useEffect(() => {
      const cookies: Cookies = getCookies();
      setCookies(cookies);
  }, []);

  return [cookies, setCookies];
};

export default useCookies;
