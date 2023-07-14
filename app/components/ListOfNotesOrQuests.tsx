import {useEffect, useReducer} from "react";
import ToDoNoteOrQuest from "./ToDoNoteOrQuest";
import Button from "./ui/Button";
import AddIcon from "@mui/icons-material/Add";
import {notesReducer} from "../reducers/NotesReducer";
import {COLOR,} from "../constants";
import {emptyNote} from "../fixtures/NoteFixture"
import { appVersion } from "../fixtures/Version";


export default function ListOfNotesOrQuests() {

    const [notes, dispatch] = useReducer(notesReducer, [emptyNote()]);

    useEffect(() => {
        const oldVersion = localStorage.getItem('questifyVersion');
        const oldMajorVersion = oldVersion?.split('.')[0];
        const majorVersion = appVersion.split('.')[0];
        if (oldVersion == null || oldMajorVersion !== majorVersion) {
            localStorage.clear();
            localStorage.setItem('questifyVersion', appVersion);
        }
        const initialNotes = localStorage.getItem('notes');
        if (initialNotes != null && initialNotes.length > 0) {
            dispatch({type: 'setNotes', notes: JSON.parse(initialNotes)});
        } else {
            dispatch({type: 'setNotes', notes: [emptyNote()]});
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);


    return (
        <>
            {notes.map(note => <ToDoNoteOrQuest note={note} dispatch={dispatch} key={note.id} />)}
            <div className="flex flex-col items-center">
                <Button text="Add note" color={COLOR.BLUE} icon={() => <AddIcon />}
                           onClick={() => dispatch({ type: 'addNote' })}
                />
            </div>
        </>
    )

}
