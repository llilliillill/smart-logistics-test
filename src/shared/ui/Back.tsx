import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

interface BackProps {
  to: string;
  title: string;
}

export function Back({ to, title }: BackProps) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground"
    >
      <ArrowLeft className="h-4 w-4" />
      <span>{title}</span>
    </Link>
  );
}
