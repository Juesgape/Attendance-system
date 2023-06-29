import { GoogleButton } from 'react-google-button'
import { UserAuth } from '../../context/AuthContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

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
            navigate('/account')
        }
    },[user])

    return(
        <div>
            <h1 className='text-center text-3xl font-bold py-8'>Inicia sesión</h1>
            <div className='max-w-[240px m-auto py-4'>
                <GoogleButton onClick={handleGoogleSignIn}/>
            </div>
        </div>
    )
}

export default Log