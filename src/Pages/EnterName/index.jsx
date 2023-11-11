import { useState } from "react";
import { CoursesContext } from "../../context/CoursesContext";

const EnterName = () => {
    const {currentCourse} = CoursesContext()
    
    const [name, setName] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    return (
        <div>
            <label htmlFor="nameInput" className="">Enter your name:</label>
            <input 
                id="nameInput"
                type="text" 
                value={name} 
                onChange={handleNameChange} 
                className="border border-black rounded-lg w-[16rem] p-2 pr-10 "
                />

            <button 
                className="bg-blue-400 p-3 rounded-lg hover:text-white"
                onClick={() => {
                    
                }}
            >
                Añadir estudiante
            </button>
        </div>
    );
};

export default EnterName;