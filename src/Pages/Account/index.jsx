import { useNavigate } from 'react-router-dom'
import { UserAuth } from "../../context/AuthContext"
import { TeacherSubjectsWindow } from '../../Components/EditTeacherSubjectsWindow/teacherSubjectsWindow'
import Layout from '../../Components/Layout'
import { HiChevronLeft } from 'react-icons/hi'
import { CoursesContext } from '../../context/CoursesContext'
import { EditScheduleWindow } from '../../Components/EditScheduleWindow/editScheduleWindow'

function Account() {
    const { user } = UserAuth()

    const {
        wantToEditSubjects, 
        setWantToEditSubjects, 
        wantToEditSchedule, 
        setWantToEditSchedule
    } = CoursesContext()

    const navigate = useNavigate()

    return (
        <div>
            <div 
                onClick={() => navigate('/')}
                className='flex mt-8 ml-[2rem] mb- cursor-pointer'>
                <HiChevronLeft className='h-6 w-6'></HiChevronLeft>
                <p className='pl-4'>Volver a cursos</p>
            </div>

            <div>
                <h1 className="text-center text-3xl font-bold py-8">Hola {user?.displayName}</h1>
            </div>

            <div className='w-full flex justify-center'>
                <div className='grid w-full justify-center items-center border border-black p-10 m-5 max-w-[500px]'>
                    <div className='w-full'>
                        <div 
                            className='border-b border-black text-center'
                            onClick={() => {
                                setWantToEditSchedule(!wantToEditSchedule)
                            }}
                        >
                            <button>Editar horario</button>
                        </div>
                        <div 
                            className='border-b text-center border-black pt-8'
                            onClick={() => {
                                setWantToEditSubjects(!wantToEditSubjects)
                            }}
                        >
                            <button>Editar asignaturas</button>
                        </div>
                    </div>
                </div>
            </div>

            {
                wantToEditSubjects ? (
                    <TeacherSubjectsWindow/>
                ) : (
                    <div></div>
                )
            }

            {
                wantToEditSchedule ? (
                    <EditScheduleWindow/>
                ) : (
                    <div></div>
                )
            }
        </div>
    )
}

export default Account