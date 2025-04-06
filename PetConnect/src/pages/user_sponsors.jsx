import React from 'react';
import { useParams } from 'react-router-dom';
import useSessionStore from '../store/sessionStore'
import { useNavigate } from 'react-router-dom'
import RichDawg from '../components/ui/custom/rich_dawg'
import { formatCurrency } from '../lib/custom_functions'
import { getUserSponsoredAnimals } from '../server/sponser_function'  

function SponsoredStrays() {

    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState('')
    const [strays, setStrays] = React.useState([])
    const [details, setDetails] = React.useState({total:'', pets:''})

    const { email } = useParams();
    const activeEmail = useSessionStore((state) => state.activeEmail);
    const navigate = useNavigate();

    
    
    React.useEffect(() => {
      // an authorized access
      if (email !== activeEmail) {
          navigate('/session') // when implementing login change the path
          return
      }

      const fetchData = async () => {
        setLoading(true)
        try {
          const data = await getUserSponsoredAnimals(email)
          setStrays(data)
          setDetails({total: data.reduce((sum, item) => sum + item.amount, 0), pets: data.length})        
        } catch (error) {
          setError(error.message)
        } finally {
          setLoading(false)
        }
      }

      fetchData()
    
    }, [activeEmail, email, navigate])

  return (
    <div className='w-full min-h-[50vh] flex flex-col items-center p-3'>
            
        <p className="text-5xl leading-snug font-bold bg-clip-text text-transparent bg-gradient-to-br from-cyan-400 to-blue-500">My Furever Journey</p>

        {
           !loading && strays.length > 0 &&
          <div className="w-3/4 bg-gradient-to-r from-blue-500 to-blue-800 rounded-xl p-5 my-5 flex justify-center items-center flex-col gap-1 relative z-[1]">
              <p className="font-bold text-sky-50/75 my-1 w-2/3">Your Love in Action,</p>
              <p className="text-3xl w-3/5 text-right font-bold text-sky-300">
                  Each month, your kindness <br/>contributes 
                  <span className="text-4xl font-bold text-sky-200 tracking-wider mx-2">{formatCurrency(details.total)}<span className="uppercase tracking-wide text-xl">lkr</span></span> and <br/>nurtures 
                  <span className="text-4xl font-bold text-sky-200 tracking-wider mx-2">{Number(details.pets)}</span> lives.
              </p>
              <div className="flex py-0.5 pl-3 pr-1 border border-sky-500 mt-2 items-center gap-3 rounded-full text-blue-200 translate-x-full">
                  <span className="text-sm">{email}</span>
                  <i class="fas fa-user-circle"></i>
              </div>
          </div>
        }

        {
           !loading && strays.length === 0 &&
          <div className="w-3/4 bg-gradient-to-r from-blue-500/35 to-blue-800/25 rounded-xl p-5 my-5 flex justify-evenly items-center gap-3 relative z-[1]">
            <img src="/sad_dog.svg" alt="sad_dog_image" className='w-1/4' />
            <div className="space-y-3">
              <p className="text-3xl text-right font-bold text-sky-500">There are so many <span className="italic text-red-500">souls</span>, <br/>that waiting for your <br/> <span className="text-5xl capitalize leading-snug text-rose-600">love 💖</span></p>
            </div>
          </div>
        }

        {
           !loading && strays.length === 0 &&
          <a href={'/sponsor'} className="w-2/5 bg-gradient-to-r from-blue-500 to-blue-800 rounded-xl p-5 my-5 transition-all duration-300 shadow-sm group hover:shadow-lg hover:shadow-slate-800/25">
            <p className="tracking-wider text-2xl font-semibold text-center text-sky-200">Adopt now.. <span className=" group-hover:animate-bounce relative">✨</span></p>
          </a>
        }

        {
           !loading && strays.length > 0 &&
          <div className="w-5/6 grid grid-cols-3 gap-5 my-2">
              {
                  strays.map((strays, index) => (
                      <RichDawg key={index} luckyBuck={strays} />
                  ))
              }
          </div>
        }
    
    </div>
  )
}

export default SponsoredStrays