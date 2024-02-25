import { Tokens } from "@/app/api/auth/schema";
import { getAccessCookie } from "@/app/api/services/cookies-managment";

interface Credentials {
  email: string;
  password: string;
}

class Authenticator {
  async login(credentials: Credentials) {
    return await this.getTokens(credentials);
    // if (await this.getTokens(credentials)) return true;
    // await this.refresh();
    // return await this.getTokens(credentials);
  }
  async getTokens(credentials: Credentials) {
    let response = await fetch("/api/auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
      body: JSON.stringify(credentials),
    });
    return response.status === 200;
  }
  async logout() {
    let response = await fetch("/api/auth/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });
    return response.status === 200;
  }

  async refresh() {
    let response = await fetch("/api/auth/refresh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    return response.status === 200;
  }
  async verify() {
    let response = await fetch("/api/auth/verify/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    return response.status === 200;
  }
}

export default new Authenticator();
