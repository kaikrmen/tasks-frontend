import Swal from 'sweetalert2';
import { FetchTasksResponse, Task } from '../interface/Task';

export const toggleTaskCompletion = async (
  taskId: string,
  isDone: boolean,
  userId: string,
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
): Promise<void> => {
    try {
        if (!userId) {
            throw new Error('User ID is missing');
        }

        const response = await fetch(`/api/task/${taskId}/toggle?userId=${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to update task');
        }

        setTasks(currentTasks =>
            currentTasks.map(task =>
                task._id === taskId ? { ...task, isDone: !isDone } : task
            )
        );

        Swal.fire({
            title: 'Success!',
            text: 'Task updated successfully',
            icon: 'success',
            confirmButtonText: 'Ok',
        });
    } catch (error) {
        console.error(error);
        Swal.fire({
            title: 'Error!',
            text: 'Something went wrong. Please try again later',
            icon: 'error',
            confirmButtonText: 'Ok',
        });
    }
};

export const deleteTask = async (
  taskId: string,
  userId: string,
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
): Promise<void> => {
    try {
        if (!userId) {
            throw new Error('User ID is missing');
        }

        const response = await fetch(`/api/task/${taskId}?userId=${userId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete task');
        }

        setTasks(currentTasks =>
            currentTasks.filter(task => task._id !== taskId)
        );

        Swal.fire({
            title: 'Success!',
            text: 'Task deleted successfully',
            icon: 'success',
            confirmButtonText: 'Ok',
        });
    } catch (error) {
        console.error(error);
        Swal.fire({
            title: 'Error!',
            text: 'Something went wrong. Please try again later',
            icon: 'error',
            confirmButtonText: 'Ok',
        });
    }
};

export const updateTask = async (
  taskId: string,
  name: string,
  description: string,
  userId: string,
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
): Promise<void> => {
    try {
        if (!userId) {
            throw new Error('User ID is missing');
        }

        const response = await fetch(`/api/task/${taskId}?userId=${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, description }),
        });

        if (!response.ok) {
            throw new Error('Failed to update task');
        }

        setTasks(currentTasks =>
            currentTasks.map(task =>
                task._id === taskId ? { ...task, name, description } : task
            )
        );

        Swal.fire({
            title: 'Success!',
            text: 'Task updated successfully',
            icon: 'success',
            confirmButtonText: 'Ok',
        });
    } catch (error) {
        console.error(error);
        Swal.fire({
            title: 'Error!',
            text: 'Something went wrong. Please try again later',
            icon: 'error',
            confirmButtonText: 'Ok',
        });
    }
};

export const fetchTasks = async (userId?: string, page?: number): Promise<FetchTasksResponse> => {
    try {
      const response = await fetch(`/api/task?userId=${userId}&page=${page}`);
      if (!response.ok) throw new Error('Data fetching failed');
      const data: FetchTasksResponse = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

export const oneTask = async (taskId: string, userId: string): Promise<Task> => {
    try {
        const response = await fetch(`/api/task/${taskId}?userId=${userId}`);
        if (!response.ok) throw new Error('Data fetching failed');
        const data: Task = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}
  