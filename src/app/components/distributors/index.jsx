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
import EditDistributor from "@/app/components/modals/editDistributor";
import CreateDistributor from "@/app/components/modals/createDistributor";
import distributorsService from "@/app/services/distributorsService";
import PrimaryButton from "@/app/components/primaryButton";
import AddButton from "../addButton";
import NoResults from "../noResult";


export default function Distributors({ distributors, fetchDistributors }) {
    const [isLoadingDistributors, setIsLoadingDistributors] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [distributorToAdd, setdistributorToAdd] = useState({});
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [distributorToEdit, setdistributorToEdit] = useState({});
    const [distributorToDelete, setdistributorToDelete] = useState('');
    const [distributorId, setdistributorId] = useState(null);
    const router = useRouter();
    const { changeAlertStatusAndMessage, accessToken } = useContext(Context);

    const onClose = () => {
      setIsOpen(false);
      setdistributorToEdit({});
    }

    const onCloseDeleteModal = () => {
      setDeleteModal(false);
      setdistributorId(null);
      setdistributorToDelete('');
    }

    const onCloseEditModal = () => {
      setEditModal(false);
      setdistributorId(null);
      setdistributorToEdit({});
    } 

    const openDeleteModal = (dist) => {
      setDeleteModal(true);
      setdistributorId(dist._id);
      setdistributorToDelete(dist.name);
    };

    const openEditModal = async (dist) => {
      setdistributorToEdit(dist);
      setdistributorId(dist._id)
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
              <TableActionButton onClick={() => openDeleteModal(row)} tooltipText="Eliminar proveedor" icon={<DeleteIcon color="error" />} />
              <TableActionButton onClick={() => openEditModal(row)} tooltipText="Editar proveedor" icon={<EditIcon color="info" />} />
            </div>)
          },
          },
        ];
        return newColumns;
    }, [distributors]); 

    const addDistributor = async () => {
      try{
          setIsLoadingDistributors(true);
          await distributorsService.addDistributor(distributorToAdd);
          changeAlertStatusAndMessage(true, 'success', 'Proveedor creado con éxito!');
          await fetchDistributors();
          onClose();
      }catch(error) {
        changeAlertStatusAndMessage(true, 'error', 'El proveedor no pudo ser creado... Por favor inténtelo nuevamente.');
        console.log(error);
      }finally{
        setIsLoadingDistributors(false);
      }
  } 

  const editDistributor = async () => {
    try{
      setIsLoadingDistributors(true);
        await distributorsService.editDistributor(distributorId, distributorToEdit);
        changeAlertStatusAndMessage(true, 'success', 'Proveedor editado con éxito!');
        onCloseEditModal();
        await fetchDistributors();
    }catch(error) {
      onCloseEditModal();
      changeAlertStatusAndMessage(true, 'error', 'El proveedor no pudo ser editado... Por favor inténtelo nuevamente.');
      console.log(error);
    }finally{
      setIsLoadingDistributors(false);
    }
  }

  const deleteDistributor = async () => {
    try{
      setIsLoadingDistributors(true);
        await distributorsService.deleteDistributor(distributorId);
        changeAlertStatusAndMessage(true, 'success', 'Proveedor eliminado con éxito!');
        onCloseDeleteModal();
        await fetchDistributors();
    }catch(error) {
      changeAlertStatusAndMessage(true, 'error', 'El proveedor no pudo ser eliminado... Por favor inténtelo nuevamente.');
        console.log(error);
        onCloseDeleteModal();
    }finally{
      setIsLoadingDistributors(false);
    }
  } 
  
  useEffect(() => {
    if(accessToken) {
      fetchDistributors();
    }else {
      router.push('/login')
    }
  }, [])

    return (
        <div className="flex flex-col justify-center my-4">
          {isLoadingDistributors && <Loader text="Obteniendo proveedores..." />}
            {((distributors.length > 0) && !isLoadingDistributors) && (
              <>
                <Table
                  sectionTitle="Proveedores"
                  customStyles={tableCustomStyles}
                  columns={columns}
                  data={distributors}
                  striped
                  responsive
              />
            </>)}
            {((distributors.length === 0) && !isLoadingDistributors) && (
              <NoResults results={distributors} searchTerm="" onRetry={fetchDistributors} />
            )}
            <AddButton onClick={() => setIsOpen(true)}/>
            <Modal buttonDisabled={isDisabled} isLoading={isLoadingDistributors} open={isOpen} onClick={() => addDistributor()} icon={<GroupIcon />} actionText="Agregar proveedor" loadingButtonText="Agregando proveedor..." onClose={onClose} title="Agregar proveedor">
              <CreateDistributor isDisabled={(value) => setIsDisabled(value)} onCreateDistributor={(prf) => setdistributorToAdd(prf)} />
            </Modal>
            <Modal buttonDisabled={isDisabled} isLoading={isLoadingDistributors} open={editModal} onClick={() => editDistributor()} icon={<EditIcon />} actionText="Editar proveedor" loadingButtonText="Editando proveedor..." onClose={onCloseEditModal} title={`Editar proveedor ${distributorToEdit.name}`}>
              <EditDistributor distributorToEdit={distributorToEdit} isDisabled={(value) => setIsDisabled(value)} onCreateDistributor={(prf) => setdistributorToEdit(prf)} />
            </Modal>
            <Modal isLoading={isLoadingDistributors} open={deleteModal} onClick={() => deleteDistributor()} icon={<DeleteIcon />} actionText="Eliminar proveedor" loadingButtonText="Eliminando proveedor..." onClose={onCloseDeleteModal} title="Eliminar proveedor">
              <div className="px-4 py-7 text-center text-gray-700 rounded bg-gray-100">{`¿Confirma la eliminación del proveedor ${distributorToDelete}?`}</div>
            </Modal>
        </div>
    )
}
