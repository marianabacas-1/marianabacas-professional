"use client";
import { useState, useEffect } from 'react';
import { createPromotion, updatePromotion, deletePromotion } from '@/app/services/promotionService';
import { useAuth } from '@/app/contexts/AuthContext';

const PromotionModal = ({ promotion = null, onClose, onSave }) => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    text: '',
    icon: '🔥',
    endDate: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const icons = ['🔥', '⚡', '🎁', '💎', '🛒', '🚀', '💯', '✨'];

  useEffect(() => {
    if (promotion) {
      const endDate = new Date(promotion.endDate).toISOString().split('T')[0];
      setFormData({
        text: promotion.text,
        icon: promotion.icon,
        endDate,
      });
    }
  }, [promotion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.text || !formData.icon || !formData.endDate) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');

      if (promotion) {
        await updatePromotion(promotion._id, formData, token);
      } else {
        await createPromotion(formData, token);
      }
      
      onSave();
      onClose();
    } catch (err) {
      console.error('Error saving promotion:', err);
      setError('Error al guardar la promoción. Intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('¿Está seguro de que desea eliminar esta promoción?')) {
      try {
        setIsSubmitting(true);
        await deletePromotion(promotion._id, token);
        onSave();
        onClose();
      } catch (err) {
        console.error('Error deleting promotion:', err);
        setError('Error al eliminar la promoción');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {promotion ? 'Editar Promoción' : 'Nueva Promoción'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={isSubmitting}
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="text">
              Texto de la promoción
            </label>
            <input
              type="text"
              id="text"
              name="text"
              value={formData.text}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Ícono
            </label>
            <div className="flex flex-wrap gap-2">
              {icons.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  className={`text-2xl p-2 rounded-full ${
                    formData.icon === icon ? 'bg-blue-200' : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setFormData({ ...formData, icon })}
                  disabled={isSubmitting}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
              Fecha de finalización
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              disabled={isSubmitting}
            />
          </div>

          <div className="flex justify-between">
            <div>
              {promotion && (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                  disabled={isSubmitting}
                >
                  Eliminar
                </button>
              )}
            </div>
            <div>
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
                disabled={isSubmitting}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PromotionModal;
