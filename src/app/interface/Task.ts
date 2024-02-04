export interface Task {
    _id: string;
    name: string;
    description: string;
    isDone: boolean;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
    userId?: string;
    userName?: string;
    email?: string;
}

export interface FetchTasksResponse {
    tasks: Task[];
    totalPages: number;
}

