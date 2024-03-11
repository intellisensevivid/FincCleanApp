import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../components/Layout";
import ErrorPage from "../components/ErrorPage";
import HomePage from "../features/Home/HomePage";
import SignupPage from "../features/Auth/SignupPage";
import LoginPage from "../features/Auth/LoginPage";
import ForgotPasswordPage from "../features/Auth/ForgotPasswordPage";
import WelcomePage from "../features/Auth/WelcomePage";
import ResetPasswordPage from "../features/Auth/ResetPasswordPage";
import StoreHomePage from "../features/Store/StoreHomePage";
import StoreLayout from "../components/StoreLayout";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "signup", element: <SignupPage /> },
        { path: "login", element: <LoginPage /> },
        { path: "forgotpassword", element: <ForgotPasswordPage /> },
        { path: "resetpassword/:token", element: <ResetPasswordPage /> },
      ],
    },
    {
      path: "/welcome",
      element: <WelcomePage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/store",
      element: <StoreLayout />,
      errorElement: <ErrorPage />,
      children: [{ index: true, element: <StoreHomePage /> }],
    },
  ]);
  return (
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default Router;
