'use client';

import React, { useMemo, useState } from 'react';
import type { ColDef } from 'ag-grid-community';
import { AllCommunityModule } from 'ag-grid-community';
import { AgGridProvider, AgGridReact } from 'ag-grid-react';
import type { ShipmentList } from './TableTypes';
import ShipmentListData from '../../../../JsonData/ShipmentList.json';

const TableComponent = () => {
  const [rowData] = useState<ShipmentList[]>(ShipmentListData as ShipmentList[]);

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

  return (
    <AgGridProvider modules={[AllCommunityModule]}>
      <div className="w-full h-full" style={{ height: '100vh' }}>
        <AgGridReact<ShipmentList>
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
        />
      </div>
    </AgGridProvider>
  );
};

export default TableComponent;