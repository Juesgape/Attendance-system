import { Route, Routes } from "react-router-dom"
import Layout from "../../Components/Layout/index.jsx"
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
        <Layout>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/signin" element={<Log />}/>
            <Route path="/account" element={<Protected> <Account /> </Protected>}/>
            <Route path="/list" element={<Protected> <List></List>  </Protected>}></Route>
            <Route path="/*" element={<NotFound />}/>
          </Routes>
        </Layout>
      </CoursesContextProvider>
    </AuthContextProvider>
  )
}

export default App
