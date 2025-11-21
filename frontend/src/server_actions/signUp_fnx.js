"use server";

import { getApiBaseUrl } from '@/config/api';

/* -------------------------------------------
   REGISTER FUNCTION
--------------------------------------------- */
export const register_fnx = async (data) => {
  const API_BASE_URL = getApiBaseUrl(); // Get fresh URL at runtime
  let aborter = new AbortController();
  let signal = aborter.signal;

  let timer = setTimeout(() => {
    aborter.abort("Took too long");
  }, 10000);

  let form = new FormData();
  form.append("name", data.name);
  form.append("email", data.email);
  form.append("password", data.password);
  form.append("confirm_password", data.confirm_password);
  form.append("pic", data.pic[0]);

  try {
    console.log('[register_fnx] Using API_BASE_URL:', API_BASE_URL);
    let get = await fetch(`${API_BASE_URL}/api/register`, {
      method: "POST",
      body: form,
      signal
    });

    let conv = await get.json();
    if (!get.ok) {
      throw new Error(conv.type === "joi" ? conv.msg.message : conv.msg || "Error in Fetch Post");
    }

    console.log("conv is =", conv);
    return conv;

  } catch (error) {
    console.log(error.message);
    throw error;

  } finally {
    clearTimeout(timer);
  }
};

/* -------------------------------------------
   GENERIC SERVER ACTION (LOGIN / FORM SUBMISSION)
--------------------------------------------- */
export const serverAction = async (type, method, data) => {
  const API_BASE_URL = getApiBaseUrl(); // Get fresh URL at runtime
  let abort = new AbortController();
  let signal = abort.signal;

  const timer = setTimeout(() => {
    abort.abort("Too Long");
  }, 900000);

  let url = "";
  let body_data;

  switch (type) {
    case "signIn":
      body_data = JSON.stringify({ email: data.email, password: data.password });
      url = `http://localhost:4600/api/auth/admin/login`;
      break;

    case "registration":
      body_data = JSON.stringify(data);
      url = `${API_BASE_URL}/api/regForm`;
      break;

    default:
      url = '';
      break;
  }

  try {
    console.log('[serverAction] Using API_BASE_URL:', API_BASE_URL, 'URL:', url);
    let get = await fetch(url, {
      method,
      body: body_data,
      signal,
      headers: { 'content-type': "application/json" }
    });

    let conv = await get.json();
    if (!get.ok) {
      throw new Error(conv.type === "joi" ? conv.msg.message : conv.msg || "Error in Fetch Post");
    }

    console.log("conv is =", conv);
    return conv;

  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);

  } finally {
    clearTimeout(timer);
  }
};
