import React from 'react'
import { timeAgo } from '../../../lib/custom_functions'

function SponserCard({pet}) {

  const details = [
    { label: 'Type', value: pet.type, icon: 'fa-paw' },
    { label: 'Breed', value: pet.breed, icon: 'fa-dna' },
    { label: 'Age', value: pet.age + ' yrs', icon: 'fa-birthday-cake' },
    { label: 'Color', value: pet.color, icon: 'fa-tint' },
  ]

  return (
    <div className='w-full p-3'>
      <div className=" w-full grid grid-cols-3 grid-rows-3 gap-2">
          <div className='col-span-2 row-span-2 w-full rounded-lg h-60 flex justify-center items-center overflow-hidden group'>
            <img
              src={pet.image}
              alt={ pet.name + '_image_' + pet.breed + pet.type}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
          </div>
          <div className="col-start-3 flex justify-end items-center">
            <p className="text-3xl font-bold text-sky-500 mb-2">
              {pet.name} 
            </p>
            <i className={`ml-2 text-xl fas ${ pet.gender === 'male' ? 'fa-mars text-blue-500' : pet.gender === 'female' ? 'fa-venus text-pink-500' : 'fa-genderless text-purple-500' }`}></i>
          </div>
          <div className='col-start-3 row-start-2 flex flex-col gap-2 px-3 justify-center items-end'>
            {
              details.map((quality, index) => (
                <div className="flex items-center gap-3" key={index}>
                    <span className='text-sm capitalize'>{quality.value}</span>
                    <i className={'text-blue-500 fas ' + quality.icon} />
                </div>
              ))
            }
          </div>
          <div className="col-span-3 row-start-3 border-t px-3 border-t-blue-200 flex flex-col py-2">
            <p className="line-clamp-4" title={pet.description}>{pet.description}</p>
            <div className="w-full flex justify-between mt-3 items-end">
              <p className="font-black text-blue-900 tracking-wide text-2xl">{Number(pet.amount).toFixed(2)} <span className="uppercase text-sm">lkr</span> </p>
              <p className="text-[0.65rem]">{timeAgo(pet.date)}</p>
            </div>
          </div>
      </div>
    </div>
  )
}

export default SponserCard