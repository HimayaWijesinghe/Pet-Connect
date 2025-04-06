import React from 'react'

function MySponsorsCard({ userMail }) {

  return (
    <div className='w-3/4 bg-sky-100 rounded-xl my-7 p-5 flex justify-center items-center flex-col gap-1 relative z-[1]'>
    <i className="fas fa-star-of-life text-blue-700/25 text-[9rem] left-16 -rotate-[30deg] absolute -z-[1]"></i>
    <i className="fas fa-star-of-life text-blue-700/25 text-[4rem] right-[17.5vw] bottom-5 rotate-[45deg] absolute -z-[1]"></i>
        <p className="text-4xl font-bold text-sky-600">My Cherished Critters <span className="text-5xl">✨</span> </p>
        <p className="text-lg w-2/5 text-center text-blue-800">Explore the animals you're nurturing and follow their heartwarming journeys.</p>
        <a href={`/sponsor/${userMail}`} className="group bg-gradient-to-br from-cyan-400 to-blue-500 text-white px-4 py-2 rounded-xl transition-all duration-300 hover:scale-110">
            <span className="font-semibold tracking-wide">Discover Tails</span>
            <i class="fas fa-paw ml-2 group-hover:animate-bounce"></i>
        </a>
    </div>
  )
}

export default MySponsorsCard