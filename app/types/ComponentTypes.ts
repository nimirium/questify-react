type HandleTaskCompletion = (id: string, completed: boolean) => void;
type HandleTaskTextChange = (index: number, text: string) => void;
type HandleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>, index: number) => void;


type NoteComponentProps = {
    note: Note;
    dispatch: (action: NoteAction) => void;
    setQuestView: React.Dispatch<React.SetStateAction<boolean>>;
}
