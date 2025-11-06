import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method not allowed" });
  try {
    const atividades = await prisma.atividade.findMany();
    return res.status(200).json(atividades);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("GET /api/listaratividades error:", msg);
    return res.status(500).json({ error: msg || "Erro interno" });
  }
}
