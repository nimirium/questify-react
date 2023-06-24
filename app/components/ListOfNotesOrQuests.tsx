import ToDoNoteOrQuest from "./ToDoNoteOrQuest";
import {useEffect, useState} from "react";
import TagButton from "./TagButton";
import {COLOR} from "../constants";
import AddIcon from "@mui/icons-material/Add";

export default function ListOfNotesOrQuests() {
    const [notes, setNotes] = useState<string[]>([]);
    const [deletedNote, setDeletedNote] = useState<string | null>(null);

    useEffect(() => {
        const initialNotes = localStorage.getItem('notes');
        if (initialNotes != null && initialNotes.length > 0) {
            setNotes(JSON.parse(initialNotes));
        } else {
            setNotes(["1"]);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    useEffect(() => {
        if (deletedNote != null) {
            localStorage.removeItem(`note_${deletedNote}_tasks`);
            localStorage.removeItem(`note_${deletedNote}_title`);
            localStorage.removeItem(`note_${deletedNote}_questlineName`);
            setDeletedNote(null);
        }
    }, [deletedNote]);



    function addNote() {
        const nextId = notes.reduce((maxId, id) => Math.max(maxId, parseInt(id)), 0) + 1;
        setNotes([...notes, nextId.toString()]);
    }

    function deleteNote(noteId: string) {
        if (confirm('Are you sure you want to delete this note?')) {
            setNotes(notes.filter(id => noteId !== id));
            setDeletedNote(noteId);
        }
    }


    return (
        <>
            {notes.map(noteId => <ToDoNoteOrQuest noteId={noteId} deleteNote={deleteNote} key={noteId}/>)}
            <div className="flex flex-col items-center text-xl">
                <TagButton tag="Add note" color={COLOR.BLUE} onClick={addNote} icon={() => <AddIcon/>}/>
            </div>
        </>
    )

}
