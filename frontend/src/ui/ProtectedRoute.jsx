import styled from "styled-components";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { useCtx } from "../context/ContextProvider";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { user } = useCtx();
  

  // 2. If there is NO authenticated user, redirect to the /login
  useEffect(()=>{

    if (!user) navigate("/login");
  },[user.email,navigate])

  

  // 4. If there IS a user, render the app
  if (user) return children;
}

export default ProtectedRoute;
