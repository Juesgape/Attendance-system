const Footer = () => {
    const currentYear = new Date().getFullYear()
    
    return(
        <footer>
            <a href="https://github.com/Juesgape" target="blank">
                <div className="w-full flex justify-center items-center cursor-pointer transition hover:text-blue-600">
                    <p>&copy; {currentYear} <span>Juesgape</span> </p>
                </div>
            </a>
        </footer>
    )
}

export {Footer}