import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // ...list responses...
    return res.status(200).json([]);
  }

  if (req.method === "POST") {
    const payload: unknown = req.body;
    if (typeof payload !== "object" || payload === null) {
      return res.status(400).json({ error: "Invalid body" });
    }
    const body = payload as {
      alunoId?: number;
      atividadeId?: number;
      respostas?: unknown[];
    };
    // normalize/validate respostas array
    const rawRespostas = Array.isArray(body.respostas) ? body.respostas : [];
    const _respostas = rawRespostas.map((r) => {
      const rec = (r ?? {}) as Record<string, unknown>;
      return {
        perguntaId:
          rec.perguntaId !== undefined ? Number(rec.perguntaId) : undefined,
        alternativaId:
          rec.alternativaId !== undefined
            ? Number(rec.alternativaId)
            : undefined,
        texto: rec.texto !== undefined ? String(rec.texto) : undefined,
      };
    });
    // prefix `_respostas` with '_' to indicate intentional unused for now.
    // Use `_respostas` below when implementing creation logic.
    // validate fields before use
    // ...use alunoId, atividadeId and sanitized `respostas` for creation logic...
    return res.status(201).json({});
  }

  return res.status(405).json({ error: "Method not allowed" });
}
