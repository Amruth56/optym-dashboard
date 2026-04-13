"use client";

import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, themeQuartz } from "ag-grid-community";
import { AgGridProvider, AgGridReact } from "ag-grid-react";
import type { ShipmentList, TableComponentProps, OriginFilter } from "./TableTypes";
import ShipmentListData from "../../../../JsonData/ShipmentList.json";
import { DownloadIcon } from "lucide-react";
import {
  theme,
  colDefsData,
  formatDefaultValue,
  createTextFilter,
  createRowClickHandler,
  createExportCSVHandler,
  createExternalFilterChanged,
  createIsExternalFilterPresent,
  createDoesExternalFilterPass,
} from "./TableHelperComponent";


const TableComponent = ({ onProSelected }: TableComponentProps) => {
  const [originFilter, setOriginFilter] = useState<OriginFilter>("All");

  const gridRef = useRef<AgGridReact<ShipmentList>>(null);
  const [rowData] = useState<ShipmentList[]>(ShipmentListData as ShipmentList[]);

  useEffect(() => {
    document.body.dataset.agThemeMode = "dark";
  }, []);

  const defaultColDef: ColDef<ShipmentList> = {
    flex: 1,
    sortable: true,
    filter: true,
    resizable: true,
    valueFormatter: (params: any) => {
      return formatDefaultValue(params.value);
    },
  };

  const colDefs = useMemo<ColDef<ShipmentList>[]>(
  () => colDefsData,
  [],
);

  const TextFilter = useCallback(createTextFilter(gridRef), []);

  const handleRowClick = useCallback(createRowClickHandler(onProSelected), [onProSelected]);

  const handleExportCSV = useCallback(createExportCSVHandler(gridRef), []);

  const externalFilterChanged = useCallback(createExternalFilterChanged(setOriginFilter, gridRef), []);

  const isExternalFilterPresent = useCallback(createIsExternalFilterPresent(originFilter), [originFilter]);

  const doesExternalFilterPass = useCallback(createDoesExternalFilterPass(originFilter), [originFilter]);

  return (
    <AgGridProvider modules={[AllCommunityModule]}>
      <div className="w-full text-white" style={{ height: "100vh" }}>
        <div className="flex justify-between bg-black p-2">
          <h1 className="text-3xl">2500 Shipments</h1>

          <div className="flex justify-between gap-2">
            <input
              type="text"
              id="filter-text-box"
              placeholder="Search"
              onInput={TextFilter}
              className="rounded-md border border-gray-400 p-2"
            />
            <button
              aria-label="Export CSV"
              onClick={handleExportCSV}
              className="cursor-pointer p-2"
            >
              <DownloadIcon />
            </button>
          </div>
        </div>

  <div className="test-header flex items-center gap-6 border-b border-gray-800 px-2">
  {(["All", "FTW", "SPM", "NLI", "HST"] as OriginFilter[]).map((filter) => {
    const isSelected = originFilter === filter;

    return (
      <button
        key={filter}
        type="button"
        onClick={() => externalFilterChanged(filter)}
        className={`border-b-2 px-1 py-3 text-sm font-semibold tracking-wide transition-colors cursor-pointer ${
          isSelected
            ? "border-blue-500 text-blue-500"
            : "border-transparent text-gray-400 hover:text-white"
        }`}
      >
        {filter}
      </button>
    );
  })}
</div>

        <AgGridReact<ShipmentList>
          ref={gridRef}
          theme={theme}
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          onRowClicked={handleRowClick}
          isExternalFilterPresent={isExternalFilterPresent}
          doesExternalFilterPass={doesExternalFilterPass}
        />
      </div>
    </AgGridProvider>
  );
};

export default TableComponent;