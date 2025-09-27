import React, { useState, useEffect, useContext } from "react"
import CommonInput from "../commonInput"
import CommonLabel from "../commonLabel";
import CommonTextarea from "../commonTextArea";

export default function CreateDistributor(props) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const buttonDisabled = (name === '');

    const handleCreateDistributor = () => {
        props.isDisabled(buttonDisabled);
        const distributor = {
            name, 
            description
        };
        props.onCreateDistributor(distributor);
    }

    useEffect(() => {
        handleCreateDistributor();
    }, [name, description]);

    return (
        <div>
            <div className="mb-4">
                <CommonLabel label="Nombre" />
                <CommonInput    
                    value={name}
                    name="name"
                    htmlFor="name"
                    id="name"
                    type="text" 
                    placeholder="Nombre del proveedor"
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
