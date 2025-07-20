import ReactDOM from "react-dom/client";
import React, { ReactNode, useEffect } from "react";
import "./index.css";
import {
  AboutPage,
  ActivitiesPage,
  Blog,
  BlogDetail,
  ClassPage,
  CoachDetail,
  CoachPage,
  CoachSchedule,
  HomePage,
  Root,
  Schedule,
  ScheduleDetailPage,
  UserPage,
} from "./pages/index";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { store } from "./store";
import { Provider, useDispatch } from "react-redux";
// RTK Query
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./features/api/apiSlice";
import { setToken } from "./features/slices/tokenSlice";
import AlertBox from "./components/AlertBox";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "home",
    element: <HomePage />,
  },
  {
    path: "about",
    element: <AboutPage />,
  },
  {
    path: "schedule",
    element: <Schedule />,
  },
  {
    path: "schedule/:exzId",
    element: <ScheduleDetailPage />,
  },
  {
    path: "coach",
    element: <CoachPage />,
  },
  {
    path: "coach/:coachId",
    element: <CoachDetail />,
  },
  {
    path: "coach/schedule",
    element: (
      <ProtectedRoute
        user={"coach"}
        isAllowed={true}
        redirectPath={"/"}
        accessibleRole="coach"
      >
        <CoachSchedule />
      </ProtectedRoute>
    ),
  },
  {
    path: "activities",
    element: <ActivitiesPage />,
  },
  {
    path: "user",
    element: (
      <ProtectedRoute
        // user={user ? user.role : undefined}
        isAllowed={true}
        redirectPath={"/"}
        accessibleRole={["user", "coach"]}
      >
        <UserPage />
      </ProtectedRoute>
    ),
    // element: <UserPage />,
  },
  {
    path: "blog",
    element: <Blog />,
  },
  {
    path: "blog/:blogId",
    element: <BlogDetail />,
  },
  {
    path: "classes",
    element: <ClassPage />,
  },
]);

interface ToastProviderProps {
  children: React.ReactNode;
}
export const ToastProvider = ({ children }: ToastProviderProps) => {
  return (
    <>
      {children}
      <AlertBox />
    </>
  );
};

const Test = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      const token = JSON.parse(localToken).token;
      dispatch(setToken({ token: token }));
    }
  }, []);
  return (
    <>
      <ToastProvider>{children};</ToastProvider>
    </>
  );
};

// const selectRouter = localStorage.getItem("user")! ? coachRouter : commonRouter;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApiProvider api={apiSlice}>
      <Provider store={store}>
        <Test>
          <RouterProvider router={router} />
        </Test>
      </Provider>
    </ApiProvider>
  </React.StrictMode>
);
