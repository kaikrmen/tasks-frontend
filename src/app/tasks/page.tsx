'use client'

import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Pagination,
  IconButton,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Task } from '../interface/Task';
import { deleteTask, fetchTasks, oneTask, toggleTaskCompletion, updateTask } from '../services/api';
import Swal from 'sweetalert2';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Loader } from '../components/loading';


interface EditTaskForm extends Omit<Task, 'isDone' | 'userId' | 'email' | 'userName'> { }

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [editTask, setEditTask] = useState<EditTaskForm | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [openDetails, setOpenDetails] = useState(false);
  const { user } = useUser();

  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    isDone: false,
    userId: user?.sub,
    userName: user?.name,
    email: user?.email
  });

  const getTasks = async (userId: string, page: number) => {
    if (user?.sub) {
      setIsLoading(true);
      fetchTasks(user.sub, page)
        .then(({ tasks, totalPages }) => {
          setTasks(tasks);
          setTotalPages(totalPages);
          setIsLoading(false);
        })
        .catch((error: Error) => {
          Swal.fire({
            title: 'Error!',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'Ok',
          });
          setIsLoading(false);
        });
    }
  }

  useEffect(() => {
    if (user?.sub) {
      getTasks(user.sub, page);
    }
  }, [user?.sub, page]);

  useEffect(() => {
    setNewTask(current => ({
      ...current,
      userId: user?.sub,
      userName: user?.name,
      email: user?.email,
    }));
  }, [user?.sub, user?.name, user?.email]);



  const handleToggleCompletion = (taskId: string, isDone: boolean) => {
    if (user && user.sub) {
      toggleTaskCompletion(taskId, isDone, user.sub, setTasks);
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'User information is missing',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };

  const handleOpen = () => setOpenModal(true);

  const handleClose = () => {
    setOpenModal(false);
    setNewTask({
      name: '', description: '', isDone: false,
      userId: user?.sub, userName: user?.name, email: user?.email
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = event.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    if (!newTask.name || !newTask.description) {
      handleClose();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Name and description cannot be empty!',
      });

      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });
      if (!response.ok) throw new Error('Failed to create task');

      if (user?.sub) {
        getTasks(user.sub, page);
      }

      Swal.fire({
        icon: 'success',
        title: 'Task Created',
        showConfirmButton: true,
        timer: 1500,
      });
      handleClose();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Failed to create task',
        text: 'An error occurred while creating the task. Please try again later.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (isLoading) {
    return <>
      <Container sx={{ maxWidth: 1000, width: 'auto', marginTop: '15rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Loader />;
      </Container>

    </>;
  }
  if (error) return <p>Error: {error}</p>;

  const handleViewDetails = async (taskId: string) => {
    if (user?.sub) {
      try {
        const taskDetails = await oneTask(taskId, user.sub);
        setSelectedTask(taskDetails);
        setOpenDetails(true);
      } catch (error) {
        console.error(error);
        // Aquí puedes manejar el error, por ejemplo, mostrando una alerta
      }
    }
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
    setSelectedTask(null); // Limpiar la tarea seleccionada
  };


  const handleDeleteTask = async (taskId: any) => {
    if (user?.sub) {
      await deleteTask(taskId, user.sub, setTasks)
        .then(() => {
          getTasks(user.sub || '', page);
        })
        .catch((error) => {
          console.error('Error deleting task:', error);
        });
    }
  };


  const handleOpenEditDialog = (task: Task) => {
    if (!task.name || !task.description) {
      Swal.fire('Error', 'Task name and description cannot be empty', 'error');
      return;
    }
    setEditTask({ _id: task._id, name: task.name, description: task.description });
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditTask(null); // Limpiar el formulario de edición
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditTask((prev: any) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSubmitEdit = async () => {
    if (editTask && user?.sub) {
      const { _id, name, description } = editTask;
      if (!name || !description) {
        handleCloseEditDialog();
        Swal.fire('Error', 'Task name and description cannot be empty', 'error');
        return;
      }
      await updateTask(_id, name, description, user.sub, setTasks);
      handleCloseEditDialog();
    }
  };



  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
        Tasks
      </Typography>
      <Button variant="contained" onClick={handleOpen} sx={{ mb: 2 }} disabled={!user}>
        Create Task
      </Button>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table aria-label="tasks table">
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Task Name</TableCell>
              <TableCell>Task Description</TableCell>
              <TableCell align="right">Done</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task._id}>
                <TableCell>{task.userName}</TableCell>
                <TableCell>{task.email}</TableCell>
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell align="right">
                  <Checkbox
                    checked={task.isDone}
                    onChange={() => handleToggleCompletion(task._id, task.isDone)}
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDeleteTask(task._id)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => handleOpenEditDialog(task)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleViewDetails(task._id)} key={task._id}>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" sx={{ mt: 2, display: 'flex', justifyContent: 'center' }} />
      <Dialog open={openModal} onClose={handleClose}>
        <DialogTitle>Create a New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Task Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox name="isDone" onChange={handleChange} />}
            label="Done"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Task Name"
            type="text"
            fullWidth
            variant="standard"
            value={editTask?.name || ''}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={editTask?.description || ''}
            onChange={handleEditChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleSubmitEdit}>Save</Button>
        </DialogActions>
      </Dialog>


      <Dialog open={openDetails} onClose={handleCloseDetails}>
        <Card sx={{ minWidth: 275, m: 2 }}>
          <CardContent>
            <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
              Task Details
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.primary">
              {selectedTask?.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.primary">
              {selectedTask?.description}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.primary">
              {selectedTask?.isDone ? 'Done' : 'Pending'}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.primary">
              {selectedTask?.createdAt && new Date(selectedTask?.createdAt).toLocaleString() ? selectedTask?.updatedAt && new Date(selectedTask?.updatedAt).toLocaleString() : 'No date'} 
            </Typography>
              
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleCloseDetails}>Close</Button>
          </CardActions>
        </Card>
      </Dialog>
    </Container>
  );
}

