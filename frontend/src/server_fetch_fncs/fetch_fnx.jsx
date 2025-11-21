export const get_fetch = async (route, options, x, y, z, cache_option) => {
  let aborter = new AbortController();
  let signal = aborter.signal;
  let timer = setTimeout(() => {
    aborter.abort("timed out");
  }, 10000);

  try {
    let url;
    switch (route) {
      case "events":
        url = `https://computersciencesocietyonrender.com/api/events/${options}`;
        break;
      case "team":
        url = `https://computersciencesocietyonrender.com/api/team`;
        break;
      case "announcement":
      case "notice":
        url = `https://computersciencesocietyonrender.com/api/announcement`;
        break;
      case "places_parallax":
        url = `https://computersciencesocietyonrender.com/api/places_parallax`;
        break;
      case "cities_cards":
        url = `https://computersciencesocietyonrender.com/api/cities_details`;
        break;
      case "top_hotels":
        url = `https://computersciencesocietyonrender.com/api/top_hotels`;
        break;
      case "city_data":
        console.log(options);
        url = `https://computersciencesocietyonrender.com/api/city_data/${options}`;
        break;
      case "order_dets":
        console.log("in order dets");
        url = `https://computersciencesocietyonrender.com/api/order_dets?city=${options}&type=${x ? "package" : "custom"}&package_id=${x ? x : "none"}`;
        break;
      case "hotel_dets":
        console.log("in hotel dets");
        url = `https://computersciencesocietyonrender.com/api/hotel_rooms?city=${options}`;
        break;
      case "all_hotels":
        url = `https://computersciencesocietyonrender.com/api/hotels`;
        break;
      default:
        url = `https://computersciencesocietyonrender.com/api/${route}/${options}`;
        break;
    }

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
