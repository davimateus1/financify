import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CustomTooltip } from "@/components/custom-tooltip";

import {
  Line,
  XAxis,
  Tooltip,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export type LineVariantProps = {
  data?: {
    date: string;
    income: number;
    expenses: number;
  }[];
};

export const LineVariant = ({ data }: LineVariantProps) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
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
        <Line
          dot={false}
          dataKey="income"
          stroke="#3D82F6"
          strokeWidth={2}
          className="drop-shadow-sm"
        />
        <Line
          dot={false}
          strokeWidth={2}
          stroke="#F43F5E"
          dataKey="expenses"
          className="drop-shadow-sm"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
