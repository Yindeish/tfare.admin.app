import LocalState from "@/constants/images/local_storage";
import ApiConfig from "./api.config";

const get = async ({ url }: { url: string }) => {
  // const get = async ({ url, timeout }: { url: string, timeout?: number }) => {
  // const controller = new AbortController();
  // const signal = controller.signal;

  // const fetchTimeout = setTimeout(() => {
  //     controller.abort();
  // }, timeout && timeout);
  try {
    const response = await fetch(`${ApiConfig.base_url}${url}`, {
      headers: ApiConfig.headers,
      // signal: timeout ? signal : null
    });

    // timeout && clearTimeout(fetchTimeout);

    const data = await response.json();
    return data;
  } catch (error) {
    ApiConfig.api_error(error);
  }
};

const getWithBearerToken = async ({ url }: { url: string }) => {
  const token = localStorage.getItem(LocalState.state.TOKEN);

  try {
    const response = await fetch(`${ApiConfig.base_url}${url}`, {
      headers: ApiConfig.token_header(token as string),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    ApiConfig.api_error(error);
  }
};

const post = async ({
  data: formData,
  url,
}: {
  data?: object;
  url: string;
}) => {
  try {
    const response = await fetch(`${ApiConfig.base_url}${url}`, {
      method: ApiConfig.methods.POST,
      headers: ApiConfig.headers,
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    ApiConfig.api_error(error);
  }
};

const postWithBearerToken = async ({
  data: formData,
  url,
}: {
  url: string;
  data?: object;
}) => {
  const token = localStorage.getItem(LocalState.state.TOKEN);

  try {
    const response = await fetch(`${ApiConfig.base_url}${url}`, {
      method: ApiConfig.methods.POST,
      headers: ApiConfig.token_header(token as string),
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    ApiConfig.api_error(error);
  }
};

const patchWithBearerToken = async ({
  data: formData,
  url,
}: {
  url: string;
  data?: object;
}) => {
  const token = localStorage.getItem(LocalState.state.TOKEN);

  try {
    const response = await fetch(`${ApiConfig.base_url}${url}`, {
      method: ApiConfig.methods.PATCH,
      headers: ApiConfig.token_header(token as string),
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    ApiConfig.api_error(error);
  }
};

const deleteWithBearerToken = async ({
  data: formData,
  url,
}: {
  url: string;
  data?: object;
}) => {
  const token = localStorage.getItem(LocalState.state.TOKEN);

  try {
    const response = await fetch(`${ApiConfig.base_url}${url}`, {
      method: ApiConfig.methods.DELETE,
      headers: ApiConfig.token_header(token as string),
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    ApiConfig.api_error(error);
  }
};

const ApiService = {
  post,
  get,
  getWithBearerToken,
  postWithBearerToken,
  patchWithBearerToken,
  deleteWithBearerToken,
};

export default ApiService;
