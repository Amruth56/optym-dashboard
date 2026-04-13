import React, { useMemo } from "react";

import type { ColDef } from "ag-grid-community";
import type { ShipmentList, OriginFilter } from "./TableTypes";
import { themeQuartz } from "ag-grid-community";

export const theme = themeQuartz.withParams(
  {
    backgroundColor: "#000000",
    browserColorScheme: "dark",
  },
  "dark",
);

export const colDefsData: ColDef<ShipmentList>[] = [
    { field: "proNumber", headerName: "PRO" },
    { field: "manifestNumber", headerName: "MANIFEST" },
    { field: "origin", headerName: "ORIGIN" },
    { field: "destination", headerName: "DEST" },
    { field: "loadTo", headerName: "LOAD TO" },
    { field: "status", headerName: "STATUS" },
    { field: "location", headerName: "LOCATION" },
    {
      field: "dueDate",
      headerName: "ETA",
      valueFormatter: (params: any) => {
        const dueDate = params.value;
        const closeTime = params.data?.closeTime;
        return formatDueDate(dueDate, closeTime);
      },
    },
    { field: "trailerNumber", headerName: "TRAILER" },
    { field: "huCount", headerName: "# HUS" },
    {
      field: "weight",
      headerName: "WEIGHT",
      valueFormatter: (params: any) => {
        return formatWeight(params.value);
      },
    },
  ];

export const formatDueDate = (
  dueDate: string | null | undefined,
  closeTime?: string | null,
): string => {
  if (dueDate === null || dueDate === undefined || dueDate === "") {
    return "--";
  }

  const date = new Date(dueDate);
  if (isNaN(date.getTime())) {
    return "--";
  }

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear()).slice(-2);

  return `${month}/${year} ${closeTime || "--"}`;
};

export const formatWeight = (weight: number): string => {
  return Number(weight).toLocaleString("en-US");
};

export const formatDefaultValue = (value: any): string => {
  if (value === null || value === undefined || value === "") {
    return "--";
  }
  return value;
};

export const createTextFilter = (gridRef: React.RefObject<any>) => {
  return () => {
    const value =
      (document.getElementById("filter-text-box") as HTMLInputElement)?.value ??
      "";
    gridRef.current?.api.setGridOption("quickFilterText", value);
  };
};

export const createRowClickHandler = (
  onProSelected?: (proNumber: string) => void,
) => {
  return (event: any) => {
    const proNumber = event.data?.proNumber;
    console.log("proNumber:", proNumber);

    if (proNumber && onProSelected) {
      onProSelected(proNumber);
    }
  };
};

export const createExportCSVHandler = (gridRef: React.RefObject<any>) => {
  return () => {
    gridRef.current?.api.exportDataAsCsv({
      fileName: "shipment_list.csv",
      processCellCallback: (params: any): string => {
        const colId = params.column.getColId();

        if (colId === "dueDate") {
          const dueDate = params.node?.data?.dueDate;
          const closeTime = params.node?.data?.closeTime;

          if (dueDate === null || dueDate === "" || dueDate === undefined) {
            return "--";
          }

          const date = new Date(dueDate);
          if (isNaN(date.getTime())) {
            return "--";
          }

          const month = String(date.getMonth() + 1).padStart(2, "0");
          const year = String(date.getFullYear()).slice(-2);
          const formatted = `${month}/${year} ${closeTime || "--"}`;

          return `="${formatted}"`;
        }

        const value = params.value;

        if (value === null || value === undefined || value === "") {
          return "--";
        }

        if (colId === "weight") {
          return Number(value).toLocaleString("en-US");
        }

        return String(value);
      },
    });
  };
};

export const createExternalFilterChanged = (
  setOriginFilter: React.Dispatch<React.SetStateAction<OriginFilter>>,
  gridRef: React.RefObject<any>,
) => {
  return (filter: OriginFilter) => {
    setOriginFilter(filter);
    gridRef.current?.api.onFilterChanged();
  };
};

export const createIsExternalFilterPresent = (originFilter: OriginFilter) => {
  return () => {
    return originFilter !== "All";
  };
};

export const createDoesExternalFilterPass = (originFilter: OriginFilter) => {
  return (node: any) => {
    const data = node.data;
    if (!data) return true;

    switch (originFilter) {
      case "FTW":
      case "SPM":
      case "NLI":
      case "HST":
        return data.origin === originFilter;
      case "All":
      default:
        return true;
    }
  };
};
