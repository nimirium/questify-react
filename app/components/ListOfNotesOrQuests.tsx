import {Reducer, useEffect, useReducer} from "react";
import ToDoNoteOrQuest from "./ToDoNoteOrQuest";
import TagButton from "./TagButton";
import AddIcon from "@mui/icons-material/Add";
import {notesReducer} from "../reducers/NotesReducer";
import {COLOR,} from "../constants";
import {emptyNote} from "../fixtures/NoteFixture"


export default function ListOfNotesOrQuests() {

    const [notes, dispatch] = useReducer(notesReducer, [emptyNote()]);

    useEffect(() => {
        const initialNotes = localStorage.getItem('notes');
        console.log(`initialNotes: ${initialNotes}`)
        if (initialNotes != null && initialNotes.length > 0) {
            dispatch({type: 'setNotes', notes: JSON.parse(initialNotes)});
        } else {
            dispatch({type: 'setNotes', notes: [emptyNote()]});
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    function deleteNote(noteId: string) {
        if (confirm('Are you sure you want to delete this note?')) {
            dispatch({type: 'deleteNote', noteId: noteId})
        }
    }

    function setNoteTitle(noteId: string, newTitle: string) {
        dispatch({type: 'setNoteTitle', noteId: noteId, title: newTitle})
    }

    console.log(`notes: ${JSON.stringify(notes)}`)

    return (
        <>
            {notes.map(note => <ToDoNoteOrQuest note={note}
                                                dispatch={dispatch}
                                                key={note.id}
            />)}
            <div className="flex flex-col items-center">
                <TagButton tag="Add note" color={COLOR.BLUE} onClick={() => dispatch({type: 'addNote'})} icon={() => <AddIcon/>}/>
            </div>
        </>
    )

}
