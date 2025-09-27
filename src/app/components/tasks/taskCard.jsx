import React, { useState } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import TableActionButton from "../tableActionButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddCommentIcon from '@mui/icons-material/AddComment';
import CommonTextarea from "../commonTextArea";
import CommonLabel from "../commonLabel";
import PrimaryButton from "../primaryButton";
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

export default function TaskCard({ title, description, status = "pending", comments, assignedTo, category, deleteTask = () => {}, editTask = () => {}, completeTask = () => {}, pendingTask = () => {}, addComment = () => {}, deleteComment = () => {}, markAsReaded = () => {} }) {
    const [newComment, setNewComment] = useState(false);
    const [comment, setComment] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [seeComments, setSeeComments] = useState(false);

    const getIcon = () => {
        switch (status) {
          case "pending":
            return <PendingActionsIcon className="text-amber-500" />;
          case "completed":
            return <CheckCircleOutlineIcon className="text-green-700" />;
          default:
            return <PendingActionsIcon className="text-amber-500" />;
        }
    };

    const saveComment = () => {
        setIsLoading(true);
        addComment(comment);
        setNewComment(false);
        setComment('');
        setIsLoading(false);
    }

    return(
        <div className="my-4 md:my-8 p-4 bg-secondaryWithOp2 rounded-xl shadow">
            <div className="grid md:flex md:justify-between">
                <div className="w-full">
                    <div className="text-lg md:text-xl font-semibold flex items-center justify-between w-full">
                        <div className="flex items-center gap-2"><span>{getIcon()}</span><span>{title}</span></div>
                        {(comments?.length > 0) && comments.some(cm => cm.status === "pending") && <NotificationsActiveIcon fontSize="small" className="text-red-500" />}
                    </div>
                    <div className="mt-2">{description}</div>
                    <div className="mt-2">Asignada a: <span className="font-semibold">{assignedTo}</span></div>
                    <div className="mt-2">Categoría: <span className="font-semibold">{category}</span></div>
                </div>
                <div className="flex items-center justify-center mt-4 md:mt-0">
                    {!newComment && <TableActionButton onClick={() => setNewComment(true)} tooltipText="Añadir comentario" icon={<AddCommentIcon color="info" />} />}
                    <TableActionButton onClick={() => deleteTask()} tooltipText="Eliminar tarea" icon={<DeleteIcon color="error" />} />
                    <TableActionButton onClick={() => editTask()} tooltipText="Editar tarea" icon={<EditIcon color="info" />} />
                    {status === 'pending' && <TableActionButton onClick={() => completeTask()} tooltipText="Marcar como completada" icon={<CheckCircleOutlineIcon color="success" />} />}
                    {status === 'completed' && <TableActionButton onClick={() => pendingTask()} tooltipText="Marcar como no completada" icon={<HighlightOffIcon color="error" />} />}
                </div>
            </div>
            {newComment && <div className="my-4">
                    <CommonLabel label="Comentario" className="text-white block text-sm font-bold mb-2" />
                    <CommonTextarea
                        id="comment"
                        placeholder="Ingrese comentario..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <PrimaryButton disabled={isLoading} onClick={() => saveComment()} actionText="Guardar" loadingText="Guardando..." />
            </div>}
            {comments?.length > 0 && (<div>
                {!seeComments && <button onClick={() => setSeeComments(true)} className="text-blue-500 my-1 text-sm">Ver comentarios...</button>}
                {seeComments && <><hr className="border-t border-white w-full mt-2"/>
                <div className="text-xl my-4 rounded-2xl border border-white text-center w-full md:w-2/6 mx-auto">Comentarios</div>
                {
                    comments.map((cm, index) => 
                        <div className="flex flex-wrap justify-between p-2 bg-white text-gray-500 my-1 rounded items-center" key={index}>
                            <div><span className="font-semibold">{cm.commentedBy}: </span>{cm.comment}</div>
                            <div>
                            {cm.status === 'pending' ? <TableActionButton onClick={() => markAsReaded(index)} tooltipText="Marcar como leída" icon={<DoneIcon color="success" />} /> : <TableActionButton tooltipText="Visto" icon={<DoneAllIcon color="success" />} />}
                            <TableActionButton onClick={() => deleteComment(index)} tooltipText="Eliminar comentario" icon={<DeleteIcon color="error" />} />
                            </div>
                        </div>
                    )
                }
                <button onClick={() => setSeeComments(false)} className="text-blue-500 my-1 text-sm">Ocultar comentarios...</button>
                </>}
            </div>)}
        </div>
    );
} 