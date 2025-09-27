import React, { useState, useEffect } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import Loader from "./loader";

/**
 * Componente reutilizable para visualizar imágenes en modo lightbox.
 * @param {Array} imagesUrls - Array de objetos con { fileUrl }
 */
const ImageLightboxViewer = ({ imagesUrls = [], isOpen, onClose, photoIndex, setPhotoIndex, imgAlt = "Imagen" }) => {
  if (!imagesUrls.length || !isOpen) return null;
  const slides = imagesUrls.map(img => ({ src: img.fileUrl, alt: imgAlt }));

  return (
    <Lightbox
      open={isOpen}
      close={onClose}
      slides={slides}
      index={photoIndex}
      plugins={[Zoom, Thumbnails]}
      render={{
        iconLoading: () => <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%'}}><Loader text="Cargando imagen..." /></div>,
        toolbar: ({ toolbar }) => (
          <div className="lightbox-header-tailwind relative flex items-center justify-center h-16 md:h-20">
            <span className="hidden md:inline-block font-thin tracking-widest text-2xl text-white absolute left-1/2 top-1/2" style={{transform:'translate(-50%,-50%)',letterSpacing:'0.2em'}}>NUTRIFE</span>
            {toolbar}
          </div>
        ),
        // Fondo translúcido sobre el área fuera de la imagen
        mask: ({ children, ...props }) => (
          <div {...props} style={{background:'rgba(72,169,166,0.82)',backdropFilter:'blur(4px)',width:'100vw',height:'100vh',position:'fixed',zIndex:99}}>{children}</div>
        ),
      }}
      on={{
        view: ({ index }) => setPhotoIndex(index)
      }}
    />
  );
};

export default ImageLightboxViewer;
