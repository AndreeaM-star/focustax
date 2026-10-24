import { Main } from "@/components/ui";
import CalcTabs from "./CalcTabs";

export default function CalculatorLayout({ children }: { children: React.ReactNode }) {
  return (
    <Main>
      <CalcTabs />
      {children}
    </Main>
  );
}
