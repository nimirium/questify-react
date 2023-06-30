type HandleTaskCompletion = (id: string, completed: boolean) => void;
type HandleTaskTextChange = (index: number, text: string) => void;
type HandleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>, index: number) => void;
type ToggleTag = (index: number, tag: string) => void;

type ToDoComponentProps = {
    noteId: string;
    task: Task;
    index: number,
    updateTaskCompletion: HandleTaskCompletion;
    updateTaskText: HandleTaskTextChange;
    handleKeyPress: HandleKeyPress;
    toggleTag: ToggleTag;
    autoFocus: boolean;
};

type TagButtonProps = {
    tag: string;
    tinyTag?: string;
    color: string;
    onClick: () => void;
    icon?: () => JSX.Element;
}

type NoteAction =
    {type: "setNotes", notes: Note[]} |
    {type: "addNote"} |
    {type: "deleteNote", noteId: string} |
    {type: "setNoteTitle", noteId: string, title: string} |
    {type: "setQuestlineName", noteId: string, questlineName: string} |

    {type: "addTask", noteId: string, index: number, newId?: string} |
    {type: "deleteTask", noteId: string, index: number} |
    {type: "changeTaskText", noteId: string, index: number, text: string} |
    {type: "toggleTaskTag", noteId: string, index: number, tag: string} |
    {type: "changeQuests", noteId: string, quests: { [id: string]: { questName: string, questDescription: string } }} |
    {type: "changeTaskCompletion", noteId: string, taskId: string, completed: boolean} |
    {type: "changeTaskOrder", noteId: string, index: number, dstIndex: number} |
    {type: "autoSortTasks", noteId: string};


type NoteComponentProps = {
    note: Note;
    dispatch: (action: NoteAction) => void;
    // noteId: string;
    // tasks: Task[];
    // setTasks: (tasks: Task[]) => void;
    // title: string;
    // setTitle: (title: string) => void;
    // handleTaskCompletion: HandleTaskCompletion;
    setQuestView: React.Dispatch<React.SetStateAction<boolean>>;
    // deleteNote: (noteId: string) => void;
}
