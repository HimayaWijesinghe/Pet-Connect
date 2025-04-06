import React from 'react'
import StrayCard from '../components/ui/custom/stray_card'
import MySponsorsCard from '../components/ui/custom/my_sponsors_card'
import useSessionStore from '../store/sessionStore'
import { fetchLast6Sponsors } from '../server/sponser_function'


function SponsePets() {
  
  const activeEmail = useSessionStore((state) => state.activeEmail);

  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const [strays, setStrays] = React.useState([])


  const fetchData = async () => {
    setLoading(true)
    try {
      const data = await fetchLast6Sponsors()
      setStrays(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='w-full min-h-screen flex flex-col items-center p-3'>

      {
        activeEmail &&
        <MySponsorsCard userMail={activeEmail} />
      }

      <div className="w-5/6 grid grid-cols-3 gap-5 my-2">
          {
            error &&
            <div className="my-10 flex col-span-3 flex-col items-center justify-center text-red-800 gap-3">
              <i class="fas fa-bomb text-5xl animate-pulse"></i>
              <p className="font-semibold">{error}</p> 
            </div>
          }
          {
            loading &&
            <div className="my-10 flex col-span-3 flex-col items-center justify-center text-indigo-800 gap-3">
              <div className="size-9 rounded-full border-4 border-indigo-700 border-t-transparent animate-spin"></div>
              <p className="animate-pulse font-semibold">Wait a minute..</p>
            </div>
          }
          {
            !loading && !error &&
              strays.map((stray, index) => <StrayCard key={index} pet={stray} />)
          }
      </div>
    
      <div className="w-3/4 bg-sky-100 rounded-xl p-5 my-5 flex justify-center items-center flex-col gap-1 relative z-[1]">
        <i className="fas fa-paw text-blue-700/25 text-[9rem] left-16 -rotate-[30deg] absolute -z-[1]"></i>
        <i className="fas fa-paw text-blue-700/25 text-[4rem] right-[17.5vw] bottom-5 rotate-[45deg] absolute -z-[1]"></i>
        <p className="text-4xl font-bold text-sky-500">Be Their Hero Today!</p>
        <p className="text-lg w-3/5 text-center text-blue-800">Give rescued animals a second chance at life. Your support provides food, care, and hope.</p>
        <a href={'/sponsor'} className="bg-gradient-to-br from-cyan-400 to-blue-500 text-white px-4 py-2 rounded-xl transition-all duration-300 hover:scale-110">
          Browse Pets ..
        </a>
      </div>

    </div>
  )
}

export default SponsePets