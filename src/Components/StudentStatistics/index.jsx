import { useEffect, useState } from "react"
import { CoursesContext } from "../../context/CoursesContext"
import {HiXCircle, HiClipboardCheck} from 'react-icons/hi'


const MonthsExcuseCards = ({student}) => {
    const [excusesString, setExcusesString] = useState('')
    const [currentMonth, setCurrentMonth] = useState('')

    const updateExcusesString = (month) => {
        const excusesForMonth = student.excuses[month];
        if (excusesForMonth) {
            const formattedExcuses = Object.entries(excusesForMonth)
                .map(([date, excuse]) => `${date}: ${excuse}`)
                .join(', ');
        
            setExcusesString(formattedExcuses);
            setCurrentMonth(month);
        } else {
            setExcusesString('');
            setCurrentMonth('');
        }
    };
    
    useEffect(() => {
        setExcusesString('');
        setCurrentMonth('');
    }, [student.excuses]);

    return(
        <div>
            <div>
                <div className="flex flex-wrap max-w-[400px] gap-3">
                    {
                        Object.keys(student.excuses).map((month, index) => 
                            <div 
                                key={index} 
                                className="rounded-lg flex items-center justify-center w-[4rem] mb-2 mt-2 border border-black cursor-pointer bg-black text-white hover:bg-green-400 hover:text-black"
                                onClick={() => {
                                    updateExcusesString(month)
                                }}
                                >
                                <p className="text-xl m-1">{month}</p>
                            </div>
                        )
                    }
                </div>
                <div className="flex flex-col justify-center items-center">
                {currentMonth !== '' && (
                    <div>
                        <p>
                        En el mes de{' '}
                            <span className="uppercase font-semibold">{currentMonth}</span> el
                        estudiante tuvo las siguientes excusas:
                        </p>
                        <div className="flex flex-col justify-center items-center mt-2">
                            <div className="w-[350px]">
                                <span>{excusesString}</span>
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
    const [absencesString, setAbsencesString] = useState('')
    const [currentMonth, setCurrentMonth] = useState('')

    const updateAbsencesString = (month) => {
        setAbsencesString(student.totalAbsences[month].join(', '));
        setCurrentMonth(month);
    };
    
    useEffect(() => {
        setAbsencesString('');
        setCurrentMonth('');
    }, [student]);

    return(
        <div>
            <div>
                <div className="flex flex-wrap max-w-[400px] gap-3">
                    {
                        Object.keys(student.totalAbsences).map((month, index) => 
                            <div 
                                key={index} 
                                className="rounded-lg flex items-center justify-center w-[4rem] mb-2 mt-2 border border-black cursor-pointer bg-black text-white hover:bg-green-400 hover:text-black"
                                onClick={() => {
                                    updateAbsencesString(month)
                                }}
                                >
                                <p className="text-xl m-1">{month}</p>
                            </div>
                        )
                    }
                </div>
                <div>
                {currentMonth !== '' && (
                    <div>
                        <p>
                        En el mes de{' '}
                            <span className="uppercase font-semibold">{currentMonth}</span> el
                        estudiante faltó los siguientes días:
                        </p>
                        <span>{absencesString}</span>
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
                                <div className="border-b-2">
                                    <p className="font-light">Excusas:</p>
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