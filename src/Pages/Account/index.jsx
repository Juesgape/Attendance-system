import { useNavigate } from 'react-router-dom'
import { UserAuth } from "../../context/AuthContext"

function Account() {
    const { user, logOut } = UserAuth()

    const navigate = useNavigate()

    const handleGoogleSignOut = async () => {
        try {
            await logOut()
        } catch(err) {
            throw new Error(err)
        }
    }

    return (
        <div>
            <div>
                <h1 className="text-center text-3xl font-bold py-8">Hola {user?.displayName}</h1>
            </div>

            <button onClick={() => {
                handleGoogleSignOut()
                navigate('/signin')
            }}>
                Salir de cuenta
            </button>
        </div>
    )
}

export default Account