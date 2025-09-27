import React, { useState, useEffect, useContext } from "react"
import CommonInput from "../commonInput"
import CommonLabel from "../commonLabel";
import Select from "react-select";
import CommonTextarea from "../commonTextArea";

export default function CreateTask(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedUser, setSelectedUser] = useState({});
    const [selectedCategory, setSelectedCategory] = useState({});

    const buttonDisabled = (title === '') || !selectedCategory.label || !selectedUser.label;

    const handleCreateTask = () => {
        props.isDisabled(buttonDisabled);
        const task = {
            title, 
            description,
            assignedTo: selectedUser.value,
            category: selectedCategory.value,
            status: 'pending'
        };
        props.onCreateTask(task);
    }

    useEffect(() => {
        handleCreateTask();
    }, [title, description, selectedUser, selectedCategory]);

    return (
        <div className="bg-white px-7 md:px-14 py-5">
            <div className="mb-4">
                <CommonLabel label="Título" />
                <CommonInput    
                    value={title}
                    name="title"
                    htmlFor="title"
                    id="title"
                    type="text" 
                    placeholder="Título de la tarea"
                    inputClassName="w-full"
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <CommonLabel label="Descripción" />
                <CommonTextarea
                    id="description"
                    placeholder="Descripción..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="mb-4 text-gray-700">
                <CommonLabel label="Categoría" />        
                <Select
                    onChange={(selectedOption) => setSelectedCategory(selectedOption)}
                    value={selectedCategory}
                    options={props.categories}
                    placeholder="Seleccionar categoría"
                />
            </div>
            <div className="mb-4 text-gray-700">
                <CommonLabel label="Asignar a" />        
                <Select
                    onChange={(selectedOption) => setSelectedUser(selectedOption)}
                    value={selectedUser}
                    options={props.users}
                    placeholder="Seleccionar usuario"
                />            
            </div>
        </div>
    )
}
