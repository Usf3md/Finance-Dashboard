import { NextRequest } from "next/server";

export const getAccessCookie = (
  request: NextRequest,
  prefix = process.env.JWT_PREFIX!
) => {
  return prefix + request.cookies.get("access")?.value ?? "";
};
export const getRefreshToken = (
  request: NextRequest,
  prefix = process.env.JWT_PREFIX!
) => {
  return prefix + request.cookies.get("refresh")?.value ?? "";
};
