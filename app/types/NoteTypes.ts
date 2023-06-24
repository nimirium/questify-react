type HandleTaskCompletion = (id: string, completed: boolean) => void;
type HandleTaskTextChange = (index: number, text: string) => void;
type HandleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>, index: number) => void;
type ToggleTag = (index: number, tag: string) => void;

type NoteItemProps = {
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

type NoteProps = {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    handleTaskCompletion: HandleTaskCompletion;
    setQuestView: React.Dispatch<React.SetStateAction<boolean>>;
}
