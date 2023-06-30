import { useState } from 'react'
import {HiTrash} from 'react-icons/hi'
import { CoursesContext } from '../../context/CoursesContext'

const GradeCard = ({id, gradeName, teacher, lastModified, totalStudents}) => {
    const {courses, setCourses} = CoursesContext()

    const deleteCourse = (courseId) => {
        const updatedCourses = courses.filter((course, index) => index !== courseId);

        for(let i = 0; i < updatedCourses.length; i++) {
            courses[i].id = i
        }
        setCourses(updatedCourses)
    }

    return(
        <div className="bg-gray-100 w-[500px] px-4 py-8 rounded-lg cursor-pointer border border-black">

            <div className="flex justify-between">
                <div>
                    <h3 className='text-2xl'>{gradeName ? gradeName : 'Grade 5b'}</h3>
                    <p className='mt-1'>Titular: <span className='font-light'>{teacher ? teacher : 'Teacher'}</span></p>
                </div>
                <div>
                    <HiTrash 
                        onClick={() => deleteCourse(id)} 
                        className='w-6 h-6 hover:text-red-600'
                    />
                </div>
            </div>

            <div className="flex justify-between mt-8">
                <div>
                    <p>Última modificación: <span className='font-light'>{lastModified ? lastModified : '00:00'}</span></p>
                </div>
                <div>
                    <p>Total estudiantes: <span className='font-light'>{totalStudents ? totalStudents : '0'}</span></p>
                </div>
            </div>

        </div>
    )
}

export {
    GradeCard
}