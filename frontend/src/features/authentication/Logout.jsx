import { useNavigate } from "react-router-dom";
import ButtonIcon from "../../ui/ButtonIcon";
import { HiArrowRightOnRectangle } from "react-icons/hi2";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = function () {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <ButtonIcon onClick={handleLogout}>
      <HiArrowRightOnRectangle />
    </ButtonIcon>
  );
}

export default Logout;
