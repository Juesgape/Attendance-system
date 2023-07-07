import { useState, useEffect } from "react";

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
                        estudiante faltó con las siguientes excusas:
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

export {
    MonthsExcuseCards
}