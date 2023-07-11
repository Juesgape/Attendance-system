import { GoogleButton } from 'react-google-button'
import { UserAuth } from '../../context/AuthContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Footer } from '../../Components/Footer'
import './background.css'

const Log = () => {
    // UserAuth is the context
    const { googleSignIn, user } = UserAuth()
    const navigate = useNavigate()

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn()
        } catch(err) {
            throw new Error(err)
        }
    }

    useEffect(() => {
        if(user != null) {
            navigate('/')
        }
    },[user])

    return (
        <div className="h-screen w-full flex flex-col justify-center items-center backgroundImage">
            <div className='m-4'>
                <div className="max-w-xl bg-black bg-opacity-10 rounded-lg p-8 flex flex-col justify-center items-center">
                    <h2 className="text-center text-2xl font-semibold mb-4">¡Bienvenido a tu sistema de asistencia!</h2>
                    <h3 className="text-center text-lg mb-8">Para continuar, debes ingresar con tu cuenta de Google</h3>
                    <div>
                        <h1 className="text-center text-4xl font-bold mb-8">Inicia sesión</h1>
                        <GoogleButton onClick={handleGoogleSignIn} />
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Log