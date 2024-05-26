import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";

type Period = {
  from?: Date | string;
  to?: Date | string;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertAmountToMiliunits(amount: number) {
  return Math.round(amount * 1000);
}

export function convertMiliunitsToAmount(miliunits: number) {
  return miliunits / 1000;
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);
}

export function calculatePercentageChange(current: number, previous: number) {
  if (previous === 0) return previous === current ? 0 : 100;
  return ((current - previous) / previous) * 100;
}

export function fillMissingDays(
  activeDays: {
    date: Date;
    income: number;
    expenses: number;
  }[],
  startDate: Date,
  endDate: Date
) {
  if (activeDays.length === 0) return [];

  const allDays = eachDayOfInterval({ start: startDate, end: endDate });

  const transactionsByDay = allDays.map((day) => {
    const found = activeDays.find((d) => isSameDay(d.date, day));

    if (found) return found;

    return { date: day, income: 0, expenses: 0 };
  });

  return transactionsByDay;
}

export function formatDateRange(period: Period) {
  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);

  if (!period.from) {
    return `${format(defaultFrom, "LLL dd", { locale: ptBR })} - ${format(
      defaultTo,
      "LLL dd, y",
      { locale: ptBR }
    )}`;
  }

  if (period.to) {
    return `${format(period.from, "LLL dd", {
      locale: ptBR,
    })} - ${format(period.to, "LLL dd, y", { locale: ptBR })}`;
  }

  return `${format(period.from, "LLL dd, y", { locale: ptBR })}`;
}

export function formatPercentage(
  value: number,
  options: { addPrefix?: boolean } = { addPrefix: false }
) {
  const result = Intl.NumberFormat("pt-BR", {
    style: "percent",
  }).format(value / 100);

  if (options.addPrefix && value > 0) {
    return `+${result}`;
  }

  return result;
}
