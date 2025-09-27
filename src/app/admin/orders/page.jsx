"use client";
import React, { useState, useEffect, useContext, useMemo } from "react";
import Select from 'react-select';
import ProductCard from "../../components/productCard";
import Loader from "../../components/loader";
import WebTitle from "../../components/webTitle";
import WebContainer from "../../components/webContainer";
import visitsService from "../../services/statsService";
import productService from "../../services/productService";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Context } from "../../context/Context";
import { categoryOptions, tableCustomStyles } from "../../../../utils";
import TableActionButton from "../../components/tableActionButton";
import NoResults from "../../components/noResult";
import Table from "../../components/table";
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import AddButton from '../../components/addButton';
import EditIcon from '@mui/icons-material/Edit';

export default function ProductsPage() {
  // Listado global y filtrado
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({ value: 'all', label: 'Todos' });
  const [tabValue, setTabValue] = useState('1');
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const { changeAlertStatusAndMessage, accessToken } = useContext(Context);  
  const router = useRouter();

  const handleChangeTabValue = (event, newValue) => {
    setTabValue(newValue);
  };

  const products = [
    {
      name: "Producto 1",
      description: "Descripción del producto 1",
      category: "categoria 1",
      imagesUrls: [
        {
          fileUrl: "/mi_celu.png"
        }
      ],
      price: 100
    },
    {
      name: "Producto 2",
      description: "Descripción del producto 2",
      category: "categoria 2",
      imagesUrls: [
        {
          fileUrl: "/mi_celu.png"
        }
      ],
      price: 200
    }
  ];

  const columns = useMemo(() => {
    const newColumns = [
      {
        name: 'Precio',
        sortable: true,
        searchable: true,
        selector: row => row.price,
        minWidth: '150px',
      },
      {
        name: 'Nombre',
        sortable: true,
        searchable: true,
        selector: row => row.name,
        //maxWidth: '80px'
      },
      {
        name: 'Categoría',
        sortable: true,
        searchable: true,
        selector: row =>row.category,
        minWidth: '150px',
      },
      {
        name: 'Descripción',
        cell: row => {return (<><div className="flex flex-col justify-center">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="group cursor-pointer relative inline-block">{row.description}
              <div className="opacity-0 w-28 bg-primary text-white text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full -right-1/2 ml-14 px-3 pointer-events-none">
                {row.description}
                <svg className="absolute text-gray-950 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
              </div>
            </div>
          </div>
        </div></>)},
        sortable: true,
        searchable: true,
        selector: row => row.description,
        minWidth: '280px',
      },
      {
        name: 'Acciones',
        width: 'auto',
        cell: row => { return (<div className="flex flex-row text-white">
          <TableActionButton tooltipText="Eliminar usuario" icon={<DeleteIcon color="error" />} />
          <TableActionButton tooltipText="Editar usuario" icon={<EditIcon color="info" />} />
        </div>)
      },
      },
    ];
    return newColumns;
}, [products]); 

  const getProducts = async () => {
    setLoading(true);
    try{
      //const response = await productService.getWebProducts();
      //setAllProducts(response);
      //setFilteredProducts(response);
      setAllProducts(products);
      setFilteredProducts(products);
    }catch(err){
      console.log(err);
      changeAlertStatusAndMessage(true, 'error', 'Los productos no han podido ser obtenidos... Por favor recargue la página.')
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const updateVisits = async () => {
      const body = { page: window.location.pathname };
      await visitsService.addVisit(body);
    }
    updateVisits();
  }, [])

  useEffect(() => {
    if(accessToken || localStorage.getItem('accessToken')) {
      const fetchProducts = async () => {
        await getProducts();
      }
      fetchProducts();
    }else {
      router.push('/login')
    }
  }, [accessToken]);


  useEffect(() => {
    if (selectedCategory.value === 'all') {
      setFilteredProducts(allProducts);
    } else {
      setFilteredProducts(allProducts.filter(p => p.category === selectedCategory.value));
    }
  }, [selectedCategory, allProducts]);

  return (
    <WebContainer>
      <WebTitle text="Pedidos" />
          <Box sx={{ width: '100%', justifyContent: 'center', display: 'flex', flexDirection: 'column' }} className="w-full">
                  <TabContext value={tabValue} className="w-full">
                      <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }} className="w-full">
                      <TabList
                          onChange={handleChangeTabValue}
                          textColor="primary"
                          indicatorColor="primary"
                          sx={{
                              '& .MuiTab-root': { 
                                fontWeight: 'bold', 
                                textTransform: 'none', 
                                minWidth: 100, 
                                color: 'gray', 
                                borderRadius: '10px 10px 0px 0px',
                                position: 'relative',
                          
                                backgroundImage: 'linear-gradient(to right, black 100%, transparent 0)',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: '0% 100%',
                                transition: 'background-size 0.3s ease-in-out, color 0.3s ease-in-out, background-color 0.3s ease-in-out',
                          
                                '&:hover': { 
                                  color: 'white', 
                                  backgroundColor: 'rgba(0, 0, 0, 0.6)' 
                                },
                          
                                '&.Mui-selected': { 
                                  color: 'white',
                                  backgroundColor: 'rgba(0, 0, 0, 1)',
                                  backgroundSize: '100% 100%', 
                                },
                          
                                '&:not(.Mui-selected)': {
                                  backgroundSize: '0% 100%', 
                                }
                              },
                              '& .MuiTabs-indicator': { backgroundColor: 'transparent' }
                            }}
                          >
                          <Tab label="Pendientes" value="1" />
                          <Tab label="Entregados" value="2" />
                          <Tab label="Pago en proceso" value="3" />
                          
                          <Tab label="Cancelados" value="4" />
                      </TabList>
                      </Box>
                      <TabPanel className="pt-8" value="1">
                        <div className="min-h-[200px] w-full">
                          {loading ? (
                            <Loader text="Cargando productos..." />
                          ) : filteredProducts.length > 0 ? (
                            <Table
                              sectionTitle="Productos"
                              customStyles={tableCustomStyles}
                              columns={columns}
                              data={products}
                              striped
                              responsive
                            />
                          ) : (
                            <NoResults results={filteredProducts} searchTerm={selectedCategory.label} onRetry={getProducts} />
                          )}
                          <AddButton />
                        </div>
                      </TabPanel>
                      <TabPanel className="pt-8" value="2">
                        <div className="min-h-[200px] w-full">
                          {loading ? (
                            <Loader text="Cargando productos..." />
                          ) : filteredProducts.length > 0 ? (
                            <Table
                              sectionTitle="Productos"
                              customStyles={tableCustomStyles}
                              columns={columns}
                              data={products}
                              striped
                              responsive
                            />
                          ) : (
                            <NoResults results={filteredProducts} searchTerm={selectedCategory.label} onRetry={getProducts} />
                          )}
                          <AddButton />
                        </div>
                      </TabPanel>
                      <TabPanel className="pt-8" value="3">
                        <div className="min-h-[200px] w-full">
                          {loading ? (
                            <Loader text="Cargando productos..." />
                          ) : filteredProducts.length > 0 ? (
                            <Table
                              sectionTitle="Productos"
                              customStyles={tableCustomStyles}
                              columns={columns}
                              data={products}
                              striped
                              responsive
                            />
                          ) : (
                            <NoResults results={filteredProducts} searchTerm={selectedCategory.label} onRetry={getProducts} />
                          )}
                          <AddButton />
                        </div>
                      </TabPanel>
                      <TabPanel className="pt-8" value="4">
                        <div className="min-h-[200px] w-full">
                          {loading ? (
                            <Loader text="Cargando productos..." />
                          ) : filteredProducts.length > 0 ? (
                            <Table
                              sectionTitle="Productos"
                              customStyles={tableCustomStyles}
                              columns={columns}
                              data={products}
                              striped
                              responsive
                            />
                          ) : (
                            <NoResults results={filteredProducts} searchTerm={selectedCategory.label} onRetry={getProducts} />
                          )}
                          <AddButton />
                        </div>
                      </TabPanel>
                  </TabContext>
              </Box>
    </WebContainer>
  );
}
