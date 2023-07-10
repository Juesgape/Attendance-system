import { CoursesContext } from "../../context/CoursesContext"

const DeleteCourseWindow = () => {

    const { wantToDeleteCourse,
            setWantToDeleteCourse,
            courseToDelete,
            courses,
            setCourses
        } = CoursesContext()

        const deleteCourse = (courseId) => {
            const updatedCourses = courses.filter((course) => course.id !== courseId);
            
            setCourses(updatedCourses.map((course, index) => ({...course, id: index.toString() })))
        }

    return (
        <div className={`${wantToDeleteCourse ? 'visible' : 'invisible'} absolute flex flex-col justify-center items-center top-0 left-0 h-full w-full`}>
            <div className="bg-white border border-black min-w-[400px] min-h-[200px] p-2 rounded-lg">
                <div className="pt-2 h-full">
                    <div className="flex justify-center items-center border-b-2">
                        <p className="font-light text-xl mr-4 mb-4"><span className="font-semibold">ADVERTENCIA</span></p>
                    </div>
                        <div className="w-full h-full text-center">
                            <div className="flex pt-4">
                                <p>Estas a punto de eliminar el curso</p>
                                <p className="pl-2"><span className="font-semibold">{courseToDelete.name ? courseToDelete.name : 'Nombre del curso'}</span> de tu lista. Esta acción</p>
                            </div>
                            
                            <p><span className="font-bold">NO</span> se puede revertir y perderás acceso a todos los datos de la lista.</p>

                            <div className="text-center pt-4 text-lg font-bold">
                                <p>¿Deseas eliminar de todos modos?</p>
                            </div>
                            
                            <div className="flex justify-evenly pt-8 pb-4">
                                <button 
                                    className="bg-red-400 p-3 rounded-lg hover:text-white"
                                    onClick={() => setWantToDeleteCourse(false)}
                                    >Cancelar
                                
                                </button>
                                
                                <button 
                                    className="bg-blue-400 p-3 rounded-lg hover:text-white"
                                    onClick={() => {
                                        deleteCourse(courseToDelete.id)
                                        setWantToDeleteCourse(false)
                                    }}
                                    >
                                        Eliminar
                                </button>

                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export {
    DeleteCourseWindow
}