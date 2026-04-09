'use client';

import React, { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import type { ColDef } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import { AgGridProvider, AgGridReact } from 'ag-grid-react';
import { themeQuartz } from "ag-grid-community";
import type { ShipmentList, TableComponentProps } from './TableTypes';
import ShipmentListData from '../../../../JsonData/ShipmentList.json';



const TableComponent = ({ onProSelected }: TableComponentProps) => {
  const gridRef = useRef<AgGridReact<ShipmentList>>(null);
  const [rowData] = useState<ShipmentList[]>(ShipmentListData as ShipmentList[]);

    const theme = themeQuartz
  .withParams(
    {
      backgroundColor: "#000000",
      browserColorScheme: "dark",
    },
    "dark",
  );

  useEffect(() => {
    document.body.dataset.agThemeMode = 'dark';
  }, []);

  const colDefs = useMemo<ColDef<ShipmentList>[]>(() => [
    { field: 'proNumber' },
    { field: 'manifestNumber' },
    { field: 'origin' },
    { field: 'destination' },
    { field: 'loadTo' },
    { field: 'status' },
    { field: 'location' },
    { field: 'dueDate' },
    { field: 'trailerNumber' },
    { field: 'huCount' },
    { field: 'weight' },
  ], []);

  const defaultColDef: ColDef<ShipmentList> = {
    flex: 1,
  };
  
  const TextFilter = useCallback(() =>{
    const value = (document.getElementById('filter-text-box') as HTMLInputElement)?.value ?? '';
    gridRef.current?.api.setGridOption('quickFilterText', value);
  }, []);

  const handleRowClick = useCallback((event: any) => {
    const proNumber = event.data?.proNumber;
    console.log('proNumber:', proNumber);
    console
    if (proNumber && onProSelected) {
      onProSelected(proNumber);
        }
  }, [onProSelected]);

  return (
    <AgGridProvider modules={[AllCommunityModule]}>
      <div className=" w-full" style={{ height: '100vh' }}>
        <div className='flex justify-between'>
        <h1 className='text-3xl'>2500 Shipments</h1>
        <div className="example-header">
            <input
              type="text"
              id="filter-text-box"
              placeholder="Search"
              onInput={TextFilter}
              className='border rounded-md border-gray-400 p-2'
            />
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