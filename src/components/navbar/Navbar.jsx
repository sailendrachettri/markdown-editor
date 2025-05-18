import ToggleButton from '../../utility/functions/buttons/day-night/DayNightButton';

const Navbar = ({themeMode, setThemeMode}) => {

  return (
    <>
      <ToggleButton setThemeMode={setThemeMode} themeMode={themeMode}/>
    </>
  )
}

export default Navbar