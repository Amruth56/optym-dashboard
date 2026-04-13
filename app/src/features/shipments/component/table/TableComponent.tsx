"use client";

import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
import { themeQuartz } from "ag-grid-community";
import type { ShipmentList, TableComponentProps } from "./TableTypes";
import ShipmentListData from "../../../../JsonData/ShipmentList.json";
import { DownloadIcon } from "lucide-react";

const TableComponent = ({ onProSelected }: TableComponentProps) => {
  const gridRef = useRef<AgGridReact<ShipmentList>>(null);
  const [rowData] = useState<ShipmentList[]>(
    ShipmentListData as ShipmentList[],
  );

  const theme = themeQuartz.withParams(
    {
      backgroundColor: "#000000",
      browserColorScheme: "dark",
    },
    "dark",
  );

  useEffect(() => {
    document.body.dataset.agThemeMode = "dark";
  }, []);

  const colDefs = useMemo<ColDef<ShipmentList>[]>(
    () => [
      { field: "proNumber", headerName: "PRO " },
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
        },
      },
      { field: "trailerNumber", headerName: "TRAILER " },
      { field: "huCount", headerName: "# HUS" },
      {
        field: "weight",
        headerName: "WEIGHT",
        valueFormatter: (params: any) => {
          const value = params.value;
          return Number(value).toLocaleString("en-US");
        },
      },
    ],
    [],
  );

  const defaultColDef: ColDef<ShipmentList> = {
    flex: 1,
    sortable: true,
    filter: true,
    resizable: true,
    valueFormatter: (params: any) => {
      const value = params.value;

      if (value === null) {
        return "--";
      }

      return value;
    },
  };

  const TextFilter = useCallback(() => {
    const value =
      (document.getElementById("filter-text-box") as HTMLInputElement)?.value ??
      "";
    gridRef.current?.api.setGridOption("quickFilterText", value);
  }, []);

  const handleRowClick = useCallback(
    (event: any) => {
      const proNumber = event.data?.proNumber;
      console.log("proNumber:", proNumber);
      if (proNumber && onProSelected) {
        onProSelected(proNumber);
      }
    },
    [onProSelected],
  );

  const handleExportCSV = useCallback(() => {
  gridRef.current?.api.exportDataAsCsv({
    fileName: "shipment_list.csv",
    processCellCallback: (params: any): string => {
      const colId = params.column.getColId();

      if (colId === "dueDate") {
        const dueDate = params.node?.data?.dueDate;
        const closeTime = params.node?.data?.closeTime;

        if (dueDate === null || dueDate === "") {
          return "--";
        }

        const date = new Date(dueDate);
        if (isNaN(date.getTime())) {
          return "--";
        }

        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = String(date.getFullYear()).slice(-2);
        
        return `${month}/${year} ${closeTime || "--"}`;
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
}, []);

  return (
    <AgGridProvider modules={[AllCommunityModule]}>
      <div className=" w-full text-white" style={{ height: "100vh" }}>
        <div className="flex justify-between p-2 bg-black">
          <h1 className="text-3xl">2500 Shipments</h1>
          <div className="gap-2 flex justify-between">
            <input
              type="text"
              id="filter-text-box"
              placeholder="Search"
              onInput={TextFilter}
              className="border rounded-md border-gray-400 p-2"
            />
            <button
              aria-label="Export CSV"
              onClick={handleExportCSV}
              className=" cursor-pointer p-2"
            >
              <DownloadIcon />
            </button>
          </div>
        </div>
        <AgGridReact<ShipmentList>
          ref={gridRef}
          theme={theme}
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          onRowClicked={handleRowClick}
        />
      </div>
    </AgGridProvider>
  );
};

export default TableComponent;
