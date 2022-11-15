import { BaseUrlPost } from "../../global/globales";

export const postOrdersUser = async (data: any) => {
  const resp = await fetch(BaseUrlPost + "/orders", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });

  try {
    if (resp.status === 200) {
      return { status: resp.status };
    } else {
      return { status: resp.status };
    }
  } catch (error) {
    console.log(error);
  }
};
