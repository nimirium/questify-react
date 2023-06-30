export function emptyTask() {
    return {
        id: '1',
        text: '',
        completed: false,
        tags: [],
        questName: '',
        questDescription: '',
    };
}

export function emptyNote() {
    return {
        id: '1',
        tasks: [emptyTask()],
        title: '',
        questlineName: ''
    };
}
