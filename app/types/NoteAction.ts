type NoteAction =
    {type: "setNotes", notes: Note[]} |
    {type: "addNote"} |
    {type: "deleteNote", noteId: string} |
    {type: "setNoteTitle", noteId: string, title: string} |
    {type: "setQuestlineName", noteId: string, questlineName: string} |

    {type: "addTask", noteId: string, index: number, tags: string[], newId?: string} |
    {type: "deleteTask", noteId: string, index: number} |
    {type: "changeTaskText", noteId: string, index: number, text: string} |
    {type: "toggleTaskTag", noteId: string, index: number, tag: string} |
    {type: "changeQuests", noteId: string, quests: { [id: string]: { questName: string, questDescription: string } }} |
    {type: "changeTaskCompletion", noteId: string, taskId: string, completed: boolean} |
    {type: "changeTaskOrder", noteId: string, index: number, dstIndex: number} |
    {type: "autoSortTasks", noteId: string};
