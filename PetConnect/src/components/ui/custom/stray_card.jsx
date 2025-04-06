import React from 'react'
import { useNavigate } from 'react-router-dom'

function StrayCard({ pet }) {

    const navigate = useNavigate();
    
    const features = [
        { value: pet.type, icon: 'fa-paw' },
        { value: pet.breed, icon: 'fa-dna' },
        { value: pet.age + ' yrs', icon: 'fa-birthday-cake' },
        { value: pet.color, icon: 'fa-tint' },
        { value: pet.gender, icon: pet.gender === 'male' ? 'fa-mars' : pet.gender === 'female' ? 'fa-venus' : 'fa-genderless' },
    ]

    const gotoPage = () => {
        navigate(`/sponsor/${pet.type}/${pet.id}`)
    }

  return (
    <div className='bg-white flex flex-col justify-between relative rounded-xl shadow-md overflow-hidden transition duration-200 hover:-translate-y-1 hover:shadow-lg border border-gray-200 cursor-pointer group'>
        {/* status */}
        {
            pet.status === 'adopted' &&
            <div className="absolute z-[3] top-2.5 right-2.5 bg-green-600 shadow-md shadow-green-900/50 text-white rounded-full size-12 flex items-center justify-center">
                <i class="fas fa-shield-alt text-xl"></i>
            </div>
        }
        {/* image */}
        <div className="w-full h-[220px] overflow-hidden">
            <img
            src={pet.image}
            alt={ pet.name + '_image_' + pet.breed + pet.type}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
        </div>
        {/* details */}
        <p className="text-blue-500 text-lg px-3 mt-2"> <i class="fas fa-paw mr-1"></i> {pet.name}</p>
        {/* features */}
        <div className="flex items-center flex-wrap gap-2 px-2">
            {
                features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-1 text-sky-900 border border-sky-700 py-0.5 px-3 rounded-xl">
                        <i className={`fas ${feature.icon} text-[0.5rem]`} />
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
            {pet.description}
        </p>
        {/* actions */}
        <div className="flex border-t border-gray-200 py-3 items-center justify-between px-4">
            <p className="font-black text-blue-900 tracking-wide text-xl">{Number(pet.amount).toFixed(2)} <span className="uppercase text-sm">lkr</span> </p>
            <button onClick={gotoPage} disabled={pet.status === 'adopted'} className="flex items-center gap-2 text-white bg-blue-500 hover:bg-blue-700 rounded-md px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500">
                <span className="">Adopt</span>
                <i class="fas fa-paw"></i>
            </button>
        </div>
    </div>
  )
}

export default StrayCard