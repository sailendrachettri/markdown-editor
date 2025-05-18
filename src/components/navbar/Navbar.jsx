import ToggleButton from '../../utility/functions/buttons/day-night/DayNightButton';
import { IoLogoGithub } from "react-icons/io5";
const Navbar = ({themeMode, setThemeMode}) => {

  return (
    <div className='px-4 pt-2 flex w-full overflow-hidden justify-end items-end'>
      <div className='flex items-center justify-center gap-x-10'>
        <a href='https://github.com/sailendrachettri' target='_blank'><IoLogoGithub size={27} /></a>
        <ToggleButton setThemeMode={setThemeMode} themeMode={themeMode}/>
      </div>
    </div>
  )
}

export default Navbar;