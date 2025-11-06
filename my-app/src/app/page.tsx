"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function LoginAdm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/loginadm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const text = await res
        .clone()
        .text()
        .catch(() => null);
      let data = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = null;
      }
      console.log(
        "loginadm response status:",
        res.status,
        "bodyText:",
        text,
        "jsonParsed:",
        data
      );

      // aceitar ambos os formatos: { success: true } ou { ok: true }
      const logged = Boolean(data?.success || data?.ok);

      if (res.ok && logged) {
        // redireciona para a página inicial do admin
        router.push("/pginicialadm");
        return;
      }

      // mostrar mensagem de erro da API ou padrão
      alert(data?.error ?? "Email ou senha incorretos!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("loginadm fetch error:", msg);
      alert("Erro de rede. Veja console para mais detalhes.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="card">
        <Image
          src="/images/logopng.png"
          alt="codemind logo"
          className="logo"
          width={200}
          height={200}
        />
        <h2>Login Administrador</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            required
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="link-professor">
          <Link href="/loginprofessor">Fazer login como professor</Link>
        </div>
        <div className="link-aluno">
          <Link href="/loginaluno">Fazer login como aluno</Link>
        </div>
      </div>
    </div>
  );
}
