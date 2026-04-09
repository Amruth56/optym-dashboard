
export type AssignedTo = {
  assignedToId: string;
  assignedToName: string;
}

export type  LocationPoint = {
  displayName: string;
  locationType: string;
  id: string;
  name: string;
  trailerNumber: string | null;
  manifestNumber: string | null;
}

export type LifeCycleStep = {
  state: string;
  action: string;
  info: string;
  assignedTo: AssignedTo[];
  origin: LocationPoint;
  destination: LocationPoint;
  estimatedStartTime: string | null;
  estimatedEndTime: string | null;
}

export type ActivityItem = {
  timeLabel: string | null;
  label: string;
  metaLabel: string | null;
}

export type ShipmentDetail = {
  proNumber: string;
  taskStatus: string;
  lifeCycleSteps: LifeCycleStep[];
  activities: ActivityItem[];
  location: string;
  pickupDate: string;
  nextTerminal: string | null;
  currentTerminal: string;
  originTerminal: string;
  destinationTerminal: string;
  purchaseOrder: string;
  bolNumber: string;
  terms: string;
  shipper: {
    number: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  consignee: {
    number: string;
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  clientShipmentStatus: {
    id: number;
    clientCode: string;
    displayName: string;
    code: string;
  };
  assignedToName: string | null;
  timeToComplete: number;
  lhLoadTo: string | null;
  lhDoor: string | null;
  lhLoadType: string | null;
  cityRouteName: string;
  recommendedLoadingZone: string;
  stopSequence: number;
  deliverySchedule: {
    dueDate: string;
    appointmentDate: string | null;
    appointmentStart: string | null;
    appointmentEnd: string | null;
    earliestDeliveryDate: string | null;
    latestDeliveryDate: string | null;
  };
  cubicFeet: number;
  pse: number;
  totalHu: number;
  pieces: number;
  palletCount: number;
  packageType: string;
  specialNeeds: string[];
  totalWeight: number;
  returnReason: string | null;
  earliestDeliveryDate: string | null;
  latestDeliveryDate: string | null;
  advInterline: string | null;
  bydInterline: string | null;
  trailerRequirements: {
    minTrailer: number;
    maxTrailer: number;
    fixedTrailer: number;
  };
  trailerNumber: string | null;
}

export type ShipmentDetailsPanelProps = {
  shipment: ShipmentDetail;
}

export type ShipmentTableRow = {
  pc?: string | number | null;
  hm?: string | null;
  pkg?: string | null;
  description?: string | null;
  class?: string | number | null;
  weight?: string | number | null;
  rate?: string | number | null;
};