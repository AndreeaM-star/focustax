import type { Metadata } from "next";
import ManagerShell from "./ManagerShell";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  return <ManagerShell>{children}</ManagerShell>;
}
