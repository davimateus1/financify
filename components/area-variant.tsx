import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CustomTooltip } from "@/components/custom-tooltip";

import {
  Area,
  XAxis,
  Tooltip,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export type AreaVariantProps = {
  data?: {
    date: string;
    income: number;
    expenses: number;
  }[];
};

export const AreaVariant = ({ data }: AreaVariantProps) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <defs>
          <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
            <stop offset="2%" stopColor="#3D82F6" stopOpacity={0.8} />
            <stop offset="98%" stopColor="#3D82F6" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="expenses" x1="0" y1="0" x2="0" y2="1">
            <stop offset="2%" stopColor="#F43F5E" stopOpacity={0.8} />
            <stop offset="98%" stopColor="#F43F5E" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey="date"
          tickFormatter={(value) => format(value, "dd MMM", { locale: ptBR })}
          style={{ fontSize: "0.75rem" }}
          tickMargin={16}
        />
        <Area
          type="monotone"
          dataKey="income"
          strokeWidth={2}
          stackId="income"
          stroke="#3D82F6"
          fill="url(#income)"
          className="drop-shadow-sm"
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="expenses"
          strokeWidth={2}
          stackId="expenses"
          stroke="#F43F5E"
          fill="url(#expenses)"
          className="drop-shadow-sm"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
