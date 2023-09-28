import { useNavigate } from 'react-router-dom'
import { UserAuth } from "../../context/AuthContext"
import Layout from '../../Components/Layout'

function Account() {
    const { user, logOut } = UserAuth()

    const navigate = useNavigate()

    return (
        <div className='grid justify-center items-center'>
            <div>
                <h1 className="text-center text-3xl font-bold py-8">Hola {user?.displayName}</h1>
            </div>

            <div className='grid justify-center items-center border border-black p-10'>
                <div className='border-b border-black'>
                    <button>Editar horario</button>
                </div>
                <div className='border-b border-black pt-8'>
                    <button>Editar asignaturas</button>
                </div>
            </div>

        </div>
    )
}

export default Account