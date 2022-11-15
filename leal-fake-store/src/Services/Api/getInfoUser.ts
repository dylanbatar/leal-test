import { BaseUrlGet, userId } from "../../global/globales";

export const getInfoUser = async () => {
  const resp = await fetch(BaseUrlGet + `/users/${userId}`);

  try {
    const result = await resp.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
