import { Footer } from "../Footer"

const Layout = ({children}) => {
    return(
        <div className="m-8 flex flex-col h-[90vh] items-center justify-center">  
            {children}
            <Footer></Footer>
        </div>
    )
}

export default Layout