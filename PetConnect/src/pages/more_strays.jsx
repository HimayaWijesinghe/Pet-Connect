import React from 'react'
import StrayCard from '../components/ui/custom/stray_card'
import MySponsorsCard from '../components/ui/custom/my_sponsors_card'
import useSessionStore from '../store/sessionStore'
import { fetchSponsorData } from '../server/sponser_function'


function MoreStrays() {

  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState('')
  const [strays, setStrays] = React.useState([])

  const activeEmail = useSessionStore((state) => state.activeEmail);

  const fetchData = async () => {
    setLoading(true)
    try {
      const data = await fetchSponsorData()
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
    <div className='w-full flex flex-col items-center'>
        
        <div className="w-full flex flex-col items-center bg-gradient-to-r relative from-blue-500 to-blue-800 text-white py-6">
            <p className="text-center text-3xl font-semibold">Meet Animals Waiting
                <br />for <span className="text-4xl font-bold bg-clip-text bg-gradient-to-br from-rose-300 to-red-400 text-transparent">Your Love </span> <span className="text-5xl">💕</span> 
            </p>
            
            <div className="flex justify-center w-4/5 items-center my-4 space-x-4 ">
                <div className="relative w-1/2">
                    <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    <input 
                    type="text"
                    placeholder="Browse rescued animals ready for care and kindness.."
                    // value={''}
                    onChange={(e) => {}}
                    className="pl-10 w-full border rounded-md px-3 py-2 text-gray-800"
                    />
                </div>
                <button className="group size-9 bg-sky-300/50 transition-all duration-300 hover:bg-cyan-50/85 hover:text-blue-500 rounded-md flex justify-center items-center">
                    <i class="fas fa-filter"></i>
                </button>
            </div>

            <p className="text-xs w-1/3 text-center">Every animal has a story, and you can be their happy ending. Explore and sponsor to make a difference today.</p>
        </div>

        <div className="w-5/6 grid grid-cols-3 gap-5 my-4">
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

        {
          activeEmail &&
          <MySponsorsCard userMail={activeEmail} />
        }

    </div>
  )
}

export default MoreStrays