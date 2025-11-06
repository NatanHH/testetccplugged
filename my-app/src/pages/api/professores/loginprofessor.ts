import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const payload: unknown = req.body;
  if (typeof payload !== "object" || payload === null)
    return res.status(400).json({ error: "Invalid body" });

  const _body = payload as { email?: string; senha?: string };
  try {
    // ...lógica de login (verificar email/senha, consultar prisma, etc.) ...
    return res.status(200).json({ ok: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("loginprofessor error:", msg);
    return res.status(500).json({ error: msg });
  }
}
