"use client";
import { useState, useMemo, useEffect, useContext } from "react";
import Table from '../../components/table';
import GroupIcon from '@mui/icons-material/Group';
import Modal from "../../components/modal";
import { useRouter } from 'next/navigation'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Context } from "../../context/Context";
import { tableCustomStyles } from "../../../../utils";
import Loader from "../../components/loader";
import TableActionButton from "../../components/tableActionButton";
import EditCategory from "@/app/components/modals/editCategory";
import CreateCategory from "@/app/components/modals/createCategory";
import categoriesService from "@/app/services/categoriesService";
import PrimaryButton from "@/app/components/primaryButton";
import AddButton from "../addButton";
import NoResults from "../noResult";


export default function Users({ categories, fetchCategories = () => {} }) {
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [categoryToAdd, setcategoryToAdd] = useState({});
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [categoryToEdit, setcategoryToEdit] = useState({});
    const [categoryToDelete, setcategoryToDelete] = useState('');
    const [categoryId, setcategoryId] = useState(null);
    const router = useRouter();
    const { changeAlertStatusAndMessage, accessToken } = useContext(Context);

    const onClose = () => {
      setIsOpen(false);
      setcategoryToEdit({});
    }

    const onCloseDeleteModal = () => {
      setDeleteModal(false);
      setcategoryId(null);
      setcategoryToDelete('');
    }

    const onCloseEditModal = () => {
      setEditModal(false);
      setcategoryId(null);
      setcategoryToEdit({});
    }  

    const openDeleteModal = (cat) => {
      setDeleteModal(true);
      setcategoryId(cat._id);
      setcategoryToDelete(cat.name);
    };

    const openEditModal = async (cat) => {
      setcategoryToEdit(cat);
      setcategoryId(cat._id)
      setEditModal(true);
    }

    const columns = useMemo(() => {
        const newColumns = [
          {
            name: 'Nombre',
            sortable: true,
            searchable: true,
            selector: row => row.name,
            //maxWidth: '80px'
          },
          {
            name: 'Descripción',
            cell: row => {return (<><div className="flex flex-col justify-center">
              <div className="py-3 w-auto sm:mx-auto">
                <div className="group cursor-pointer relative inline-block">{row.description.length > 70 ? row.description.substring(0, 70) + '...' : row.description}
                  <div className="opacity-0 w-28 bg-primary text-white text-xs rounded-lg py-2 absolute z-50 group-hover:opacity-100 bottom-1/2 -right-1/2 ml-14 px-3 pointer-events-none">
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
            minWidth: '240px',
            cell: row => { return (<div className="flex-row text-white">
              <TableActionButton onClick={() => openDeleteModal(row)} tooltipText="Eliminar categoría" icon={<DeleteIcon color="error" />} />
              <TableActionButton onClick={() => openEditModal(row)} tooltipText="Editar categoría" icon={<EditIcon color="info" />} />
            </div>)
          },
          },
        ];
        return newColumns;
    }, [categories]); 

    const addcategory = async () => {
      try{
          setIsLoadingCategories(true);
          await categoriesService.addCategory(categoryToAdd);
          changeAlertStatusAndMessage(true, 'success', 'Categoría creada con éxito!');
          fetchCategories();
          onClose();
      }catch(error) {
        changeAlertStatusAndMessage(true, 'error', 'La categoría no pudo ser creada... Por favor inténtelo nuevamente.');
        console.log(error);
      }finally{
        setIsLoadingCategories(false);
      }
  } 

  const editcategory = async () => {
    try{
      setIsLoadingCategories(true);
        await categoriesService.editCategory(categoryId, categoryToEdit);
        changeAlertStatusAndMessage(true, 'success', 'Categoría editada con éxito!');
        onCloseEditModal();
        fetchCategories();
    }catch(error) {
      onCloseEditModal();
      changeAlertStatusAndMessage(true, 'error', 'La categoría no pudo ser editada... Por favor inténtelo nuevamente.');
      console.log(error);
    }finally{
      setIsLoadingCategories(false);
    }
  }

  const deletecategory = async () => {
    try{
      setIsLoadingCategories(true);
        await categoriesService.delete(categoryId);
        changeAlertStatusAndMessage(true, 'success', 'Categoría eliminada con éxito!');
        onCloseDeleteModal();
        fetchCategories();
    }catch(error) {
      changeAlertStatusAndMessage(true, 'error', 'La categoría no pudo ser eliminada... Por favor inténtelo nuevamente.');
        console.log(error);
        onCloseDeleteModal();
    }finally{
      setIsLoadingCategories(false);
    }
  } 
  
  useEffect(() => {
    if(accessToken) {
      fetchCategories();
    }else {
      router.push('/login')
    }
  }, [])

    return (
        <div className="flex flex-col justify-center my-4">
          {isLoadingCategories && <Loader text="Obteniendo categorías..." />}
            {((categories.length > 0) && !isLoadingCategories) && (
              <>
                <Table
                  sectionTitle="Categorías"
                  customStyles={tableCustomStyles}
                  columns={columns}
                  data={categories}
                  striped
                  responsive
              />
            </>)}
            {((categories.length === 0) && !isLoadingCategories) && (
              <NoResults results={categories} searchTerm="" onRetry={fetchCategories} />
            )}
            <AddButton onClick={() => setIsOpen(true)}/>
            <Modal buttonDisabled={isDisabled} isLoading={isLoadingCategories} open={isOpen} onClick={() => addcategory()} icon={<GroupIcon />} actionText="Agregar categoría" loadingButtonText="Agregando categoría..." onClose={onClose} title="Agregar categoría">
              <CreateCategory isDisabled={(value) => setIsDisabled(value)} onCreatecategory={(prf) => setcategoryToAdd(prf)} />
            </Modal>
            <Modal buttonDisabled={isDisabled} isLoading={isLoadingCategories} open={editModal} onClick={() => editcategory()} icon={<EditIcon />} actionText="Editar categoría" loadingButtonText="Editando categoría..." onClose={onCloseEditModal} title={`Editar categoría ${categoryToEdit.name}`}>
              <EditCategory categoryToEdit={categoryToEdit} isDisabled={(value) => setIsDisabled(value)} onCreatecategory={(prf) => setcategoryToEdit(prf)} />
            </Modal>
            <Modal isLoading={isLoadingCategories} open={deleteModal} onClick={() => deletecategory()} icon={<DeleteIcon />} actionText="Eliminar categoría" loadingButtonText="Eliminando categoría..." onClose={onCloseDeleteModal} title="Eliminar categoría">
              <div className="px-4 py-7 text-center text-gray-700 rounded bg-gray-100">{`¿Confirma la eliminación de la categoría ${categoryToDelete}?`}</div>
            </Modal>
        </div>
    )
}
