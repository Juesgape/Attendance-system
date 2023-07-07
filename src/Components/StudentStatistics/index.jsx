import { useEffect, useState } from "react"
import { CoursesContext } from "../../context/CoursesContext"
import {HiXCircle, HiClipboardCheck} from 'react-icons/hi'


const MonthsExcuseCards = ({student}) => {
    const [currentMonth, setCurrentMonth] = useState('')
    const [excuseFormonth, setExcuseForMonth] = useState({})

    const updateExcusesString = (month) => {
        const studentExcuses = student.excuses[month];
        if (studentExcuses) {
            setExcuseForMonth(studentExcuses)
            setCurrentMonth(month);
        } else {
            setCurrentMonth('');
            setExcuseForMonth({})
        }
    };
    
    useEffect(() => {
        setCurrentMonth('');
        setExcuseForMonth({})
    }, [student.excuses]);

    return(
        <div>
            <div>
                <div className="flex justify-evenly flex-wrap max-w-[400px] gap-3">
                    {
                        Object.keys(student.excuses).map((month, index) => 
                            <div 
                                key={index} 
                                className="rounded-lg uppercase flex items-center justify-center w-[5rem] mb-2 mt-2 border border-black cursor-pointer bg-blue-400 text-white hover:text-black"
                                onClick={() => {
                                    updateExcusesString(month)
                                }}
                                >
                                <p className="text-xl m-1">{month}</p>
                            </div>
                        )
                    }
                </div>
                <div className="flex flex-col justify-center items-center mb-8 mt-4">
                {currentMonth !== '' && (
                    <div>
                        <p>
                        En el mes de{' '}
                            <span className="uppercase font-semibold">{currentMonth}</span> el
                        estudiante tuvo las siguientes excusas:
                        </p>
                        <div className="flex flex-col justify-center items-center mt-2">
                            <div className="w-[350px] flex flex-wrap items-center justify-evenly">
                                {
                                    Object.entries(excuseFormonth).map(([date, excuse], index) => 
                                        <div key={index}>
                                            <div className="text-center border border-black rounded-lg p-2">
                                                <p className="font-bold">{date}</p>
                                                <p>{excuse}</p>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                )}
                    
                </div>
            </div>
        </div>
    )
}

const MonthsCards = ({student}) => {
    const [currentMonth, setCurrentMonth] = useState('')
    const [absencesForMonth, setAbsencesForMonth] = useState([])

    const updateAbsencesForMonth = (month) => {
        const absencesForThisMonth = student.totalAbsences[month]
        if(absencesForThisMonth) {
            setAbsencesForMonth(absencesForThisMonth)
            setCurrentMonth(month)
        } else {
            setAbsencesForMonth([])
            setCurrentMonth('')
        }
    }
    
    useEffect(() => {
        setAbsencesForMonth([]);
        setCurrentMonth('');
    }, [student]);

    return(
        <div>
            <div>
                <div className="flex justify-evenly flex-wrap max-w-[400px] gap-3">
                    {
                        Object.keys(student.totalAbsences).map((month, index) => 
                            <div 
                                key={index} 
                                className="rounded-lg uppercase flex items-center justify-center w-[4rem] mb-2 mt-2 border border-black cursor-pointer bg-red-400 hover:text-white"
                                onClick={() => {
                                    updateAbsencesForMonth(month)
                                }}
                                >
                                <p className="text-xl m-1">{month}</p>
                            </div>
                        )
                    }
                </div>
                <div className="mb-8">
                {currentMonth !== '' && (
                    <div className="mt-4">
                        <p>
                        En el mes de{' '}
                            <span className="uppercase font-semibold">{currentMonth}</span> el
                        estudiante faltó los siguientes días:
                        </p>
                        <div className="flex justify-evenly">
                            {
                                absencesForMonth.map((monthDay, index) => 
                                    <div className="mt-4" key={index}>
                                        <div className="text-center border border-black bg-gray-200 rounded-lg p-2">
                                            <p className="font-bold">{monthDay}</p>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )}
                    
                </div>
            </div>
        </div>
    )
}

const StudentStatistics = () => {
    // Display student data when solicited and set current student
    const { displayStudentStatistics, setDisplayStudentsStatistics, displayCurrentStudent } = CoursesContext();

    if (!displayCurrentStudent) {
        return (
          <div></div> // Return a suitable fallback component if displayCurrentStudent or totalAbsences and excuses are empty or undefined
        );
    }
    
    const hasAbsences = displayCurrentStudent?.totalAbsences && Object.keys(displayCurrentStudent.totalAbsences).length > 0
    const hasExcuses =  displayCurrentStudent?.excuses && Object.keys(displayCurrentStudent.excuses).length > 0

    return (
        <div className={`${displayStudentStatistics ? 'visible' : 'invisible'} absolute flex flex-col justify-center items-center top-0 left-0 h-full w-full`}>
            <div className="bg-white border border-black min-w-[400px] min-h-[400px] p-2 rounded-lg">
                <div className="flex justify-between items-center border-b-2">
                    <p className="font-light mr-4">Estudiante: <span className="font-semibold">{displayCurrentStudent.name}</span></p>
                    <HiXCircle className="w-8 h-8 cursor-pointer hover:text-blue-400" onClick={() => { setDisplayStudentsStatistics(!displayStudentStatistics) }}></HiXCircle>
                </div>
                <div className="pt-2 h-full">
                    {hasAbsences || hasExcuses ? (
                        <div className="w-full h-full">

                            {hasAbsences && (
                                <div className="border-b-2">
                                    <p className="font-light">Fallas:</p>
                                    <MonthsCards student={displayCurrentStudent} />
                                </div>
                            )}

                            {hasExcuses && (
                                <div className="border-b-2 mt-2">
                                    <p className="font-light mb-2">Excusas:</p>
                                    <MonthsExcuseCards student={displayCurrentStudent} />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="w-full h-full flex flex-col justify-center items-center">
                            <p className="text-xl">No hay fallas ni excusas</p>
                            <HiClipboardCheck className="mt-8 h-[5rem] w-[5rem]" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export {
    StudentStatistics
}