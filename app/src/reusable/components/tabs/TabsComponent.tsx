import ShipmentDetailsPage from '@/app/src/features/shipments/ShipmentDetailsPage'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Ship } from 'lucide-react'

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

export default function TabsUnderlineDemo() {
  return (
    <div className='w-full max-w-3xl  bg-gray-900 p-4 text-white'>
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