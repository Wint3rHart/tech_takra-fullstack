"use client";

import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from '@/config/api';

const usePost = (type, method, access) => {
  console.log(access);

  const client = useQueryClient();
  const abort_ref = useRef(null);
  const [msg, setMsg] = useState(null);

  const post = useMutation({
    mutationFn: async (data) => {
      console.log(data);

      const aborter = new AbortController();
      const signal = aborter.signal;
      abort_ref.current = aborter;

      const timer = setTimeout(() => {
        aborter.abort("took too long");
      }, 900000);

      let url;

      switch (type) {
        case "delete_form":
          url = `${API_BASE_URL}/api/regForm/${data.data_id}`;
          break;

        case "update_event":
          console.log(data);
          url = `${API_BASE_URL}/api/events/update/${data.id}`;
          try {
            const get = await fetch(url, {
              method,
              body: data.form,
              signal,
              headers: { authorization: `Bearer ${access}` },
            });
            const conv = await get.json();
            if (!get.ok) throw new Error(conv.msg || `Error in ${type} from usePost`);
            return conv;
          } finally {
            clearTimeout(timer);
          }

        case "delete_event":
          url = `${API_BASE_URL}/api/events/delete/${data.data_id}`;
          break;

        case "create_event":
          url = `${API_BASE_URL}/api/events/create`;
          try {
            const get = await fetch(url, {
              method,
              body: data.form,
              signal,
              headers: { authorization: `Bearer ${access}` },
            });
            const conv = await get.json();
            if (!get.ok) throw new Error(conv.msg || `Error in ${type} from usePost`);
            return conv;
          } finally {
            clearTimeout(timer);
          }

        case "create_team":
          url = `${API_BASE_URL}/api/team/create`;
          try {
            const get = await fetch(url, {
              method,
              body: data.form,
              signal,
              headers: { authorization: `Bearer ${access}` },
            });
            const conv = await get.json();
            if (!get.ok) throw new Error(conv.msg || `Error in ${type} from usePost`);
            return conv;
          } finally {
            clearTimeout(timer);
          }

        case "update_team":
          url = `${API_BASE_URL}/api/team/update/${data.id}`;
          try {
            const get = await fetch(url, {
              method,
              body: data.form,
              signal,
              headers: { authorization: `Bearer ${access}` },
            });
            const conv = await get.json();
            if (!get.ok) throw new Error(conv.msg || `Error in ${type} from usePost`);
            return conv;
          } finally {
            clearTimeout(timer);
          }

        case "delete_team":
          url = `${API_BASE_URL}/api/team/delete/${data.data_id}`;
          try {
            const get = await fetch(url, {
              method,
              headers: { authorization: `Bearer ${access}` },
              signal,
            });
            const conv = await get.json();
            if (!get.ok) throw new Error(conv.msg || `Error in ${type} from usePost`);
            return conv;
          } finally {
            clearTimeout(timer);
          }

        case "create_notification":
          url = `${API_BASE_URL}/api/announcement/create`;
          try {
            const get = await fetch(url, {
              method,
              body: JSON.stringify(data),
              headers: {
                "content-type": "application/json",
                authorization: `Bearer ${access}`,
              },
              signal,
            });
            const conv = await get.json();
            if (!get.ok) throw new Error(conv.msg || conv.error || conv.message || `Error in ${type} from usePost`);
            return conv;
          } finally {
            clearTimeout(timer);
          }

        case "update_notification":
          url = `${API_BASE_URL}/api/announcement/update/${data.id}`;
          try {
            const { id, ...updateData } = data.formData || data;
            const get = await fetch(url, {
              method,
              body: JSON.stringify(updateData),
              headers: {
                "content-type": "application/json",
                authorization: `Bearer ${access}`,
              },
              signal,
            });
            const conv = await get.json();
            if (!get.ok) throw new Error(conv.msg || conv.error || conv.message || `Error in ${type} from usePost`);
            return conv;
          } finally {
            clearTimeout(timer);
          }

        case "delete_notification":
          url = `${API_BASE_URL}/api/announcement/delete/${data.data_id}`;
          try {
            const get = await fetch(url, {
              method,
              headers: { authorization: `Bearer ${access}` },
              signal,
            });
            const conv = await get.json();
            if (!get.ok) throw new Error(conv.msg || conv.error || conv.message || `Error in ${type} from usePost`);
            return conv;
          } finally {
            clearTimeout(timer);
          }

        case "create_admin":
          url = `${API_BASE_URL}/api/auth/admin/create`;
          break;

        case "delete_admin":
          url = `${API_BASE_URL}/api/auth/admin/delete/${data.data_id}`;
          break;

        case "change_password":
          url = `${API_BASE_URL}/api/auth/admin/change-password`;
          if (data.error) throw new Error(data.error);
          break;

        case "logout_admin":
          url = `${API_BASE_URL}/api/auth/admin/logout`;
          break;

        default:
          break;
      }

      try {
        const get = await fetch(url, {
          method,
          body: JSON.stringify(data),
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${access}`,
          },
          signal,
        });
        const conv = await get.json();
        if (!get.ok) throw new Error(conv.msg || `Error in ${type}`);
        return conv;
      } finally {
        clearTimeout(timer);
      }
    },

    onError: (error) => {
      console.log(error.message);
      setMsg((y) => (error && error === "Took too long" ? error : error.message || "Failed,Try Again Later"));
      let timer = setTimeout(() => {
        setMsg(null);
        clearTimeout(timer);
      }, 4000);
    },

    onSuccess: (x) => {
      console.log("success from usePost", x);
      setMsg(x.msg || "Success");

      if (type === "delete_form") client.invalidateQueries("get_forms");
      if (["delete_event", "update_event", "create_event"].includes(type)) client.invalidateQueries("events");
      if (["delete_team", "update_team", "create_team"].includes(type)) client.invalidateQueries("team");
      if (["delete_notification", "update_notification", "create_notification"].includes(type)) client.invalidateQueries("notice");
      if (["delete_admin", "create_admin", "change_password"].includes(type)) client.invalidateQueries("admin");

      let timer = setTimeout(() => {
        setMsg(null);
        clearTimeout(timer);
      }, 4000);
    },
  });

  return { post, abort_ref, msg };
};

export default usePost;
