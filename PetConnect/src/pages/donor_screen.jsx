import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import DonationPage from './donation'
import SponsePets from './sponse_pets'

function DonorScreen() {


  return (
    <div className='w-full flex flex-col items-center'>
        <Tabs defaultValue="donate" className="w-full flex flex-col items-center">
            <div className="w-full flex flex-col items-center bg-gradient-to-r relative from-blue-500 to-blue-800 text-white py-6">

                <div className="flex mx-auto w-3/5 flex-col p-5 relative -top-4">
                    <p className="relative -left-3">Choose your impact</p>
                    <p className="text-2xl ">
                        <span className="font-semibold">Donate for one-time support</span> , or <span className="font-bold bg-gradient-to-br bg-clip-text text-3xl from-cyan-100 to-cyan-300 text-transparent">Sponsor for a dedicated</span>, ongoing commitment to a pet’s well-being.
                    </p>
                </div>

                <TabsList className="h-auto bg-blue-100 p-1.5 rounded-full w-1/3">
                    <TabsTrigger value="donate" className="gap-3 flex-1 px-4 py-1.5 rounded-full data-[state=active]:bg-gradient-to-br data-[state=active]:from-cyan-400 data-[state=active]:to-blue-500 data-[state=active]:text-sky-50 text-blue-500">
                        <i class="fas fa-gift text-3xl"></i>
                        <div className="flex flex-col text-left">
                            <p className="text-lg">Give a Paw</p>
                            <p className="text-xs px-1">Donate</p>
                        </div>
                    </TabsTrigger>
                    <TabsTrigger value="sponsor" className="gap-2 flex-1 px-4 py-1.5 rounded-full data-[state=active]:bg-gradient-to-br data-[state=active]:from-cyan-400 data-[state=active]:to-blue-500 data-[state=active]:text-sky-50 text-blue-500">
                        <i class="fas fa-star-of-life text-3xl"></i>
                        <div className="flex flex-col text-left">
                            <p className="text-lg">Be a Hero</p>
                            <p className="text-xs px-1">Sponsor</p>
                        </div>
                    </TabsTrigger>
                </TabsList>

            </div>

            <TabsContent value="donate">
                <DonationPage />
            </TabsContent>
            <TabsContent value="sponsor">
                <SponsePets />
            </TabsContent>
        </Tabs>
    </div>
  )
}

export default DonorScreen