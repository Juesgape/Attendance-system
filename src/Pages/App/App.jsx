import { useRoutes, Route, Routes } from "react-router-dom"
import Layout from "../../Components/Layout/index.jsx"
import Log from "../Signin/index.jsx"
import Home from "../Home/index.jsx"
import NotFound from "../NotFound/index.jsx"
import Account from "../Account/index.jsx"
import { AuthContextProvider } from "../../context/AuthContext.jsx"
import Protected from "../../Components/Protected/index.jsx"

const App = () => {

  return (
    <AuthContextProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/signin" element={<Log />}/>
          <Route path="/account" element={<Protected> <Account /> </Protected>}/>
          <Route path="/*" element={<NotFound />}/>
        </Routes>
      </Layout>
    </AuthContextProvider>
  )
}

export default App
