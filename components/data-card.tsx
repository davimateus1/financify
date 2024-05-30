import { VariantProps, cva } from "class-variance-authority";
import { cn, formatCurrency, formatPercentage } from "@/lib/utils";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "./ui/card";

import { CountUp } from "@/components/count-up";
import { Skeleton } from "@/components/ui/skeleton";
import { useHideInfos } from "@/hooks/use-hide-infos";

const boxVariants = cva("shrink-0 rounded-md p-3", {
  variants: {
    variant: {
      default: "bg-blue-500/20",
      success: "bg-emerald-500/20",
      danger: "bg-rose-500/20",
      warning: "bg-yellow-500/20",
    },
  },
  defaultVariants: { variant: "default" },
});

const iconVariant = cva("size-6", {
  variants: {
    variant: {
      default: "fill-blue-500",
      success: "fill-emerald-500",
      danger: "fill-rose-500",
      warning: "fill-yellow-500",
    },
  },
  defaultVariants: { variant: "default" },
});

type BoxVariants = VariantProps<typeof boxVariants>;
type IconVariants = VariantProps<typeof iconVariant>;

interface DataCardProps extends BoxVariants, IconVariants {
  title: string;
  value?: number;
  dateRange: string;
  percentageChange?: number;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const DataCard = ({
  title,
  variant,
  dateRange,
  value = 0,
  icon: Icon,
  percentageChange = 0,
}: DataCardProps) => {
  const { hideInfos } = useHideInfos();

  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-x-4">
        <div className="space-y-2">
          <CardTitle className="text-2xl line-clamp-1">{title}</CardTitle>
          <CardDescription className="line-clamp-1 capitalize">
            {dateRange}
          </CardDescription>
        </div>
        <div className={cn(boxVariants({ variant }))}>
          <Icon className={iconVariant({ variant })} />
        </div>
      </CardHeader>
      <CardContent>
        {hideInfos ? (
          <Skeleton className="shrink-0 w-24 h-8 mb-2" />
        ) : (
          <h1 className="font-bold text-2xl mb-2 line-clamp-1 break-all">
            <CountUp
              start={0}
              end={value}
              decimals={2}
              preserveValue
              decimalPlaces={2}
              formattingFn={formatCurrency}
            />
          </h1>
        )}
        {hideInfos ? (
          <Skeleton className="shrink-0 w-40 h-4" />
        ) : (
          <p
            className={cn(
              "text-muted-foreground text-sm line-clamp-1",
              percentageChange > 0 ? "text-emerald-500" : "text-rose-500"
            )}
          >
            {formatPercentage(percentageChange, { addPrefix: true })} do mês
            anterior
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export const DataCardLoading = () => {
  return (
    <Card className="border-none drop-shadow-sm h-[192px]">
      <CardHeader className="flex flex-row items-center justify-between gap-x-4">
        <div className="space-y-2">
          <Skeleton className="w-24 h-6" />
          <Skeleton className="w-40 h-4" />
        </div>
        <Skeleton className="size-12" />
      </CardHeader>
      <CardContent>
        <Skeleton className="shrink-0 w-24 h-10 mb-2" />
        <Skeleton className="shrink-0 w-40 h-4" />
      </CardContent>
    </Card>
  );
};
