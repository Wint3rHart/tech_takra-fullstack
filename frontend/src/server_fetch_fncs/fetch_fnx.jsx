import { getApiBaseUrl } from '@/config/api';

export const get_fetch = async (route, options, x, y, z, cache_option) => {
  let aborter = new AbortController();
  let signal = aborter.signal;
  let timer = setTimeout(() => {
    aborter.abort("timed out");
  }, 900000);

  try {
    const API_BASE_URL = getApiBaseUrl(); // Get fresh URL at runtime
    let url;
    switch (route) {
      case "events":
        url = `${API_BASE_URL}/api/events`;
        break;
      case "team":
        url = `${API_BASE_URL}/api/team`;
        break;
      case "announcement":
      case "notice":
        url = `${API_BASE_URL}/api/announcement`;
        break;
      case "places_parallax":
        url = `${API_BASE_URL}/api/places_parallax`;
        break;
      case "cities_cards":
        url = `${API_BASE_URL}/api/cities_details`;
        break;
      case "top_hotels":
        url = `${API_BASE_URL}/api/top_hotels`;
        break;
      case "city_data":
        console.log(options);
        url = `${API_BASE_URL}/api/city_data/${options}`;
        break;
      case "order_dets":
        console.log("in order dets");
        url = `${API_BASE_URL}/api/order_dets?city=${options}&type=${x ? "package" : "custom"}&package_id=${x ? x : "none"}`;
        break;
      case "hotel_dets":
        console.log("in hotel dets");
        url = `${API_BASE_URL}/api/hotel_rooms?city=${options}`;
        break;
      case "all_hotels":
        url = `${API_BASE_URL}/api/hotels`;
        break;
      default:
        url = `${API_BASE_URL}/api/${route}/${options}`;
        break;
    }

    console.log('[get_fetch] Using API_BASE_URL:', API_BASE_URL, 'Route:', route);
    let get = await fetch(url, {
      method: "GET",
      signal,
      headers: { "X-Cache-Status": cache_option || false },
    });

    let conv = await get.json();

    if (!get.ok) throw new Error(conv.msg || "Error in server get fetch fnx");

    console.log(conv);

    return conv;
  } catch (error) {
    console.log("from fetch_fnx", error.message);
    throw error;
  } finally {
    clearTimeout(timer);
  }
};
