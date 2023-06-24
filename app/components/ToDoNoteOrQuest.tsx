import NoteView from "./NoteView";
import {useEffect, useState} from "react";
import QuestView from "./QuestView";

export default function ToDoNoteOrQuest ({noteId, deleteNote}: {noteId: string, deleteNote: (noteId: string) => void}) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState<string>('');
    const [questView, setQuestView] = useState<boolean>(false);

    useEffect(() => {
        // Initialize tasks and note title from local storage
        const firstId =  '1';
        let initialTasks = localStorage.getItem(`note_${noteId}_tasks`);
        if (!initialTasks && noteId == '1') {
            initialTasks = localStorage.getItem(`tasks`);
        }
        const initialTitle = localStorage.getItem(`note_${noteId}_title`) ?? '';
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
        localStorage.setItem(`note_${noteId}_tasks`, JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem(`note_${noteId}_title`, title);
    }, [title]);

    const handleTaskCompletion: HandleTaskCompletion = (id, completed) => {
        setTasks((tasks) => tasks.map((task) => {
            return task.id === id ? {...task, completed} : task;
        }));
    }

    return (
        <>
            {questView ?
                <QuestView noteId={noteId} tasks={tasks} setTasks={setTasks} title={title} setTitle={setTitle}
                           handleTaskCompletion={handleTaskCompletion} setQuestView={setQuestView} deleteNote={deleteNote}/> :
                <NoteView noteId={noteId} tasks={tasks} setTasks={setTasks} title={title} setTitle={setTitle}
                          handleTaskCompletion={handleTaskCompletion} setQuestView={setQuestView} deleteNote={deleteNote}/>}

        </>
    )
}
