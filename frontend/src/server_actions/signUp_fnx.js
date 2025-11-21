"use server";

import { API_BASE_URL } from '@/config/api';

/* -------------------------------------------
   REGISTER FUNCTION
--------------------------------------------- */
export const register_fnx = async (data) => {
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
      url = `${API_BASE_URL}/api/auth/admin/login`;
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
