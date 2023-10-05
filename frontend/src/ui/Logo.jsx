import styled from "styled-components";
import { useCtx } from "../context/ContextProvider";


const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const  {darkMode}  = useCtx();

  const src = darkMode ? "/img/logo-dark.png" : "/img/logo-light.png";

  return (
    <StyledLogo>
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
