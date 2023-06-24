import NoteView from "./NoteView";
import {useEffect, useState} from "react";
import QuestView from "./QuestView";

export default function ToDoNoteOrQuest () {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState<string>('');
    const [questView, setQuestView] = useState<boolean>(false);

    useEffect(() => {
        // Initialize tasks and note title from local storage
        const firstId =  '1';
        const initialTasks = localStorage.getItem('tasks');
        const initialTitle = localStorage.getItem('title') ?? '';
        setTasks(initialTasks ? JSON.parse(initialTasks) : [
            {
                id: firstId,
                text: "",
                completed: false,
                tags: [],
            }
        ]);
        if (initialTitle != null) {
            setTitle(initialTitle);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem('title', title);
    }, [title]);

    const handleTaskCompletion: HandleTaskCompletion = (id, completed) => {
        setTasks((tasks) => tasks.map((task) => {
            return task.id === id ? {...task, completed} : task;
        }));
    }

    return (
        <>
            {questView ?
                <QuestView tasks={tasks} setTasks={setTasks} title={title} setTitle={setTitle}
                           handleTaskCompletion={handleTaskCompletion} setQuestView={setQuestView}/> :
                <NoteView tasks={tasks} setTasks={setTasks} title={title} setTitle={setTitle}
                          handleTaskCompletion={handleTaskCompletion} setQuestView={setQuestView}/>}

        </>
    )
}
