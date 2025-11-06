"use client";
import React from "react";

type Props =
  | {
      getText: () => string | null | undefined;
      fallback?: string;
      children?: never;
    }
  | { children: React.ReactNode; getText?: never; fallback?: never };

/**
 * Cliente-only helper:
 * - Quando usado com `getText`, executa a função diretamente (com try/catch).
 * - Quando usado com `children`, apenas renderiza os filhos.
 *
 * Removemos o useEffect/useState para evitar o aviso "Calling setState synchronously within an effect".
 */
export default function ClientOnlyText(props: Props) {
  if ("getText" in props) {
    const { getText, fallback = "—" } = props;
    try {
      const val = getText?.() ?? fallback;
      return <>{val}</>;
    } catch {
      return <>{fallback}</>;
    }
  }

  return <>{props.children}</>;
}
