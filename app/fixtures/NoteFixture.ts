export const emptyTask: Task = {
    id: '1',
    text: '',
    completed: false,
    tags: [],
    questName: '',
    questDescription: '',
};

export const emptyNote: Note = {
    id: '1',
    tasks: [{...emptyTask}],
    title: '',
    questlineName: ''
}
