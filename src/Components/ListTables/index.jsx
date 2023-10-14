import { Cell } from "./Cell";
import { StudentStatistics } from "../StudentStatistics";
import { DeleteWindow } from "../DeleteStudentWindow";
import { ModifyStudentWindow } from "../ModifyStudentWindow";
import { AddStudentWindow } from "../AddStudentWindow";
import { CoursesContext } from "../../context/CoursesContext";
import { GeneralReport } from "../GeneralReport";
import { CustomAlert } from "../CustomAlert/inde";

const ListTables = ({students}) => {

    const { displayStudentStatistics, 
            wantToDeleteStudent,
            wantToEditStudent,
            wantToAddNewStudent,
            seeGeneralReport,
            seeCustomAlert
    } = CoursesContext()

    return(
        <div>
            <table className={
                `${displayStudentStatistics || wantToAddNewStudent || wantToDeleteStudent || wantToEditStudent || seeGeneralReport ? 'blur-sm' : 'blur-none'} 
                border-collapse border border-slate-500 m-2`
                }>
                
                <thead className='sticky top-0 text-sm sm:text-base'>
                    <tr>
                        <th className='border border-black bg-slate-600 text-white text-sm sm:text-base'>N°</th>
                        <th className='border border-black bg-slate-600 text-white'>Nombre</th>
                        <th className='border border-black bg-slate-600 text-white w-[5rem]'>Falla</th>
                        <th className='border border-black bg-slate-600 text-white w-[8rem]'>Fallas este mes</th>
                        <th className='border border-black bg-slate-600 text-white'>Excusa</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) =>
                        <tr key={index}>
                            <td className="border w-[2rem] text-sm sm:text-base text-center border-slate-700">{student.id + 1}</td>
                            <Cell student={student}/>
                        </tr>
                    )}
                </tbody>
            </table>

            <StudentStatistics></StudentStatistics>
            <DeleteWindow></DeleteWindow>
            <ModifyStudentWindow></ModifyStudentWindow>
            <AddStudentWindow></AddStudentWindow>
            <GeneralReport></GeneralReport>
            <CustomAlert></CustomAlert>
        </div>
    )
}

export {
    ListTables
}