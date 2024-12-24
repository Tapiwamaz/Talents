
import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router"
import RootLayout from "./Layouts/RootLayout";
import Home from "./Pages/Home/Home";
import Budgets from "./Pages/Budgets/Budgets";
import News from "./Pages/News/News";
import Reports from "./Pages/Reports/Reports";
import Profile from "./Pages/Profile/Profile";
import Summaries from './Pages/Summaries/Summaries';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<RootLayout/>}>
      <Route index element={<Home/>}></Route>
      <Route  path="budgets" element={<Budgets/>}></Route>
      <Route  path="reports" element={<Reports/>}></Route>
      <Route  path="news" element={<News/>}></Route>
      <Route  path="summaries" element={<Summaries/>}></Route>
      <Route  path="profile" element={<Profile/>}></Route>
  </Route>
))


function App() {

return <RouterProvider router={router}/>
}

export default App;
