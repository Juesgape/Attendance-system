const Footer = () => {
    const currentYear = new Date().getFullYear()
    
    return(
        <footer className="flex justify-center w-full">
            {/* <a href="https://github.com/Juesgape" target="blank" className="w-[50%]">
                <div className="w-full flex justify-center items-center cursor-pointer transition hover:text-blue-600">
                    <p>&copy; {currentYear} <span>Juesgape</span> </p>
                </div>
            </a> */}

            <a href="https://app.gitbook.com/o/MkM9QLSl2CGTRHHQI90A/s/Bi1sLCALRpcs2R2VqrhM/" target="blank" className="">
                <div className="w-full flex justify-center items-center cursor-pointer transition hover:text-blue-600">
                    <p> <span>🟢Preguntas Frecuentes🔵</span> </p>
                </div>
            </a>
        </footer>
    )
}

export {Footer}