"use client";

import qs from "query-string";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { ptBR } from "date-fns/locale";
import { DateRange } from "react-day-picker";

import { format, subDays } from "date-fns";
import { formatDateRange } from "@/lib/utils";
import { useGetSummary } from "@/features/summary/api/use-get-summary";

import { ChevronDown } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const DateFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const { isLoading: isLoadingSummary } = useGetSummary();

  const accountId = params.get("accountId");
  const from = params.get("from") || "";
  const to = params.get("to") || "";

  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);

  const paramState = {
    from: from ? new Date(from) : defaultFrom,
    to: to ? new Date(to) : defaultTo,
  };

  const [date, setDate] = useState<DateRange | undefined>(paramState);

  const pushToUrl = (dateRange?: DateRange) => {
    const query = {
      from: format(dateRange?.from || defaultFrom, "yyyy-MM-dd"),
      to: format(dateRange?.to || defaultTo, "yyyy-MM-dd"),
      accountId,
    };

    const url = qs.stringifyUrl(
      { url: pathname, query },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  };

  const handleReset = () => {
    setDate(undefined);
    pushToUrl(undefined);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={false}
          size="sm"
          variant="outline"
          className="lg:w-auto h-9 rounded-md px-3 w-full font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition"
        >
          <span className="capitalize">{formatDateRange(paramState)}</span>
          <ChevronDown className="size-4 ml-2 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="lg:w-auto w-full p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          locale={ptBR}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
          defaultMonth={date?.from}
          disabled={isLoadingSummary}
          style={{ textTransform: "capitalize" }}
        />
        <div className="p-4 w-full flex items-center gap-x-2">
          <PopoverClose asChild>
            <Button
              size="sm"
              variant="outline"
              className="w-full"
              onClick={handleReset}
              disabled={!date?.from || !date?.to}
            >
              Limpar
            </Button>
          </PopoverClose>
          <PopoverClose asChild>
            <Button
              size="sm"
              className="w-full"
              onClick={() => pushToUrl(date)}
              disabled={!date?.from || !date?.to}
            >
              Confirmar
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
};
