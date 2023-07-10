import { useEffect, useState } from "react"
import { CoursesContext } from "../../context/CoursesContext"
import {HiXCircle, HiClipboardCheck} from 'react-icons/hi'
import { MonthsAbsenceCards } from "./MonthsAbsenceCards"
import { MonthsExcuseCards } from "./MonthsExcuseCards"

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
        <div className={`${displayStudentStatistics ? 'visible' : 'invisible'} absolute flex flex-col justify-center items-center top-0 left-0 min-h-full w-full my-5`}>
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
                                    <MonthsAbsenceCards student={displayCurrentStudent} />
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