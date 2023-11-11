import { useEffect, useState } from "react"
import { UserAuth } from "../../context/AuthContext"
import { HiX, HiTrash } from "react-icons/hi"
import { CoursesContext } from "../../context/CoursesContext"
import { EditSchedule } from "./EditSchedule/EditSchedule"

const EditScheduleWindow = () => {
    const { user } = UserAuth()
    const {wantToEditSchedule, setWantToEditSchedule, courses, setCourses} = CoursesContext()
    const [wantToDeleteCourseFromSubject, setWantToDeleteCourseFromSubject] = useState(false)
    const [selectedSubjectData, setSelectedSubjectData] = useState({})

    const [daysWithSubjects, setDaysWithSubjects ] = useState({
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: []
    })

    //Days of the week, start in 0 and end in 6
    const days = {
        'Lunes': 1, 
        'Martes': 2, 
        'Miércoles': 3, 
        'Jueves': 4,
        'Viernes': 5,
    }

    const handleDragStartCourse = (e, course) => {
        e.dataTransfer.setData("text/plain", course)
    }

    const handleDropCourse = (e, subject, day) => {
        e.preventDefault();
        e.stopPropagation();
        const course = e.dataTransfer.getData("text/plain");

        let subjectDayFound = null;

        //Preventing from adding a subject inside a subject
        if(courses[0].subjects.includes(course)) {
            //Stop function, it´s a subject
            return
        }

        if(daysWithSubjects) {
            const subjectsForDay = daysWithSubjects[days[day]]

            for(let i = 0; i < subjectsForDay.length; i++) {
                if(subjectsForDay[i].subject === subject) {
                    subjectDayFound = subjectsForDay[i]
                    break
                }
            }
        }

        const newCourses = [...courses]

        if(!subjectDayFound.allCourses.includes(course)) {
            subjectDayFound.allCourses.push(course)
            
            newCourses.forEach((course) => {
                course.subjectsDay = daysWithSubjects
            })

            setCourses(newCourses)
            return
        }

        /* console.log(daysWithSubjects);

        console.log('Course was already added'); */
        
    }


    const handleDragStart = (e, subject) => {
        e.dataTransfer.setData("text/plain", subject)
    }

    const handleDragOver = (e) => {
        e.preventDefault();
    }

    const handleDrop = (e, day) => {
        e.preventDefault();
        e.stopPropagation();
        let subject = e.dataTransfer.getData("text/plain");

        //Controlling if we are adding a course in a subject day
        if(courses) {
            const coursesName = courses.map(course => course.name)
            
            //Prevent from adding courses in the subjects day rows
            if(coursesName.includes(subject)) {
                return
            }
        }

        const newObject = {...daysWithSubjects}

        if(daysWithSubjects) {

            const subjectsForDay = daysWithSubjects[days[day]]
            if (subjectsForDay && subjectsForDay.length > 0) {
                const subjectNames = subjectsForDay.map(subjectObj => subjectObj.subject);
                
                // Verifica si la materia que estás agregando ya existe en el diccionario
                if (subjectNames.includes(subject)) {
                    // La materia ya existe, realiza la lógica que necesites en este caso
                    return;
                }
            }
            
        }


        newObject[days[day]].push({"subject": subject, "allCourses": []})

        setDaysWithSubjects(newObject)

        //Making courses copies
        const newCourses = [...courses]

        newCourses.forEach((courseElement) => {
            if(!courseElement["subjectsDay"]) {
                courseElement["subjectsDay"] = newObject //Refers to the daysWithSubject variable
            } else {
                courseElement["subjectsDay"] = newObject
            }
        })

        //Update courses globally
        setCourses(newCourses)
        
        /* console.log(`Materia "${subject}" asignada a ${day}`); */
    }

    useEffect(() => {
        if(courses.length > 0) {
            const firstCourse = courses[0]
            if(firstCourse["subjectsDay"]) {
                setDaysWithSubjects(firstCourse["subjectsDay"])
            }
        }
    }, [])

    //Logic for deleting a subject from a day
    const deletingSubjectFromDay = (subject, day, subjectsInDayArr) => {
        
        /* console.log(subjectsInDayArr); */
        subjectsInDayArr = subjectsInDayArr.filter(subjectWithCourses =>
            subjectWithCourses !== subject
        )

        daysWithSubjects[day] = subjectsInDayArr

        if(courses) {
            const newCourses = [...courses]
            newCourses.forEach((course) => {
                course.subjectsDay = daysWithSubjects
            })
            setCourses(newCourses)
        }
    }

    const setDeleteCourseFromSubjectData = (subject, day) => {
        const subjectData = {"subjectData": subject, "day": day}

        setSelectedSubjectData(subjectData)
    }

    const deleteCourseFromSubject = (subjectInfo, indexCourseToDelete) => {
        const currentDay = days[subjectInfo.day]

        const daysWithSubjectsCopy = {...daysWithSubjects}

        daysWithSubjectsCopy[currentDay].forEach((subjectWithCourses) => {
            if(subjectWithCourses.subject === subjectInfo.subjectData.subject) {
                    subjectWithCourses.allCourses.splice(indexCourseToDelete, 1)
            }
        })

        const coursesCopy = [...courses]

        coursesCopy.forEach((course) => {
            course.subjectsDay = daysWithSubjectsCopy
        })

        
        //Saving data to each course
        setDaysWithSubjects(daysWithSubjectsCopy)
        setCourses(coursesCopy)
    }

    return (
        <div className={`absolute flex flex-col justify-center z-10 items-center top-0 left-0 h-full w-full`}>
            <div className={`${wantToDeleteCourseFromSubject ? 'blur-sm pointer-events-none' : 'blur-none pointer-events-auto'} bg-white border border-black w-[95%] h-[95vh] p-2 rounded-lg relative overflow-y-auto overflow-x-hidden`}>
                <div className="pt-2 h-full">
                    <div className="relative flex justify-between text-center border-b-2">
                        
                        <div className="w-[7rem] h-[2rem] bg-red-400 rounded-lg flex items-center justify-center text-white hover:text-black">
                            <button onClick={() => setWantToEditSchedule(!wantToEditSchedule)} className="w-full p-4">Salir</button>
                        </div>

                        <p className="font-light text-2xl mr-4 mb-4"><span className="font-semibold">GESTIÓN DE HORARIO</span></p>

                        <div>
                            <h3 className="text-xl">Docente: <span className="font-semibold text-lg">{user?.displayName}</span></h3>
                        </div>
                    </div>

                    <div className="text-center space-y-4 pt-4">
                        <div className="w-full flex ">

                        <div 
                            className="bg-black xs:w-[35%] sm:w-[20%] mr-2 rounded-lg"    
                        >
                                <div className="h-[50%] overflow-y-auto scrollbar-hide border-b-2 border-white">
                                    <p className="text-white">Materias</p>
                                    { courses?.length > 0 ? (
                                        courses[0].subjects.map((subject, index) => (
                                            <div 
                                                key={index}
                                                className="mb-6 bg-gray-100 rounded-lg m-2 cursor-pointer hover:bg-slate-50"
                                                draggable="true"
                                                onDragStart={(e) => handleDragStart(e, subject)}
                                            >
                                                <p className="text-sm p-2">{subject}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No tienes materias</p>
                                    )
                                    
                                    }
                                </div>

                                <div className="bg-black  h-[50%] overflow-y-auto scrollbar-hide rounded-lg">
                                    <div className="max-h-[20px]">
                                        <p className="text-white">Cursos</p>
                                        { courses?.length > 0 ? (
                                            courses.map((course, index) => (
                                                <div 
                                                    key={index}
                                                    className="mb-6 bg-gray-100 rounded-lg m-2 cursor-pointer hover:bg-slate-50"
                                                    draggable="true"
                                                    onDragStart={(e) => handleDragStartCourse(e, course.name)}
                                                >
                                                    <p className="text-sm p-2">{course?.name}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No tienes cursos</p>
                                        )
                                        
                                        }
                                    </div>
                                </div>

                            </div>

                            <div 
                                className=" rounded-lg border-black w-[80%]"
                            >
                                {daysWithSubjects ? (
                                    Object.keys(days).map((day, dayIndex) => (
                                        <div
                                            onDrop={(e) => handleDrop(e, day)}
                                            onDragOver={(e) => handleDragOver(e)}
                                            key={dayIndex}
                                        >

                                            <p className="text-left m-2 border-b border-black">{day}</p>
                                            <div className="border-b-2 gap-4 border-black h-[auto] p-2 flex flex-wrap justify-center items-center text-sm">

                                                {daysWithSubjects[dayIndex + 1].length > 0 ? (
                                                    daysWithSubjects[dayIndex + 1].map((subject, index) => {
                                                        return(
                                                            <div className="relative" key={index}>
                                                                <div
                                                                    className="bg-black text-white border-black border p-2 px-5 rounded-lg cursor-pointer hover:bg-gray-600"
                                                                    onClick={() => {
                                                                        setDeleteCourseFromSubjectData(subject, day)
                                                                        setWantToDeleteCourseFromSubject(true)
                                                                    }}
                                                                    onDrop={(e) => handleDropCourse(e, subject.subject, day)}
                                                                    onDragOver={(e) => handleDragOver(e)}
                                                                >
                                                                    {subject.subject}
    
                                                                    <p>Cursos: <span>{subject.allCourses.join(', ')}</span></p>
                                                                </div>
    
                                                                <div 
                                                                    className="absolute top-1 right-1 text-white  hover:text-red-500 cursor-pointer"
                                                                    onClick={() => deletingSubjectFromDay(subject, dayIndex + 1, daysWithSubjects[dayIndex + 1])}    
                                                                >
                                                                    <HiX></HiX>
                                                                </div>
    
                                                            </div>
                                                        )
                                                    })
                                                ) : (
                                                    <p className="min-h-[50px]">
                                                        Suelta aquí tus materias
                                                    </p>
                                                )}

                                            </div>

                                        </div>
                                    ))

                                ) : (
                                    <p className="min-h-[50px]">
                                        WOW SOMETHING WENT WRONG
                                    </p>
                                )
                                
                                }

                            </div>

                        </div>

                    </div>

                </div>
            </div>
            
            <div className={`${wantToDeleteCourseFromSubject ? 'visible' : 'invisible'} absolute w-[90%] h-[70vh] bg-white rounded-lg border-2 border-black`}>

                <div className="m-2">
                    
                    <div className="text-sm text-center sm:text-lg">
                        <div className="flex justify-between items-center mb-4 border-b-2 border-gray-200">
                        
                        <button 
                            className="bg-red-400 w-[100px] p-1 rounded-lg hover:text-white"
                            onClick={() => setWantToDeleteCourseFromSubject(false)}
                        >
                            Salir
                        </button>
                        

                            <p>Día: <span className="font-bold">{selectedSubjectData?.day}</span></p>
                                
                            <p>Materia: <span className="font-bold">{selectedSubjectData?.subjectData?.subject}</span></p>
                        </div>

                        <div className="min-h-[300px]">
                            <p>Cursos: </p>
                            
                            <div className="flex flex-wrap justify-center w-full">
                                {selectedSubjectData?.subjectData?.allCourses.map((course, index) => {
                                    return(
                                        <div key={index} className="flex relative justify-center items-center border-4 border-blue-400 p-4 m-6 overflow-auto cursor-pointer hover:bg-blue-200">
                                                <div 
                                                    className="absolute top-0 right-0 hover:text-red-600"
                                                    onClick={() => ''}
                                                >
                                                    <HiTrash 
                                                        className="w-4 h-4 text"
                                                        onClick={() => deleteCourseFromSubject(selectedSubjectData, index)}

                                                    />
                                                </div>
                                                <p>{course}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export {
    EditScheduleWindow
}