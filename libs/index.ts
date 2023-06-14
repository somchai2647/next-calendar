import axios from "axios";

export const api = async (url: string, body?: any) => {
  let data: any, error: string;
  const res = (await (body ? axios.post(url, body) : axios.get(url))).data;
  if (res.resCode === "200") data = res.data;
  else error = res.resCode;
  return { data, error };
};
