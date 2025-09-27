"use client";
import React, { useState, useEffect, useContext, useMemo } from "react";
import Loader from "../../components/loader";
import WebTitle from "../../components/webTitle";
import WebContainer from "../../components/webContainer";
import visitsService from "../../services/statsService";
import userService from "../../services/userService";
import { Context } from "../../context/Context";
import { tableCustomStyles, formatDate, formatDateWithoutTime } from "../../../../utils";
import TableActionButton from "../../components/tableActionButton";
import NoResults from "../../components/noResult";
import Table from "../../components/table";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Register from "../../components/login/registerForm";
import GroupIcon from '@mui/icons-material/Group';
import { useRouter } from 'next/navigation';
import Modal from "../../components/modal";
import AddButton from '../../components/addButton';

export default function ProductsPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userToRegister, setUserToRegister] = useState({});
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [userToEdit, setUserToEdit] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const { changeAlertStatusAndMessage, accessToken } = useContext(Context);  
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  const columns = useMemo(() => {
    const newColumns = [
      {
        name: 'Nombre',
        sortable: true,
        searchable: true,
        selector: row => row.firstName,
        //maxWidth: '80px'
      },
      {
        name: 'Apellido',
        sortable: true,
        searchable: true,
        selector: row =>row.lastName,
        minWidth: '150px',
      },
      {
        name: 'Email',
        cell: row => {return (<><div className="flex flex-col justify-center">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="group cursor-pointer relative inline-block">{row.email}
              <div className="opacity-0 w-28 bg-primary text-white text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full -right-1/2 ml-14 px-3 pointer-events-none">
                {row.email}
                <svg className="absolute text-gray-950 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
              </div>
            </div>
          </div>
        </div></>)},
        sortable: true,
        searchable: true,
        selector: row => row.email,
        minWidth: '280px',
      },
      {
        name: 'Documento',
        sortable: true,
        searchable: true,
        selector: row =>row.document,
        minWidth: '150px',
      },
      {
        name: 'Ciudad',
        cell: row => {return <>
          {row.address && row.city && row.postalCode ? (
            <div className="grid items-center font-thin space-y-1 my-1">
              <div>
                {row.address}
              </div>
              <div>
                {row.city}
              </div>
              <div>
                {row.postalCode}
              </div>
            </div>
          ) : 'N/A'}
        </>
        },
        searchable: true,
        selector: row => row.city,
        minWidth: '150px',
      },
      {
        name: 'Rol',
        cell: row => {return (<><div className="flex flex-col justify-center font-semibold">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="group cursor-pointer relative inline-block">{row.role}
              <div className="opacity-0 w-28 bg-primary text-white text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full -right-1/2 ml-14 px-3 pointer-events-none">
                {row.role}
                <svg className="absolute text-gray-950 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
              </div>
            </div>
          </div>
        </div></>)},
        sortable: true,
        searchable: true,
        selector: row => row.role,
        minWidth: '280px',
      },
      {
        name: 'Pedidos',
        cell: row => {return (<><div className="flex flex-col justify-center">
          {row.orders.length > 0 ? (
            <div className="grid items-center font-thin space-y-1 my-1 underline">
              <button onClick={() => router.push(`/admin/orders/${row._id}`)}>
                Ver pedidos
              </button>
            </div>
          ) : 'Aún no posee pedidos'}
        </div></>)},
        sortable: true,
        searchable: true,
        selector: row => row.orders,
        minWidth: '280px',
      },
      {
        name: 'Fecha de nacimiento',
        cell: row => {return (<><div className="flex flex-col justify-center">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="group cursor-pointer relative inline-block">{row.birthDate ? formatDateWithoutTime(row.birthDate) : 'N/A'}
              <div className="opacity-0 w-28 bg-primary text-white text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full -right-1/2 ml-14 px-3 pointer-events-none">
                {row.birthDate ? formatDateWithoutTime(row.birthDate) : 'N/A'}
                <svg className="absolute text-gray-950 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
              </div>
            </div>
          </div>
        </div></>)},
        sortable: true,
        searchable: true,
        selector: row => row.birthDate,
        minWidth: '280px',
      },
      {
        name: 'Fecha de registro',
        cell: row => {return (<><div className="flex flex-col justify-center">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="group cursor-pointer relative inline-block">{formatDate(row.createdAt)}
              <div className="opacity-0 w-28 bg-primary text-white text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full -right-1/2 ml-14 px-3 pointer-events-none">
                {formatDate(row.createdAt)}
                <svg className="absolute text-gray-950 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
              </div>
            </div>
          </div>
        </div></>)},
        sortable: true,
        searchable: true,
        selector: row => row.createdAt,
        minWidth: '280px',
      },
      {
        name: 'Acciones',
        width: 'auto',
        cell: row => { return (<div className="flex flex-row text-white">
          <TableActionButton tooltipText="Eliminar usuario" onClick={() => {setUserToEdit(row); setDeleteModalOpen(true)}} icon={<DeleteIcon color="error" />} />
          <TableActionButton tooltipText="Editar usuario" onClick={() => openEditModal(row)} icon={<EditIcon color="info" />} />
        </div>)
      },
      },
    ];
    return newColumns;
}, [users]); 

  const onCloseModal = () => {
    setOpenModal(false);
    setUserToRegister({});
    setDeleteModalOpen(false);
    setUserToEdit({});
    setEditMode(false);
  }

  const openEditModal = (user) => {
    setUserToEdit(user);
    setOpenModal(true);
    setEditMode(true);
  }

  const doAction = async () => {
    if(editMode) {
      console.log('editMode');
      await editUser();
    }else {
      console.log('registerUser');
      await registerUser();
    }
  }

  const registerUser = async () => {
      try {
        setIsLoading(true);
        await userService.register(userToRegister);
        setOpenModal(false);
        changeAlertStatusAndMessage(true, 'success', 'Usuario registrado de manera exitosa!')
        getUsers();
      } catch (error) {
          changeAlertStatusAndMessage(true, 'error', 'El usuario no ha podido ser registrado. Por favor inténtelo nuevamente.');
          console.log(error);
      } finally {
        setIsLoading(false);
      }
  };

  const editUser = async () => {
    try {
      setIsLoading(true);
      console.log(userToEdit);
      await userService.updateUser(userToEdit.id, userToEdit);
      setOpenModal(false);
      changeAlertStatusAndMessage(true, 'success', 'Usuario editado de manera exitosa!')
      getUsers();
    } catch (error) {
        changeAlertStatusAndMessage(true, 'error', 'El usuario no ha podido ser editado. Por favor inténtelo nuevamente.');
        console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const deleteUser = async () => {
    setIsLoading(true);
    try{
      await userService.deleteUser(userToEdit.id);
      changeAlertStatusAndMessage(true, 'success', 'Usuario eliminado de manera exitosa!')
      getUsers();
    }catch(err){
      console.log(err);
      changeAlertStatusAndMessage(true, 'error', 'El usuario no ha podido ser eliminado. Por favor inténtelo nuevamente.')
    } finally {
      setIsLoading(false);
    }
  }

  const getUsers = async () => {
    setIsLoading(true);
    try{
      const response = await userService.getUsers();
      setUsers(response);
    }catch(err){
      console.log(err);
      changeAlertStatusAndMessage(true, 'error', 'Los usuarios no han podido ser obtenidos... Por favor recargue la página.')
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if(accessToken || localStorage.getItem('accessToken')) {
      getUsers();
    }else {
      router.push('/login')
    }
  }, [accessToken])

  return (
    <WebContainer>
      <WebTitle text="Usuarios" />
    
      <div className="min-h-[200px] w-full">
        {isLoading && <Loader text="Cargando usuarios..." />}
        {!isLoading && users.length > 0 &&
          <Table
            sectionTitle="Usuarios"
            customStyles={tableCustomStyles}
            columns={columns}
            data={users}
            striped
            responsive
          />
        }
        <AddButton onClick={() => setOpenModal(true)} />
      </div>
      <Modal 
        actionText={editMode ? "Editar usuario" : "Agregar usuario"} 
        onClick={() => doAction()} 
        buttonDisabled={buttonDisabled} 
        isLoading={isLoading} 
        isLoadingText="Agregando usuario..." 
        open={openModal} 
        title={editMode ? "Editar usuario" : "Agregar usuario"} 
        icon={<GroupIcon color="action" />} 
        onClose={() => onCloseModal()}>
        <Register 
          emitRegister={(usr) => setUserToRegister(usr)} 
          emitEdition={(usr) => setUserToEdit(usr)}
          emitButtonDisabled={(isDisabled) => setButtonDisabled(isDisabled)} 
          editMode={editMode}
          userToEdit={userToEdit}
        />
      </Modal>
      <Modal
        actionText="Eliminar usuario"
        onClick={() => deleteUser()}
        isLoading={isLoading}
        isLoadingText="Eliminando usuario..."
        open={deleteModalOpen}
        title="Eliminar usuario"
        icon={<DeleteIcon color="action" />}
        onClose={() => onCloseModal()}
      >
        <p className="text-center text-gray-700">¿Confirma la eliminación del usuario {userToEdit?.firstName + ' ' + userToEdit?.lastName}?</p>
      </Modal>
    </WebContainer>
  );
}
