import { Cell } from "./Cell";
import { StudentStatistics } from "../StudentStatistics";
import { DeleteWindow } from "../DeleteStudentWindow";
import { ModifyStudentWindow } from "../ModifyStudentWindow";
import { AddStudentWindow } from "../AddStudentWindow";

const ListTables = ({students}) => {

    return(
        <div>
            <table className='border-collapse border border-slate-500'>
                <thead className='sticky top-0'>
                    <tr>
                        <th className='border border-black bg-slate-600 text-white'>N°</th>
                        <th className='border border-black bg-slate-600 text-white'>Nombre</th>
                        <th className='border border-black bg-slate-600 text-white'>Falla</th>
                        <th className='border border-black bg-slate-600 text-white'>Fallas este mes</th>
                        <th className='border border-black bg-slate-600 text-white'>Excusa</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) =>
                        <tr key={index}>
                            <td className="border w-[2rem] text-center border-slate-700">{student.id + 1}</td>
                            <Cell student={student}/>
                        </tr>
                    )}
                </tbody>
            </table>

            <StudentStatistics></StudentStatistics>
            <DeleteWindow></DeleteWindow>
            <ModifyStudentWindow></ModifyStudentWindow>
            <AddStudentWindow></AddStudentWindow>
        </div>
    )
}

export {
    ListTables
}