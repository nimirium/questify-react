interface Task {
    id: string;
    text: string;
    completed: boolean;
    tags: string[];
    questName: string;
    questDescription: string;
}

type TaskStatus = 'generating' | 'ready' | 'error';
