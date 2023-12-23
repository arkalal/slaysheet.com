import { getServerSession } from "next-auth";
import axios from "../axios/getApi";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const checkFreeTokens = async () => {
  const userSession = await getServerSession(authOptions);
  const res = await axios.get("register");
  const registerData = res.data.user;

  const currentRegisteredUser = registerData.filter(
    (item) => item.email === userSession?.user.email
  );

  return currentRegisteredUser[0]?.freeTokens;
};

export default checkFreeTokens;
