import React, { useState, useEffect } from "react";
import PaymentCheckout from "./paymentCheckout";
import ImageLightboxViewer from "./ImageLightboxViewer";
import CloseIcon from '@mui/icons-material/Close';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { categoryOptions } from "../../../utils";

const ProductCard = ({ product }) => {
  const { name, description, category, imagesUrls, price } = product;
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [showDescModal, setShowDescModal] = useState(false);

  useEffect(() => {
    if (showDescModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showDescModal]);

  return (
    <>
      <div className="border border-gray-300 rounded-lg w-64 text-center shadow hover:shadow-lg flex flex-col justify-between space-y-2 transition-all duration-200">

      <div>
        <div className="relative">
          {imagesUrls?.length > 0 ? (
            <>
              <img
                src={imagesUrls[0].fileUrl}
                alt={name}
                className="w-full h-40 object-cover rounded-t-lg"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setIsLightboxOpen(true);
                  setPhotoIndex(0);
                }}
              />
              <button
                type="button"
                className="absolute top-2 right-2 bg-black/20 hover:bg-black/40 rounded p-1 transition-colors"
                style={{ border: 'none' }}
                onClick={e => {
                  e.stopPropagation();
                  setIsLightboxOpen(true);
                  setPhotoIndex(0);
                }}
                title="Ver galería"
              >
                <PhotoLibraryIcon style={{ color: 'white', fontSize: 24 }} />
              </button>
            </>
          ) : (
            <div className="w-full h-40 bg-gray-200 rounded-t-lg flex items-center justify-center text-sm text-gray-500">
              Sin Imagen
            </div>
          )}
          <ImageLightboxViewer
            imagesUrls={imagesUrls}
            isOpen={isLightboxOpen}
            onClose={() => setIsLightboxOpen(false)}
            photoIndex={photoIndex}
            setPhotoIndex={setPhotoIndex}
            imgAlt={name}
          />
        </div>
        <div className="px-4">
          <h2 className="text-lg font-semibold mt-3 text-gray-800">{name}</h2>
          <button
            type="button"
            className="mt-2 text-sm text-primary underline hover:text-secondary focus:outline-none"
            onClick={() => setShowDescModal(true)}
          >
            Ver descripción
          </button>
          {category && (
            <p className="text-xs text-gray-500 mt-2">
              <span className="font-medium text-primary">Categoría:</span> {category}
            </p>
          )}
        </div>
      </div>
      <div className="px-4 pb-3 grid space-y-2">
        {product.discount && product.discount.priceWithDiscount > 0 ? (
  <div className="flex flex-col items-center">
    <span className="text-base text-gray-400 line-through">${price ? price.toLocaleString('es-AR', {minimumFractionDigits: 0, maximumFractionDigits: 0}) : '-'}</span>
    <span className="text-lg font-bold text-tertiary">${product.discount.priceWithDiscount.toLocaleString('es-AR', {minimumFractionDigits: 0, maximumFractionDigits: 0})}</span>
    <span className="text-xs text-primary">-{product.discount.discountPercentage}%</span>
  </div>
) : (
  <p className="text-lg font-bold text-tertiary">${price ? price.toLocaleString('es-AR', {minimumFractionDigits: 0, maximumFractionDigits: 0}) : '-'}</p>
)}
<PaymentCheckout title={name} unitPrice={product.discount && product.discount.priceWithDiscount > 0 ? product.discount.priceWithDiscount : price} quantity={1} disabled={false} />
      </div>
    </div>

      {/* Modal para la descripción */}
      {showDescModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          onClick={() => setShowDescModal(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative max-h-[80vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 bg-gray-500 hover:bg-gray-700 text-white rounded-full w-6 flex justify-center items-center h-6 p-1 text-xl"
              onClick={() => setShowDescModal(false)}
              aria-label="Cerrar"
            >
              <CloseIcon />
            </button>
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Descripción</h3>
            <p className="text-gray-700 whitespace-pre-line">{description || 'Sin descripción'}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
