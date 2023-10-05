import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";

import { useCtx } from "../context/ContextProvider";

function DarkModeToggle() {
  const { darkMode, setDarkMode } = useCtx();

  return (
    <ButtonIcon onClick={()=>setDarkMode(prev=>!prev)}>
      {darkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
