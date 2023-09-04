import { CoursesContext } from "../../context/CoursesContext"

const CustomAlert = () => {
    const { seeCustomAlert, 
            messageAlert
    } = CoursesContext()

    return (
        <div className="absolute top-[50%] right-[35%] w-[400px] flex justify-center">
            {
                seeCustomAlert ? (
                    <div className="bg-red-500 rounded-lg p-4 m-auto text-white">
                        <p>{messageAlert}</p>
                    </div>
                ) : (
                    ''
                )
            }
        </div>
    )
}

export {
    CustomAlert
}