import "./App.css";
import GlobalStyles from "./GlobalStyles";
import { RouterProvider } from "react-router-dom";
import { route } from "./router/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { useCtx } from "./context/ContextProvider";
import { useEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  const { setUser } = useCtx();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user"))) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, [setUser]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <RouterProvider router={route} />
      </QueryClientProvider>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </>
  );
}

export default App;
