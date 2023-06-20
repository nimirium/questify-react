type UpdateTaskCompletion = (id: string, completed: boolean) => void;
type UpdateTaskText = (index: number, text: string) => void;
type HandleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>, index: number) => void;
type ToggleTag = (index: number, tag: string) => void;

type NoteItemProps = {
    task: Task;
    index: number,
    updateTaskCompletion: UpdateTaskCompletion;
    updateTaskText: UpdateTaskText;
    handleKeyPress: HandleKeyPress;
    toggleTag: ToggleTag;
    autoFocus: boolean;
};

type TagButtonProps = {
    tag: string;
    color: string;
    onClick: () => void;
}
