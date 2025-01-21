import axios from "axios";

const fetch = () => axios.get("api/v1/videos");
const videosApi = {
  fetch,
};

export default videosApi;
