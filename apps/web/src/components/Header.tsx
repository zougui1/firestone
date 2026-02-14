import { Link } from "@tanstack/react-router";
import { Separator } from "~/ui";

export function Header() {
  return (
    <header>
      <div className="flex flex-row items-center justify-between px-2 py-1">
        <nav className="flex gap-4 text-lg container mx-auto">
          <Link to="/">Bot</Link>
          <Link to="/campaign">Campaign</Link>
        </nav>
        <div className="flex items-center gap-2"></div>
      </div>

      <Separator />
    </header>
  );
}
