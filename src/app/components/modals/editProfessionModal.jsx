import React, { useState, useEffect, useContext } from "react"
import CommonInput from "../commonInput"
import CommonLabel from "../commonLabel";
import CommonTextarea from "../commonTextArea";

export default function EditProfessionModal(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const buttonDisabled = (name === '');

    const handleCreateProfession = () => {
        props.isDisabled(buttonDisabled);
        const professionData = {
            name, 
            description
        };
        props.onCreateProfession(professionData);
    }

    useEffect(() => {
        handleCreateProfession();
    }, [name, description]);

    useEffect(() => {
        if (props.professionToEdit) {
            setName(props.professionToEdit.name || '');
            setDescription(props.professionToEdit.description || '');
        }
    }, []);

    return (
        <div className="bg-white px-7 md:px-14 py-5">
            <div className="mb-4">
                <CommonLabel label="Nombre" />
                <CommonInput    
                    value={name}
                    name="name"
                    htmlFor="name"
                    id="name"
                    type="text" 
                    placeholder="Nombre de la especialidad"
                    inputClassName="w-full"
                    onChange={(e) => setName(e.target.value)}
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
        </div>
    )
}
