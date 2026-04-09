import ShipmentDetailsPage from '@/app/src/features/shipments/ShipmentDetailsPage'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ShipmentDetails from '../../../../JsonData/ShipmentDetail.json'


const tabs = [
  {
    name: 'SHIPMENT DETAILS',
    value: 'SHIPMENT_DETAILS',
    content: (
      <ShipmentDetailsPage />
    )
  },
  {
    name: 'PHOTOS',
    value: 'PHOTOS',
    content: (
      <div className='rounded-xl border border-white/10 bg-[#0b1220] p-4 text-sm text-white/80'>
        Photos content goes here.
      </div>
    )
  },
  {
    name: 'ACTIVITY',
    value: 'ACTIVITY',
    content: (
      <div className='rounded-xl border border-white/10 bg-[#0b1220] p-4 text-sm text-white/80'>
        Activity content goes here.
      </div>
    )
  }
]


const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex rounded-full bg-slate-800/80 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-slate-300">
    {children}
  </span>
);

type TabsUnderlineDemoProps = {
  selectedProNumber?: string;
};

export default function TabsUnderlineDemo({ selectedProNumber }: TabsUnderlineDemoProps) {
  const currentStep = ShipmentDetails.lifeCycleSteps?.[0];
  const route = currentStep ? `${currentStep.origin.displayName} → ${currentStep.destination.displayName}` : "--";
  const proNumberLabel = selectedProNumber ?? ShipmentDetails.proNumber;

  return (
    <div className='w-full max-w-xl  bg-gray-900 p-4 text-white overflow-hidden'>
      <div className="flex flex-wrap items-center gap-3 text-xs uppercase ">
        <span className="font-semibold text-white text-3xl">PRO {proNumberLabel}</span>
        <span className="rounded-md bg-emerald-500 text-black px-3 py-1 font-semibold ">{ShipmentDetails.taskStatus}</span>
      </div>
      <div className="mb-6 rounded-md border border-white/10 bg-gray-800 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-4">
           
            <h1 className="text-sm font-semibold tracking-tight text-gray-300">Current Assignment | <span className='text-white'> {ShipmentDetails.lifeCycleSteps?.[0]?.action} | {ShipmentDetails.lifeCycleSteps?.[0]?.info} </span></h1>
            <div className="flex flex-wrap gap-3 text-sm text-slate-300">
              <span>{route}</span>
              <span>•</span>
              <span>{ShipmentDetails?.lifeCycleSteps?.[0]?.info}</span>
              <span>•</span>
              <span>{ShipmentDetails.lifeCycleSteps?.[0]?.assignedTo?.[0]?.assignedToName}</span>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-rows-2 ">
            <span className='text-sm text-slate-300'>4 mins remaining</span>
            <span className="text-blue-300 flex justify-end">CHANGE</span>
          </div>
        </div>
      </div>
      <Tabs defaultValue='SHIPMENT_DETAILS' className='gap-2'>
        <div className='flex justify-between items-center'>
        <TabsList className='h-auto w-full gap-2 bg-transparent'>
          {tabs.map(tab => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="
                 h-10 rounded-none border-0 border-b-2 border-transparent
                bg-transparent px-0 pb-3 pt-2 text-sm font-semibold
                text-white uppercase cursor-pointer hover:text-white/80
                transition-all
                data-[state=active]:border-[#2f7df6]
                data-[state=active]:bg-transparent
                data-[state=active]:text-[#7fb2ff]
              "
            >
              {tab.name}
            </TabsTrigger>
          ))}
        </TabsList>
        <p className='uppercase'>+ Add assignment</p>
        </div>

        {tabs.map(tab => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className='mt-4 focus-visible:outline-none focus-visible:ring-0'
          >
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}