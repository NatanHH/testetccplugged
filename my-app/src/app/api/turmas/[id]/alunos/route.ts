import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export const runtime = "nodejs";

type RouteContext = { params?: { id?: string } };

export async function POST(req: NextRequest, context: RouteContext) {
  const paramsResolved = await Promise.resolve(context?.params);
  const turmaId =
    typeof paramsResolved?.id === "string"
      ? Number(paramsResolved.id)
      : undefined;
  if (!turmaId)
    return NextResponse.json({ error: "Missing turma id" }, { status: 400 });

  const payload: unknown = await req.json().catch(() => undefined);
  if (typeof payload !== "object" || payload === null)
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const body = payload as {
    alunoId?: number;
    nome?: string;
    email?: string;
    senha?: string;
  };

  try {
    let alunoId: number;

    if (typeof body.alunoId === "number") {
      alunoId = body.alunoId;
      const existe = await prisma.aluno.findUnique({
        where: { idAluno: alunoId },
      });
      if (!existe)
        return NextResponse.json(
          { error: "Aluno não encontrado" },
          { status: 404 }
        );
    } else {
      const novo = await prisma.aluno.create({
        data: {
          nome: body.nome ?? "sem-nome",
          email: body.email ?? `aluno+${Date.now()}@local.invalid`,
          senha: body.senha ?? "",
        },
      });
      alunoId = novo.idAluno;
    }

    await prisma.turmaAluno.create({
      data: {
        idTurma: turmaId,
        idAluno: alunoId,
      },
    });

    return NextResponse.json({ ok: true, alunoId }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("POST /turmas/[id]/alunos error:", message);
    const bodyErr =
      process.env.NODE_ENV === "production"
        ? { error: "internal" }
        : { error: message };
    return NextResponse.json(bodyErr, { status: 500 });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.setHeader("Allow", "POST,GET,OPTIONS");
  if (req.method !== "POST") return res.status(405).end("Method not allowed");
  // ...implemente aqui...
}
