import { Route, Routes } from "react-router-dom"
import Log from "../Signin/index.jsx"
import Home from "../Home/index.jsx"
import NotFound from "../NotFound/index.jsx"
import Account from "../Account/index.jsx"
import List from "../List/index.jsx"
import { AuthContextProvider } from "../../context/AuthContext.jsx"
import Protected from "../../Components/Protected/index.jsx"
import { CoursesContextProvider } from "../../context/CoursesContext.jsx"

const App = () => {

  return (
    <AuthContextProvider>
      <CoursesContextProvider>
        <Routes>
          <Route path="/signin" element={<Log />}/>
          <Route path="/account" element={<Protected> <Account /> </Protected>}/>
          <Route path="/" element={<Protected> <Home /> </Protected>}/>
          <Route path="/list" element={<Protected> <List></List>  </Protected>}></Route>
          <Route path="/*" element={<NotFound />}/>
        </Routes>
      </CoursesContextProvider>
    </AuthContextProvider>
  )
}

export default App
