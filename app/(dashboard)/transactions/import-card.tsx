import { useState } from "react";
import { CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";

import { format, parse } from "date-fns";

import { ImportTable } from "./import-table";
import { convertAmountToMiliunits } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ImportCardProps = {
  data: string[][];
  onCancel: () => void;
  onSubmit: (data: any) => void;
};

const outputFormat = "yyyy-MM-dd";
const dateFormat = "yyyy-MM-dd HH:mm:ss";
const requiredOptions = ["amount", "date", "payee"];

export interface SelectedColumnsState {
  [key: string]: string | null;
}

export const ImportCard = ({ data, onCancel, onSubmit }: ImportCardProps) => {
  const headers = data[0];
  const body = data.slice(1);

  const [selectedColumns, setSelectedColumns] = useState<SelectedColumnsState>(
    {}
  );

  const onTableHeadSelectChange = (
    columnIndex: number,
    value: string | null
  ) => {
    setSelectedColumns((prev) => {
      const newSelectedColumns = { ...prev };

      for (const key in prev) {
        if (newSelectedColumns[key] === value) {
          newSelectedColumns[key] = null;
        }
      }

      if (value === "skip") value = null;

      newSelectedColumns[`column_${columnIndex}`] = value;
      return newSelectedColumns;
    });
  };

  const progress = Object.values(selectedColumns).filter(Boolean).length;

  const handleContinue = () => {
    const getColumnIndex = (column: string) => {
      return column.split("_")[1];
    };

    const mappedData = {
      headers: headers.map((header, index) => {
        const columnIndex = getColumnIndex(`column_${index}`);
        return selectedColumns[`column_${columnIndex}`] || null;
      }),
      body: body
        .map((row) => {
          const transformedRow = row.map((cell, index) => {
            const columnIndex = getColumnIndex(`column_${index}`);
            return selectedColumns[`column_${columnIndex}`] ? cell : null;
          });

          return transformedRow.every((cell) => cell === null)
            ? []
            : transformedRow;
        })
        .filter((row) => row.length > 0),
    };

    const dataArray = mappedData.body.map((row) => {
      return row.reduce((acc: any, cell, index) => {
        const header = mappedData.headers[index];
        if (header !== null) {
          acc[header] = cell;
        }

        return acc;
      }, {});
    });

    const formattedData = dataArray.map((item) => {
      return {
        ...item,
        amount: convertAmountToMiliunits(parseFloat(item.amount)),
        date: format(parse(item.date, dateFormat, new Date()), outputFormat),
      };
    });

    onSubmit(formattedData);
  };

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Importar transações
          </CardTitle>
          <div className="flex flex-col lg:flex-row items-center gap-y-2 gap-x-2">
            <Button size="sm" onClick={onCancel} className="w-full lg:w-auto">
              <CircleX className="size-4 mr-2" />
              Cancelar
            </Button>
            <Button
              size="sm"
              onClick={handleContinue}
              className="w-full lg:w-auto"
              disabled={progress < requiredOptions.length}
            >
              Continuar ({progress}/{requiredOptions.length})
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ImportTable
            body={body}
            headers={headers}
            selectedColumns={selectedColumns}
            onTableHeadSelectChange={onTableHeadSelectChange}
          />
        </CardContent>
      </Card>
    </div>
  );
};
