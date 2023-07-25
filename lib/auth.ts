import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { BackendSession } from "types";
export default async function auth(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<BackendSession> {
  let session = await getServerSession(req, res, authOptions);
  return session;
}
