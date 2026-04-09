export type ShipmentList = {
        proNumber: string | null,
        manifestNumber: string | null,
        origin: string,
        destination: string, 
        loadTo: string | null,
        status: string, 
        location: string | null,
        dueDate: string,
        trailerNumber: string | null,
        huCount: number,
        weight: number,
};

export type TableComponentProps = {
  onProSelected?: (proNumber: string) => void;
};