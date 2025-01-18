import "./App.css";
// navigation
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
// layouts
import RootLayout from "./Layouts/RootLayout";
// Pages
import Home from "./Pages/Home/Home";
import Budgets from "./Pages/Budgets/Budgets";
import News from "./Pages/News/News";
import Reports from "./Pages/Reports/Reports";
import Profile from "./Pages/Profile/Profile";
import Summaries from "./Pages/Summaries/Summaries";
// auth
import { GoogleOAuthProvider } from "@react-oauth/google";
import SpecificBudget from "./Pages/SpecificBudget/SpecificBudget";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage/>}>
      <Route index element={<Home />}></Route>
      <Route path="budgets" element={<Budgets />}></Route>
      <Route path="budgets/:budget_id" element={<SpecificBudget/>} ></Route>

      <Route path="reports" element={<Reports />}></Route>
      <Route path="news" element={<News />}></Route>
      <Route path="summaries" element={<Summaries />}></Route>
      <Route path="profile" element={<Profile />}></Route>
    </Route>
  )
);

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  );
}

export default App;
