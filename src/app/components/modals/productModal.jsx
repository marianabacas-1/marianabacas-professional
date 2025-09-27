import React, { useState, useEffect } from "react"
import CommonInput from "../commonInput";
import CommonLabel from "../commonLabel";
import UploadImage from "../uploadFile/image";
import TableActionButton from "../tableActionButton";
import DeleteIcon from '@mui/icons-material/Delete';
import Select from 'react-select';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function ProductModal(props) {
    const [discountPercentage, setDiscountPercentage] = useState('');
    const [priceWithDiscount, setPriceWithDiscount] = useState(0);
    const [name, setName] = useState('');
    const [code, setCode] = useState(0);
    const [stock, setStock] = useState(0);
    const [distributor, setDistributor] = useState({ value: '', label: '' });
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState({ value: '', label: '' });
    const [imagesUrls, setImagesUrls] = useState([]);
    const [price, setPrice] = useState(0);
    const [cost, setCost] = useState(0);

    useEffect(() => {
        handleUpdateProduct();
    }, [name, code, description, category, imagesUrls, price, cost, discountPercentage, priceWithDiscount, distributor, stock]);

    const handleUpdateProduct = () => {
        const product = {
            name,
            code,
            description, 
            category: category.value, 
            imagesUrls,
            distributor: distributor.value,
            stock,
            price, 
            cost,
            discount: (
                discountPercentage !== '' &&
                priceWithDiscount !== '' &&
                !isNaN(discountPercentage) &&
                !isNaN(priceWithDiscount)
            ) ? {
                discountPercentage: Number(discountPercentage),
                priceWithDiscount: Number(priceWithDiscount)
            } : undefined
        };
        props.getProduct(product);
    }

    const markImageForDeletion = (index) => {
        const updatedImages = [...imagesUrls];
        updatedImages[index].markedForDeletion = true;
        setImagesUrls(updatedImages);
    };

    useEffect(() => {
        if (props.editMode && props.product) {
            setName(props.product.name);
            setCode(props.product.code);
            setPrice(props.product.price);
            setCost(props.product.cost);
            setStock(props.product.stock);
            setDistributor(props.distributorOptions?.find(option => option.value === props.product.distributor) || { value: '', label: '' });
            if(props.product.description) setDescription(props.product.description);
            if(props.product.category) setCategory(props.categoryOptions?.find(option => option.value === props.product.category) || { value: '', label: '' });
            if(props.product.imagesUrls) setImagesUrls(props.product.imagesUrls);
            if (props.product.discount) {
                if (props.product.discount.discountPercentage !== undefined && props.product.discount.discountPercentage !== null) {
                    setDiscountPercentage(props.product.discount.discountPercentage);
                }
                if (props.product.discount.priceWithDiscount !== undefined && props.product.discount.priceWithDiscount !== null) {
                    setPriceWithDiscount(props.product.discount.priceWithDiscount);
                }
            }
        }
    }, [props.categoryOptions, props.distributorOptions]);

    useEffect(() => {
        if (price && discountPercentage && !isNaN(price) && !isNaN(discountPercentage) && Number(discountPercentage) > 0) {
            const calculated = Math.round(Number(price) * (1 - Number(discountPercentage) / 100));
            setPriceWithDiscount(calculated);
        } else {
            setPriceWithDiscount('');
        }
    }, [price, discountPercentage]);

    return (
        <div>
            <div className="mb-4">
                <CommonLabel label="Nombre del producto" />
                <CommonInput    
                    value={name}
                    type="text" 
                    placeholder="Nombre del producto"
                    inputClassName="w-full"
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <CommonLabel label="Descripción del producto" />
                <CommonInput    
                    value={description}
                    type="text" 
                    placeholder="Nombre del producto"
                    inputClassName="w-full"
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <CommonLabel label="Categoría" />
                <Select
                    value={category}
                    onChange={setCategory}
                    options={props.categoryOptions}
                    placeholder="Seleccionar categoría"
                    className="w-full text-gray-700"
                />
            </div>
            <div className="mb-4">
                <CommonLabel label="Código" />
                <CommonInput    
                    value={code}
                    type="number" 
                    placeholder="Código"
                    inputClassName="w-full"
                    onChange={(e) => setCode(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <CommonLabel label="Precio al costo" />
                <CommonInput    
                    value={cost}
                    type="number" 
                    placeholder="Precio al costo"
                    inputClassName="w-full"
                    onChange={(e) => setCost(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <CommonLabel label="Precio de lista" />
                <CommonInput    
                    value={price}
                    type="number" 
                    placeholder="Precio de lista"
                    inputClassName="w-full"
                    onChange={(e) => setPrice(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <CommonLabel label="% Descuento" />
                <CommonInput
                    value={discountPercentage}
                    type="number"
                    placeholder="Porcentaje de descuento"
                    inputClassName="w-full"
                    min={0}
                    max={100}
                    onChange={e => setDiscountPercentage(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <CommonLabel label="Precio con descuento" />
                <CommonInput
                    value={priceWithDiscount}
                    type="number"
                    placeholder="Precio con descuento"
                    inputClassName="w-full bg-gray-100"
                    onChange={(e) => setPriceWithDiscount(e.target.value)}
                    readOnly
                />
            </div>
            <div className="mb-4">
                <CommonLabel label="Stock" />
                <CommonInput    
                    value={stock}
                    type="number" 
                    placeholder="Stock"
                    inputClassName="w-full"
                    onChange={(e) => setStock(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <CommonLabel label="Proveedor" />
                <Select    
                    value={distributor}
                    placeholder="Seleccionar proveedor"
                    className="w-full text-gray-700"
                    onChange={setDistributor}
                    options={props.distributorOptions}
                />
            </div>
            {imagesUrls?.some(file => file.fileName) && (
                <div>
                    <CommonLabel label="Archivos subidos" />
                    {imagesUrls
                        .filter(file => file.fileName && file.fileUrl)
                        .map((file, index) => (
                            <div key={index} className="flex w-full bg-gray-50 p-2 rounded justify-between my-1 border">
                                <div>
                                    <a
                                        target="_BLANK"
                                        href={file.fileUrl}
                                        className="underline text-primary text-lg"
                                    >
                                        {file.fileName}
                                    </a>
                                    {file.uploadDate && !isNaN(new Date(file.uploadDate)) && (
                                        <div className="text-gray-700">
                                            Subido el día:{" "}
                                            {new Intl.DateTimeFormat("es-AR").format(new Date(file.uploadDate))}
                                        </div>
                                    )}
                                </div>
                                {!file.markedForDeletion && (
                                    <TableActionButton
                                        onClick={() => markImageForDeletion(index)}
                                        tooltipText="Eliminar archivo"
                                        icon={<DeleteIcon color="error" />}
                                    />
                                )}
                                {file.markedForDeletion && (
                                    <TableActionButton
                                        onClick={() => {}}
                                        tooltipText="Marcado para eliminar"
                                        icon={<CheckCircleIcon color="success" />}
                                    />
                                )}
                            </div>
                    ))}
                </div>
            )}
            <div className="mb-4">
                <UploadImage onChangeFiles={(files) => setImagesUrls([...imagesUrls, ...files])} uploadReady={props.uploadReady}/>
            </div>
        </div>
    )
}
