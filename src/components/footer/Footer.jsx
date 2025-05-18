const date = new Date();
const year = date.getFullYear();
import { IoMdHeartEmpty } from "react-icons/io";


const Footer = ({themeMode}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center py-10">
        <div className={`${themeMode == 'dark' ? 'text-slate-400 opacity-40' : 'text-slate-600'}`}> © {year || 2025} SAILENDRZ. All rights reserved.</div>
        <div className={`${themeMode == 'dark' ? 'text-slate-400 opacity-40' : 'text-slate-600'} flex items-center justify-center gap-x-2 pt-2`}>
          <span><IoMdHeartEmpty size={18} /> </span>
          <span>Made in India</span>
          </div>
    </div>
  )
}

export default Footer