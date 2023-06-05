import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";

const getCookies = (): { uuid: string } => {
  const uuid: string = Cookies.get("uuid") || uuidv4();
  Cookies.set("uuid", uuid);
  return {
    uuid,
  };
};

export default getCookies;
