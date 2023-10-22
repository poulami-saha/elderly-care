import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import HomePage from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Details from "./pages/Details";
import Assistance from "./pages/Assistance";
import Cost from "./pages/Cost";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./store/http";
import Requests from "./pages/Requests";
import ProtectedRoute from "./utils/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/signIn", element: <SignIn /> },
      { path: "/signUp", element: <SignUp /> },
      {
        path: "/details",
        element: (
          <ProtectedRoute>
            <Details />
          </ProtectedRoute>
        ),
      },
      { path: "/assistance", element: <Assistance /> },
      { path: "/cost", element: <Cost /> },
      {
        path: "/requests",
        element: (
          <ProtectedRoute>
            <Requests />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
