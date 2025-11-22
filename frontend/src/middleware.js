import React from 'react';
import CryptoJS from 'crypto-js';
import { NextResponse } from 'next/server';
import { getApiBaseUrl } from '@/config/api';

export const config = { matcher: ["/"] };

const loginFnx = async (request, signal) => {
  try {
    const API_BASE_URL = getApiBaseUrl(); // Get fresh URL at runtime
    const user_check = request.cookies.get("User-data")?.value;
    if (user_check) {
      let decrypted = null;
      let decrypt_parse = null;
      try {
        decrypted = CryptoJS.AES.decrypt(user_check, "125xyzabc").toString(CryptoJS.enc.Utf8);
        if (decrypted) {
          decrypt_parse = JSON.parse(decrypted);
        } else {
          throw new Error("decrypting failed");
        }
      } catch (error) {
        console.log(error.message);
        decrypted = null;
        throw error;
      }

      if (new Date(decrypt_parse.expiry) > new Date()) {
        console.log("User data fresh");
        let res = NextResponse.next();
      
        return res;
      }
    }else {console.log("User-data not found");
    ;throw new Error("Session Not Present")}


// await refresh_fnx(request,signal);
  } catch (error) {
    // console.log(error.message);
    // if (error.message.toUpperCase() === "TokenExpiredError".toUpperCase() ||
    //     error.message.toUpperCase() === "Access Not Found".toUpperCase()) {
    //   return await refresh_fnx(request, signal);
    // } else {
      throw error;
    // }
  }
};

const refresh_fnx = async (request, signal) => {
  console.log("in refresh");
  try {
    const API_BASE_URL = getApiBaseUrl(); // Get fresh URL at runtime
    const refresh = request.cookies.get("refresh")?.value;
    console.log("refresh", refresh);
    if (refresh) {
      let get = await fetch(
        `${API_BASE_URL}/api/admin/auth/refresh-token`,
        {
          method: "POST",
          headers: { "content-type": "application/json"},
          signal,body:JSON.stringify({refreshToken:refresh})
        }
      );
      let conv = await get.json();
      if (!get.ok) throw new Error(conv.msg);

      let res = NextResponse.next();
      res.cookies.set("access", conv.accessToken, { httpOnly: true, sameSite: "strict", secure: true, maxAge: 60 * 60 * 24 });
      res.cookies.set("refresh", conv.tokens.refresh, { httpOnly: true, sameSite: "strict", secure: true, maxAge: 60 * 60 * 24 * 3 });

      const expiry = new Date();
      res.cookies.set(
        "User-data",
        CryptoJS.AES.encrypt(JSON.stringify({ ...conv.user, expiry: expiry.setHours(expiry.getHours() + 5) }), "125xyzabc").toString(),
        { httpOnly: true, sameSite: "strict", secure: true, maxAge: 60 * 60 * 10 }
      );
      return res;
    } else {
      throw new Error("Refresh not found");
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const Middleware = async (request) => {
  console.log(request.nextUrl);
  console.log("MW running");

  const aborter = new AbortController();
  const signal = aborter.signal;
  const timer = setTimeout(() => {
    aborter.abort("took too long");
  }, 900000);

  try {
    let logger = await loginFnx(request, signal);
    return logger;
  } catch (error) {
    console.log("in mw catch", error.message);
    let res = NextResponse.next();
    res.headers.set("sign_error", error.message);
    res.cookies.delete("refresh");
    res.cookies.delete("access");
    res.cookies.delete("User-data");

    if (request.nextUrl.pathname.includes("/booking")) {
      console.log("is booking url");
      return NextResponse.redirect(new URL("/signUp", request.url));
    } else {
      return res;
    }
  } finally {
    clearTimeout(timer);
  }
};

export default Middleware;
