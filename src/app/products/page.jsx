"use client";
import React, { useState, useEffect, useContext, useMemo, Suspense } from "react";
import Select from 'react-select';
import ProductCard from "../components/productCard";
import Loader from "../components/loader";
import WebTitle from "../components/webTitle";
import WebContainer from "../components/webContainer";
import visitsService from "../services/statsService";
import productService from "../services/productService";
import { Context } from "../context/Context";
import { categoryOptions, tableCustomStyles } from "../../../utils";
import TableActionButton from "../components/tableActionButton";
import NoResults from "../components/noResult";
import Table from "../components/table";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useSearchParams } from "next/navigation";

function ProductsContent() {
  const searchParams = useSearchParams();
  const category = searchParams?.get('category') || '';
  
  // Listado global y filtrado
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({ value: 'all', label: 'Todos' });
  const [loading, setLoading] = useState(true);
  const { changeAlertStatusAndMessage, accessToken, setAccessToken } = useContext(Context);  

  const getProducts = async () => {
    setLoading(true);
    try{
      const response = await productService.getProducts();
      setAllProducts(response);
      setFilteredProducts(response);
    }catch(err){
      console.log(err);
      changeAlertStatusAndMessage(true, 'error', 'Los productos no han podido ser obtenidos... Por favor recargue la página.')
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const updateVisits = async () => {
      const body = { page: window.location.pathname + window.location.search };
      await visitsService.addVisit(body);
    }
    updateVisits();
    getProducts();
  }, [])

  function capitalizeFirstLetter(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Filtrar productos según categoría
  useEffect(() => {
    if (selectedCategory.value === 'all') {
      setFilteredProducts(allProducts);
    } else {
      setFilteredProducts(allProducts.filter(p => p.category === selectedCategory.value));
    }
  }, [selectedCategory, allProducts]);

  return (
    <WebContainer>
      <WebTitle text={category ? capitalizeFirstLetter(category) : "Productos"} />
      <div className="mb-8 w-64 md:w-72 mx-auto">
        <Select
          options={categoryOptions}
          value={selectedCategory}
          onChange={setSelectedCategory}
          isSearchable={false}
          classNamePrefix="react-select"
          placeholder="Filtrar por categoría"
          styles={{
            control: (provided) => ({
              ...provided,
              borderRadius: '0.5rem',
              borderColor: '#e2e8f0',
              '&:hover': {
                borderColor: '#cbd5e0',
              },
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isSelected ? '#4299e1' : state.isFocused ? '#ebf8ff' : 'white',
              color: state.isSelected ? 'white' : '#2d3748',
              '&:hover': {
                backgroundColor: state.isSelected ? '#3182ce' : '#ebf8ff',
                color: state.isSelected ? 'white' : '#2d3748',
              },
            }),
          }}
        />
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      )}
      
      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No se encontraron productos en esta categoría.</p>
        </div>
      )}
    </WebContainer>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <WebContainer>
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      </WebContainer>
    }>
      <ProductsContent />
    </Suspense>
  );
}
