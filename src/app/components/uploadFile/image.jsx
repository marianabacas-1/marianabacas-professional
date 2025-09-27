import React, { useState, useEffect } from 'react';
import CommonLabel from '../commonLabel';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';

export default function UploadImage({ uploadReady, onChangeFiles = () => {} }) {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = async (event) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setSelectedFiles(prevFiles => [...prevFiles, ...files]);
    } else {
      console.log("No se seleccionaron archivos");
    }
  };

  const deleteFile = (fileIndex) => {
    setSelectedFiles((prevItems) => prevItems.filter((_, i) => i !== fileIndex));
  }

  useEffect(() => {
    onChangeFiles(selectedFiles);
  }, [selectedFiles])
  
  useEffect(() => {
    if(uploadReady) setSelectedFiles([]);
  }, [uploadReady])
  
  return (
    <>
      <CommonLabel label="Subir imágen" />
      <label htmlFor="uploadFile"
        className="bg-white text-black text-base rounded w-full h-32 flex flex-col items-center justify-center cursor-pointer border-2 border-primary border-dashed mx-auto font-[sans-serif]">
        <CloudUploadIcon className="heartbeat" fontSize="large" />
          Subir imágen
        <input
          type="file"
          id="uploadFile"
          className="hidden"
          onChange={handleFileChange}
          accept=".jpg, .jpeg, .png, .svg, .webp"
          multiple
        />
        <p className="text-xs text-gray-400 mt-2">PNG, JPG,JPEG , SVG y WEBP.</p>
      </label>
      {selectedFiles.length > 0 && (<>
          <div className="my-4 w-full">
          <CommonLabel label="Archivos a subir" />
              {selectedFiles.map((file, index) => 
                  <div className="flex w-full justify-between my-2" key={index}>
                      <div className="text-primary">{file.name}</div>
                      <CloseIcon color='action' className="cursor-pointer bg-white rounded-full" onClick={() => deleteFile(index)}/>
                  </div>
              )}
          </div>
      </>)}
    </>
  );
}
