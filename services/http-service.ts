class HttpService<T> {
  endpoint: string;
  headers: any;
  constructor(endpoint: string, headers: any) {
    this.endpoint = endpoint;
    this.headers = headers;
  }
  async getAll(cache: boolean, queryString = "") {
    let response = await fetch(`${this.endpoint}${queryString}`, {
      headers: this.headers,
      cache: cache ? "default" : "no-cache",
    });
    return { success: response.ok, data: (await response.json()) as T[] };
  }

  async get(id: number, cache: boolean) {
    let response = await fetch(`${this.endpoint}${id}/`, {
      headers: this.headers,
      cache: cache ? "default" : "no-cache",
    });
    return { success: response.ok, data: (await response.json()) as T };
  }

  async post(body: string) {
    let response = await fetch(`${this.endpoint}`, {
      method: "POST",
      headers: this.headers,
      body: body,
    });
    return { success: response.ok, data: (await response.json()) as T };
  }

  async put(id: number, body: string) {
    let response = await fetch(`${this.endpoint}${id}/`, {
      method: "PUT",
      headers: this.headers,
      body: body,
    });
    return { success: response.ok, data: (await response.json()) as T };
  }

  async patch(id: number, body: string) {
    let response = await fetch(`${this.endpoint}${id}/`, {
      method: "PATCH",
      headers: this.headers,
      body: body,
    });
    return { success: response.ok, data: (await response.json()) as T };
  }

  async delete(id: number) {
    let response = await fetch(`${this.endpoint}${id}/`, {
      method: "DELETE",
      headers: this.headers,
    });
    return { success: response.ok };
  }
}

function create<T>(endpoint: string, headers: any) {
  return new HttpService<T>(endpoint, headers);
}

export default create;
