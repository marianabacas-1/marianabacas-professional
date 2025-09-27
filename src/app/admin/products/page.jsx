"use client";
import React, { useState, useEffect, useContext, useMemo, useRef } from "react";
import Select from 'react-select';
import ProductCard from "../../components/productCard";
import Loader from "../../components/loader";
import WebTitle from "../../components/webTitle";
import WebContainer from "../../components/webContainer";
import visitsService from "../../services/statsService";
import categoriesService from "../../services/categoriesService";
import productService from "../../services/productService";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Tooltip } from 'react-tooltip';
import { Context } from "../../context/Context";
import { categoryOptions, tableCustomStyles } from "../../../../utils";
import TableActionButton from "../../components/tableActionButton";
import NoResults from "../../components/noResult";
import Table from "../../components/table";
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import TableRowWithTooltip from "../../components/tableRowWithTooltip";
import AddButton from '../../components/addButton';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import EditIcon from '@mui/icons-material/Edit';
import Categories from "../../components/categories";
import Distributors from "../../components/distributors";
import Modal from "@/app/components/modal";
import distributorsService from "../../services/distributorsService";
import ProductModal from "@/app/components/modals/productModal";
import s3Service from "../../services/s3Service";
import PrimaryButton from "../../components/primaryButton";

export default function ProductsPage() {
  // Listado global y filtrado
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({ value: 'all', label: 'Todos' });
  const [tabValue, setTabValue] = useState('1');
  const [loading, setLoading] = useState(true);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [productId, setProductId] = useState('');
  const [productToEdit, setProductToEdit] = useState({});
  const [distributors, setDistributors] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [product, setProduct] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const { changeAlertStatusAndMessage, accessToken } = useContext(Context);  
  const router = useRouter();
  const [uploadReady, setUploadReady] = useState(false);
  const fileInputRef = useRef(null);

  const onCloseModal = () => {
    setProductModalOpen(false);
    setProductToEdit({});
    setProduct({});
    setProductId('');
    setDeleteModal(false);
    setEditMode(false);
  };

  const openDeleteModal = (product) => {
    setProductId(product._id);
    setDeleteModal(true);
    setProductToEdit(product);
  };

  const openEditModal = (product) => {
    setProductId(product._id);
    setProductToEdit(product);
    setEditMode(true);
    setProductModalOpen(true);
  };

  const handleChangeTabValue = (event, newValue) => {
    setTabValue(newValue);
  };

  const columns = useMemo(() => {
    const newColumns = [
      {
        name: 'Código',
        sortable: true,
        searchable: true,
        selector: row => row.code,
        minWidth: '80px',
      },
      {
        name: 'Nombre',
        cell: row => {return (<TableRowWithTooltip text={row.name} />)},
        sortable: true,
        searchable: true,
        selector: row => row.name,
        //maxWidth: '80px'
      },
      {
        name: 'Categoría',
        sortable: true,
        cell: row => {return (<TableRowWithTooltip text={row.category} />)},
        searchable: true,
        selector: row =>row.category,
        minWidth: '150px',
      },
      {
        name: 'Descripción',
        cell: row => {return (<TableRowWithTooltip text={row.description} />)},
        sortable: true,
        searchable: true,
        selector: row => row.description,
        minWidth: '280px',
      },
      {
        name: 'Stock',
        sortable: true,
        searchable: true,
        selector: row => row.stock,
        minWidth: '150px',
      },
      {
        name: 'Precio',
        sortable: true,
        searchable: true,
        selector: row => row.price,
        minWidth: '150px',
      },
      {
        name: 'Costo',
        sortable: true,
        searchable: true,
        selector: row => row.cost,
        minWidth: '150px',
      },
      {
        name: 'Proveedor',
        sortable: true,
        searchable: true,
        cell: row => {return (<TableRowWithTooltip text={row.distributor} />)},
        selector: row => row.distributor || 'N/A',
        minWidth: '150px',
      },
      {
        name: 'Imagenes',
        sortable: true,
        cell: row => { return (<div className="flex flex-row justify-center items-center my-1">
          {row.imagesUrls?.map((image, index) => (<div key={index}>
            <img data-tooltip-id="my-tooltip" data-tooltip-content={image.fileName} key={index} src={image.fileUrl} alt={`image-${index}`} className="w-12 h-12 object-cover" />
            <Tooltip id="my-tooltip" place="bottom" style={{ backgroundColor: 'rgba(150, 29, 112, 1)', color: 'white', fontSize: '14px' }} />
          </div>))}
        </div>)},
        searchable: true,
        selector: row => row.imagesUrls?.length,
        minWidth: '150px',
      },
      {
        name: 'Acciones',
        width: 'auto',
        cell: row => { return (<div className="flex flex-row text-white">
          <TableActionButton tooltipText="Eliminar usuario" onClick={() => openDeleteModal(row)} icon={<DeleteIcon color="error" />} />
          <TableActionButton tooltipText="Editar usuario" onClick={() => openEditModal(row)} icon={<EditIcon color="info" />} />
        </div>)
      },
      },
    ];
    return newColumns;
}, [allProducts, filteredProducts]); 

  const uploadFile = async (file, product) => {
      try {
          const adress = `products/${product.name}/${file.name}`;
          const fileName = await s3Service.uploadFile(file, adress);
          return fileName;
      } catch (error) {
          console.error('Error al subir archivo:', error);
          changeAlertStatusAndMessage(true, 'error', 'El archivo no han podido ser subido... Por favor intente nuevamente.');
      }
  };

  const updateProductFiles = async (pr) => {
      setLoading(true);
      try {
          let filesUrls = [];
          let productCopy = { ...pr };
          if(pr.imagesUrls?.length > 0 && pr.imagesUrls?.some(file => !file.fileName)) {
            for (let i = 0; i < pr.imagesUrls.length; i++) {
              const fl = pr.imagesUrls[i];
              if(!fl.fileName) {
                const fileNameWithLocation = await uploadFile(fl, productCopy);
                const fileName = fileNameWithLocation.split('/')[2];
                const fileData = {
                    fileUrl: process.env.NEXT_PUBLIC_DIGITAL_OCEAN_PUBLIC_BASE_URL + fileNameWithLocation,
                    fileName
                };
                filesUrls.push(fileData);
              }
            }
            productCopy.imagesUrls = [...(productCopy.imagesUrls.filter(file => file.fileName) || []), ...filesUrls];
            setUploadReady(true);
            changeAlertStatusAndMessage(true, 'success', 'Archivos subidos exitosamente!');
            setLoading(false);
          }
          return productCopy;
      } catch (error) {
          console.error('Error al subir archivos:', error);
          changeAlertStatusAndMessage(true, 'error', 'Los archivos no han podido ser subidos... Por favor intente nuevamente.');
      }finally{
        setLoading(false);
      }
  };

  const deleteFile = async (file, index) => {
      setLoading(true);
      try {
          const fullLocation = file.fileUrl.split(process.env.NEXT_PUBLIC_DIGITAL_OCEAN_PUBLIC_BASE_URL)[1];
          await s3Service.deleteFile(fullLocation, file.fileName);
          let productCopy = { ...productToEdit };
          productCopy.imagesUrls = productCopy.imagesUrls.filter((fl, idx) => idx !== index);
          await updateProduct(productCopy);
          changeAlertStatusAndMessage(true, 'success', 'Archivo eliminado exitosamente!');
      }catch (error) {
          console.error('Error al eliminar archivo:', error);
          changeAlertStatusAndMessage(true, 'error', 'El archivo no han podido ser eliminado... Por favor intente nuevamente.');
      }finally{
        setLoading(false);
      }
  };

  const addProduct = async () => {
    try{
        let pr = product;
        setLoading(true);
        if(product.imagesUrls?.length > 0) pr = await updateProductFiles(product);
        await productService.addProduct(pr);
        changeAlertStatusAndMessage(true, 'success', 'Producto agregado con éxito!');
        onCloseModal();
        setUploadReady(false);
        await getProducts();
    }catch(error) {
      changeAlertStatusAndMessage(true, 'error', 'El producto no pudo ser agregado... Por favor inténtelo nuevamente.');
      console.log(error);
    }finally{
      setLoading(false);
    }
  } 

  const updateProduct = async () => {
    try{
        let pr = { ...productToEdit };
        const imagesToDelete = pr.imagesUrls?.filter(img => img.markedForDeletion);
       if (imagesToDelete?.length > 0) {
          for (const img of imagesToDelete) {
            const fullLocation = img.fileUrl.split(process.env.NEXT_PUBLIC_DIGITAL_OCEAN_PUBLIC_BASE_URL)[1];
            await s3Service.deleteFile(fullLocation, img.fileName);
          }
        }
        pr.imagesUrls = pr.imagesUrls.filter(img => !img.markedForDeletion);
        setLoading(true);
        if (pr.imagesUrls?.length > 0) {
          pr = await updateProductFiles(pr);
        }
        await productService.editProduct(productId, pr);
        changeAlertStatusAndMessage(true, 'success', 'Producto editado con éxito!');
        onCloseModal();
        setUploadReady(false);
        await getProducts();
    }catch(error) {
      onCloseModal();
      changeAlertStatusAndMessage(true, 'error', 'El producto no pudo ser editado... Por favor inténtelo nuevamente.');
      console.log(error);
    }finally{
      setLoading(false);
    }
  }

const deleteProduct = async () => {
    try{
        setLoading(true);
        await productService.delete(productToEdit._id);
        changeAlertStatusAndMessage(true, 'success', 'Producto eliminado con éxito!');
        onCloseModal();
        await getProducts();
    }catch(error) {
      changeAlertStatusAndMessage(true, 'error', 'El producto no pudo ser eliminado... Por favor inténtelo nuevamente.');
        console.log(error);
        onCloseModal();
    }finally{
      setLoading(false);
    }
  } 

  const getCategories = async () => {
      try{
        setLoading(true);
        const categoriesList = await categoriesService.getCategories();
        categoriesList.forEach(cat => {
          cat.value = cat.name;
          cat.label = cat.name;
        })
        setCategories(categoriesList);
      }catch(err) {
        console.log(err);
        changeAlertStatusAndMessage(true, 'error', 'Las categorías no han podido ser obtenidos... Por favor recargue la página.')
      }finally{
        setLoading(false);
      }
  } 

  const getDistributors = async () => {
    try{
      setLoading(true);
      const distributorsList = await distributorsService.getDistributors();
      distributorsList.forEach(dist => {
        dist.value = dist.name;
        dist.label = dist.name;
      })
      setDistributors(distributorsList);
    }catch(err) {
      console.log(err);
      changeAlertStatusAndMessage(true, 'error', 'Los proveedores no han podido ser obtenidos... Por favor recargue la página.')
    }finally{
      setLoading(false);
    }
  } 

  const getProducts = async () => {
    setLoading(true);
    try{
      const response = await productService.getProducts();
      setAllProducts(response);
      setFilteredProducts(response);      
      setLoading(false);
    }catch(err){
      console.log(err);
      setLoading(false);
      changeAlertStatusAndMessage(true, 'error', 'Los productos no han podido ser obtenidos... Por favor recargue la página.')
    }
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      return;
    }

    try {
      setLoading(true);

      const data = await productService.importProducts(file);
      await getProducts();
      changeAlertStatusAndMessage(true, 'success', `${data.message}. Productos importados: ${data.count}`);
      setFile(null);
    } catch (error) {
      console.error(error);
      changeAlertStatusAndMessage(true, 'error', error.response?.data?.error || "Error al importar los productos");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click(); // abre el selector de archivos
  };

  useEffect(() => {
    if(accessToken || localStorage.getItem('accessToken')) {
      const fetchProducts = async () => {
        await getProducts();
      }
      fetchProducts();
      getDistributors();
      getCategories();
    }else {
      router.push('/login')
    }
  }, [accessToken]);

  useEffect(() => {
    console.log(productToEdit);
    console.log(product);
  }, [productToEdit, product])


  useEffect(() => {
    if (selectedCategory.value === 'all') {
      setFilteredProducts(allProducts);
    } else {
      setFilteredProducts(allProducts.filter(p => p.category === selectedCategory.value));
    }
  }, [selectedCategory, allProducts]);

  return (
    <WebContainer>
      <WebTitle text="Gestión de productos" />
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
                          <Tab label="Productos" value="1" />
                          <Tab label="Categorías" value="2" />
                          <Tab label="Proveedores" value="3" />
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
                            data={allProducts}
                            striped
                            responsive
                          />
                        ) : (
                          <NoResults results={filteredProducts} searchTerm={selectedCategory.label} onRetry={getProducts} />
                        )}
                        <AddButton onClick={() => setProductModalOpen(true)} />
                      </div>
                      <Modal 
                        open={productModalOpen} 
                        onClose={() => onCloseModal()} 
                        actionText={editMode ? "Editar producto" : "Agregar producto"} 
                        onClick={() => editMode ? updateProduct() : addProduct()} 
                        isLoadingText={editMode ? "Editando producto..." : "Agregando producto..."} 
                        isLoading={loading}
                        title={editMode ? "Editar producto" : "Agregar producto"}
                        icon={<LocalGroceryStoreIcon color="action" />}
                      >
                        <ProductModal 
                          editMode={editMode} 
                          categoryOptions={categories}
                          getProduct={(pr) => editMode ? setProductToEdit(pr) : setProduct(pr)}
                          distributorOptions={distributors}
                          product={productToEdit} 
                        />
                      </Modal>
                      <Modal 
                        isLoading={loading} 
                        open={deleteModal} 
                        onClick={() => deleteProduct()} 
                        icon={<DeleteIcon color="action" />} 
                        actionText="Eliminar producto" 
                        loadingButtonText="Eliminando producto..." 
                        onClose={onCloseModal} 
                        title="Eliminar producto"
                      >
                        <div className="px-4 py-7 text-center text-gray-700 rounded bg-gray-100">{`¿Confirma la eliminación del producto ${productToEdit?.name}?`}</div>
                      </Modal>
                      {!loading && <div className="flex justify-end my-4">
                        {file && <PrimaryButton 
                        className="my-4"
                        onClick={handleUpload} 
                        actionText="Iniciar importación"
                        isLoading={loading}
                        isLoadingText="Importando..."
                      />}
                        {!file && (<><input
                          type="file"
                          accept=".xlsx, .xls"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          className="hidden"
                        />

                        <PrimaryButton
                          className="my-4"
                          onClick={handleUploadClick}
                          actionText="Importar desde archivo excel"
                        /></>)}
                      </div>}
                      </TabPanel>
                      <TabPanel className="pt-8" value="2">
                        <Categories categories={categories} fetchCategories={getCategories} />
                      </TabPanel>
                      <TabPanel className="pt-8" value="3">
                        <Distributors distributors={distributors} fetchDistributors={getDistributors} />
                      </TabPanel>
                  </TabContext>
              </Box>
    </WebContainer>
  );
}
