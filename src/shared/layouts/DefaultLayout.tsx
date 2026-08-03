import { Outlet } from "@tanstack/react-router";

export function DefaultLayout() {
  return (
    <main>
      <Outlet />
    </main>
  );
}
