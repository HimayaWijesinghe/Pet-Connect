import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose  } from '../dialog'
import { disown_a_Pet } from '../../../server/sponser_function'

function RichDawg({ luckyBuck }) {

    const features = [
        { value: luckyBuck.type, icon: 'fa-paw' },
        { value: luckyBuck.breed, icon: 'fa-dna' },
        { value: luckyBuck.age + ' yrs', icon: 'fa-birthday-cake' },
        { value: luckyBuck.color, icon: 'fa-tint' },
        { value: luckyBuck.gender, icon: luckyBuck.gender === 'male' ? 'fa-mars' : luckyBuck.gender === 'female' ? 'fa-venus' : 'fa-genderless' },
    ]

    const disownPet = async (e) => {
        try {
            const request = await disown_a_Pet(luckyBuck.recId, luckyBuck.id)
            console.log(request)
        } catch (error) {
            console.error('Error deleting sponsor:', error);
            throw error;
        } finally {
            window.location.reload();
        }
    }

  return (
    <div className='bg-white flex flex-col justify-between relative rounded-xl shadow-md overflow-hidden transition duration-200 hover:-translate-y-1 hover:shadow-lg border border-gray-200 cursor-pointer group'>
        
        {/* disown trigger */}
        <Dialog>
            <DialogTrigger asChild>
                <button className="absolute z-[3] top-2.5 right-2.5 size-9 rounded-md text-red-600 bg-zinc-100 transition-all duration-300 hover:bg-red-500 hover:text-zinc-100">
                    <i className="fas fa-heart-broken text-lg"></i>
                </button>
            </DialogTrigger>
            <DialogContent className="bg-white max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-red-900">💔 Letting Go?</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Are you sure you want to end your sponsorship? <br />Removing this bond means you’ll miss the heartwarming updates of your furry friend’s journey. Do you wish to proceed?
                </DialogDescription>
                <DialogFooter>
                    <DialogClose asChild>
                        <button className="rounded-md bg-stone-300 capitalize px-4 py-1 transition-all duration-300 hover:bg-stone-500 hover:text-stone-50">cancel</button>
                    </DialogClose>
                    {/* <DialogClose asChild> */}
                    <button onClick={(e) => disownPet(e)} className="rounded-md bg-red-600 capitalize px-4 py-1 transition-all duration-300 hover:bg-red-800 text-red-50">continue</button>            
                    {/* </DialogClose> */}
                </DialogFooter>
            </DialogContent>
        </Dialog>

        {/* <p className="text-[0.6rem]">{JSON.stringify(luckyBuck)}</p> */}

        {/* image */}
        <div className="w-full h-[220px] overflow-hidden">
            <img
            src={luckyBuck.image}
            alt={ luckyBuck.name + '_image_' + luckyBuck.breed + luckyBuck.type}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
        </div>
        {/* details */}
        <p className="text-blue-500 text-lg px-3 mt-2"> <i class="fas fa-paw mr-1"></i> {luckyBuck.name}</p>
        {/* features */}
        <div className="flex items-center flex-wrap gap-2 px-2">
            {
                features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-1 text-sky-900 border border-sky-700 py-0.5 px-3 rounded-xl">
                        <i className={`fas ${feature.icon} text-xs`} />
                        <span className="text-xs">{feature.value}</span>
                    </div>
                ))
            }
        </div>
        {/* story */}
        <p className="px-3 py-1 text-sm text-[#1e293b]" style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
        }}>
            {luckyBuck.description}
        </p>
        {/* addons */}
        <div className="flex border-t border-gray-200 py-3 items-center justify-between px-4">
            <div className="flex gap-1 items-baseline">
                <p className="font-black text-blue-900 tracking-wide text-lg">{Number(luckyBuck.amount).toFixed(2)}</p>
                <p className="uppercase text-sm font-bold text-blue-900">lkr</p>
            </div>
        </div>
    </div>
  )
}

export default RichDawg