import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ShipmentDetails from "../../../../JsonData/ShipmentDetail.json";
import { TabsData } from "./TabsHelperComponent";
import { TabsUnderlineDemoProps } from "./TabsTypes";
import { IconTruck, IconUser, IconMapPin } from "@tabler/icons-react"

export default function TabsUnderlineDemo({
  selectedProNumber,
}: TabsUnderlineDemoProps) {
  const currentStep = ShipmentDetails.lifeCycleSteps?.[0];
  const route = currentStep
    ? `${currentStep.origin.displayName} → ${currentStep.destination.displayName}`
    : "--";
  const proNumberLabel = selectedProNumber ?? ShipmentDetails.proNumber;

  return (
    <div className="w-full max-w-2xl  bg-gray-800/50 p-4 text-white overflow-hidden">
      <div className="flex flex-wrap items-center gap-3 text-xs uppercase mb-1">
        <span className="font-semibold text-white text-3xl">
          PRO {proNumberLabel}
        </span>
        <span className="rounded-sm bg-green-400 text-black px-3 py-2 font-semibold ">
          {ShipmentDetails.taskStatus}
        </span>
      </div>
      <div className="mb-6 rounded-md border border-white/10 bg-slate-950/80 p-6">
        <div className="flex  gap-4 flex-row items-center justify-between">
          <div className="space-y-4">
            <h1 className="text-sm font-semibold tracking-tight text-gray-300">
              Current Assignment |{" "}
              <span className="text-white">
                {" "}
                {ShipmentDetails.lifeCycleSteps?.[0]?.action} |{" "}
                {ShipmentDetails.lifeCycleSteps?.[0]?.info}{" "}
              </span>
            </h1>
            <div className="flex flex-wrap gap-3 text-sm text-slate-300">
              <span><IconMapPin className="w-4 h-6 inline-block mr-2" />{route}</span>
              <span>•</span>
              <span> <IconTruck className="w-4 h-6 inline-block mr-2" />{ShipmentDetails?.lifeCycleSteps?.[0]?.info}</span>
              <span>•</span>
              <span>
                <IconUser className="w-4 h-6 inline-block mr-2" />
                {
                  ShipmentDetails.lifeCycleSteps?.[0]?.assignedTo?.[0]
                    ?.assignedToName
                }
              </span>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-rows-2">
            <span className="text-sm text-slate-300">4 mins remaining</span>
            <span className="text-blue-300 flex justify-end text-sm">CHANGE</span>
          </div>
        </div>
      </div>
      <Tabs defaultValue="SHIPMENT_DETAILS" className="gap-2">
        <div className="flex justify-between items-center border-b border-gray-700/50">
          <TabsList className="h-auto gap-4 bg-transparent">
            {TabsData.map((tab) => (
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
          <p className="uppercase text-sm text-blue-400">+ Add assignment</p>
        </div>

        {TabsData.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className="mt-4 focus-visible:outline-none focus-visible:ring-0"
          >
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
