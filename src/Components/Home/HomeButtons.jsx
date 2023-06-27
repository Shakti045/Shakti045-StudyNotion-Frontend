import { NavLink } from "react-router-dom";

export default function HomeButtons({children,className,linkto}) {
  return (
      <NavLink to={linkto}>
         <button className={`${className} px-6 py-3 rounded-xl transition-all duration-700 hover:scale-95`}>
            {children}
         </button>
      </NavLink>
  )
}
