import axios from "axios";

const fetch = () => axios.get("api/v1/projects");
const create = (payload) => axios.post("api/v1/projects", payload);
const update = (id, payload) => axios.put(`api/v1/projects/${id}`, payload);
const destroy = (payload) =>
  axios.post("api/v1/projects/bulk_destroy", payload);

const projectsApi = {
  fetch,
  create,
  update,
  destroy,
};

export default projectsApi;
