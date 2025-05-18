import ToggleButton from '../../utility/buttons/day-night/DayNightButton';
import { IoLogoGithub } from "react-icons/io5";
import Typing from '../../utility/typing/Typing';
const Navbar = ({themeMode, setThemeMode}) => {

  return (
    <div className='px-4 pt-2 flex w-full overflow-hidden justify-between'>
      <div className={`${themeMode==='dark' ? 'text-slate-200' : 'text-slate-800'} flex items-center gap-x-2`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" className="size-6 font-bold">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5" />
        </svg>

      <span className='md:hidden font-bold text-xl'>
              SAILENDRAZ
      </span>
      <span className='hidden md:block'>
              <Typing />
      </span>
      </div>
      
      <div className='flex items-center justify-center gap-x-10'>
        <a href='https://github.com/sailendrachettri' target='_blank'><IoLogoGithub size={27} /></a>
        <ToggleButton setThemeMode={setThemeMode} themeMode={themeMode}/>
      </div>
    </div>
  )
}

export default Navbar;