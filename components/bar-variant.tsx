import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CustomTooltip } from "@/components/custom-tooltip";

import {
  Bar,
  XAxis,
  Tooltip,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export type BarVariantProps = {
  data?: {
    date: string;
    income: number;
    expenses: number;
  }[];
};

export const BarVariant = ({ data }: BarVariantProps) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey="date"
          tickFormatter={(value) => format(value, "dd MMM", { locale: ptBR })}
          style={{ fontSize: "0.75rem" }}
          tickMargin={16}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="income" fill="#3D82F6" className="drop-shadow-sm" />
        <Bar dataKey="expenses" fill="#F43F5E" className="drop-shadow-sm" />
      </BarChart>
    </ResponsiveContainer>
  );
};
