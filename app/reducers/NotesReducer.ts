import {tagScores} from "../constants";
import {emptyNote, emptyTask} from "../fixtures/NoteFixture";

export const notesReducer = (prevState: Note[], action: NoteAction): Note[] => {
    switch (action.type) {

        case 'setNotes':
            return action.notes;
        case 'addNote':
            const nextId = Object.keys(prevState).reduce((maxId, noteId) => Math.max(maxId, parseInt(noteId)), 0) + 1;
            const nextNote: Note = {...emptyNote(), id: nextId.toString()};
            return [...prevState, nextNote];
        case 'deleteNote':
            if (confirm('Are you sure you want to delete this note?')) {
                return prevState.filter(note => action.noteId !== note.id);
            }
            break;
        case 'setNoteTitle':
            return prevState.map(note => {
                if (note.id === action.noteId && action.title != null) {
                    return {...note, title: action.title};
                } else {
                    return note;
                }
            })
        case 'setQuestlineName':
            return prevState.map(note => {
                if (note.id === action.noteId && action.questlineName != null) {
                    return {...note, questlineName: action.questlineName};
                } else {
                    return note;
                }
            })

        case 'addTask':
            return prevState.map((note) => {
                if (note.id === action.noteId) {
                    const nextId = action.newId || note.tasks.reduce((maxId, task) => Math.max(maxId, parseInt(task.id)), 0) + 1;
                    const nextTasks = [...note.tasks];
                    nextTasks.splice(action.index + 1, 0, {...emptyTask(), id: nextId.toString()});
                    return {...note, tasks: nextTasks};
                } else {
                    return note;
                }
            })
        case 'deleteTask':
            return prevState.map(note => {
                if (note.id === action.noteId) {
                    const newTasks = [...note.tasks];
                    newTasks.splice(action.index, 1);
                    return {...note, tasks: newTasks};
                } else {
                    return note;
                }
            })
        case 'changeTaskText':
            return prevState.map(note => {
                if (note.id === action.noteId) {
                    const newTasks = [...note.tasks];
                    newTasks[action.index].text = action.text;
                    newTasks[action.index].questName = '';
                    newTasks[action.index].questDescription = '';
                    return {...note, tasks: newTasks};
                } else {
                    return note;
                }
            })
        case 'toggleTaskTag':
            return prevState.map(note => {
                if (note.id === action.noteId) {
                    const newTasks = [...note.tasks];
                    if (newTasks[action.index].tags.includes(action.tag)) {
                        newTasks[action.index].tags = newTasks[action.index].tags.filter(tag => tag !== action.tag);
                    } else {
                        newTasks[action.index].tags.push(action.tag);
                    }
                    return {...note, tasks: newTasks};
                } else {
                    return note;
                }
            })
        case 'changeQuests':
            return prevState.map(note => {
                if (note.id === action.noteId) {
                    const newTasks = [...note.tasks].map(t => {
                        const quest = action.quests[t.id];
                        if (quest) {
                            return {...t, questName: quest.questName, questDescription: quest.questDescription};
                        } else {
                            return t;
                        }
                    });
                    return {...note, tasks: newTasks}
                } else {
                    return note;
                }
            })
        case 'changeTaskCompletion':
            return prevState.map(note => {
                if (note.id === action.noteId) {
                    return {
                        ...note,
                        tasks: note.tasks.map(t => {
                            if (t.id == action.taskId) {
                                return {...t, completed: action.completed}
                            }
                            return {...t}
                        })
                    };
                } else {
                    return note;
                }
            })
        case 'changeTaskOrder':
            return prevState.map(note => {
                if (note.id === action.noteId) {
                    const newTasks = [...note.tasks];
                    const task = newTasks.splice(action.index, 1)[0];
                    newTasks.splice(action.dstIndex, 0, task);
                    return {...note, tasks: newTasks};
                } else {
                    return note;
                }
            })
        case 'autoSortTasks':
            return prevState.map(note => {
                if (note.id === action.noteId) {
                    const newTasks = [...note.tasks];
                    newTasks.sort((a, b) => {
                        const aScore: number = a.tags.reduce((score, tag) => tagScores[tag] ? score + tagScores[tag] : 0, 0);
                        const bScore: number = b.tags.reduce((score, tag) => tagScores[tag] ? score + tagScores[tag] : 0, 0);

                        // If both tasks are completed or uncompleted, sort by score.
                        if ((a.completed && b.completed) || (!a.completed && !b.completed)) {
                            return bScore - aScore;
                        }

                        // If only one task is completed, that task goes last.
                        return a.completed ? 1 : -1;
                    })
                    return {...note, tasks: newTasks};
                } else {
                    return note;
                }
            })
        default:
            console.error(`Unknown action: ${JSON.stringify(action)}`);
            return prevState;
    }
    return prevState;
}
