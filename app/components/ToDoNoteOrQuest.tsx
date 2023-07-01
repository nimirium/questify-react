import NoteView from "./note-view/NoteView";
import React, { useEffect, useState } from "react";
import QuestView from "./quest-view/QuestView";

interface ToDoNoteOrQuestProps {
    note: Note;
    dispatch: (action: NoteAction) => void;
}

export default function ToDoNoteOrQuest({ note, dispatch }: ToDoNoteOrQuestProps) {
    const [questView, setQuestView] = useState<boolean>(false);

    return (
        <>
            {questView ?
                <QuestView note={note} dispatch={dispatch} setQuestView={setQuestView} /> :
                <NoteView note={note} dispatch={dispatch} setQuestView={setQuestView} />}

        </>
    )
}
