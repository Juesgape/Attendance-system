import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiTrash } from 'react-icons/hi'
import { CoursesContext } from '../../context/CoursesContext'

const GradeCard = ({id, gradeName, teacher}) => {
    const { courses, 
            setCourses,
            setCurrentCourse,
            setWantToDeleteCourse,
            setCourseToDelete
        } = CoursesContext()

    const navigate = useNavigate()

    const deleteCourse = (event, courseId) => {
        event.stopPropagation()
        setCourseToDelete(findCourse(courseId))
        setWantToDeleteCourse(true)
    }

    const findCourseClicked = (courseId) => {
        const options = { dateStyle: 'short', timeStyle: 'short' }
        const currentDateTime = new Date().toLocaleString(undefined, options)
        //Finding the course by id
        const course = findCourse(courseId)
        if(course) {
            //Modified the lastModified attribute on course
            course.lastModified = currentDateTime
            setCurrentCourse(course);
            navigate('/list')
        }
    }

    //Find course just to show some info in the component
    const findCourse = (id) => {
        const courseFound = courses.find((course, index) => course.id === id)
        return courseFound
    }

    console.log(courses);

    return(
        <div 
            onClick={() => findCourseClicked(id)}
            className="bg-gray-100 w-[500px]  px-4 py-8 rounded-lg cursor-pointer border border-black">

            <div className="flex justify-between">
                <div>
                    <h3 className='text-2xl'>{gradeName ? gradeName : 'Grade 5b'}</h3>
                    <p className='mt-1'>Titular: <span className='font-light'>{teacher ? teacher : 'Teacher'}</span></p>
                </div>
                <div>
                    <HiTrash 
                        onClick={(event) => deleteCourse(event, id)} 
                        className='w-6 h-6 hover:text-red-600'
                    />
                </div>
            </div>

            <div className="flex justify-between mt-8">
                <div>
                    <p>Última modificación: <span className='font-light'>{findCourse(id)?.lastModified ? findCourse(id)?.lastModified : '00:00'}</span></p>
                </div>
                <div>
                    <p>Total estudiantes: <span className='font-light'>{findCourse(id)?.totalStudents ? findCourse(id)?.totalStudents : '0'}</span></p>
                </div>
            </div>

        </div>
    )
}

export {
    GradeCard
}