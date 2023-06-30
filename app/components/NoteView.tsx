import TaskRow from "./TaskRow";
import {useEffect, useState} from "react";
import ColorButton from "./TagButton";
import {COLOR, TAG, tagScores} from "../constants";
import SortIcon from '@mui/icons-material/Sort';
import NoteTitle from "./NoteTitle";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {DragDropContext, Droppable, Draggable, DropResult} from "react-beautiful-dnd";

export default function NoteView({note, dispatch, setQuestView}: NoteComponentProps) {
    const [toFocus, setToFocus] = useState<string | null>(null);
    const [tag, setTag] = useState<string | null>(null);
    const tasks = note.tasks;

    useEffect(() => {
        if (toFocus != null) {
            const input: HTMLInputElement = document.getElementById(`input_${note.id}_${toFocus}`) as HTMLInputElement;
            if (input) {
                input.focus();
                input.selectionStart = input.selectionEnd = input.value.length;  // keep the cursor at the end of the text
            }
            setToFocus(null);
        }
    }, [toFocus]);

    const handleTaskTextChange: HandleTaskTextChange = (index, text) => {
        if ('\n' === text.slice(-1)) {
            const newId = (tasks.reduce((maxId, task) => Math.max(Number(task.id), maxId), -1) + 1).toString();
            dispatch({type: 'addTask', noteId: note.id, index: index});
            setToFocus(newId);
        } else {
            dispatch({type: 'changeTaskText', noteId: note.id, index: index, text: text});
        }
    }

    const handleTaskKeyPress: HandleKeyPress = (e, index) => {
        if (e.key == "Backspace" && index > 0 && tasks[index].text === "" && tasks.length > 0) {
            e.preventDefault();
            setToFocus(tasks[index - 1].id);
            dispatch({type: 'deleteTask', noteId: note.id, index: index});
        }
    }

    function handleToggleTaskTag(taskIndex: number, tag: string) {
        dispatch({type: 'toggleTaskTag', noteId: note.id, index: taskIndex, tag: tag});
    }

    function handleToggleFilterTag(newTag: TAG) {
        if (tag == newTag) {
            setTag(null);
        } else {
            setTag(newTag);
        }
    }

    function handleAddTask() {
        const newId = (tasks.reduce((maxId, task) => Math.max(Number(task.id), maxId), -1) + 1).toString();
        dispatch({type: 'addTask', noteId: note.id, index: tasks.length - 1, newId: newId});
        setToFocus(newId);
    }

    function onAutoSortTasks() {
        dispatch({type: 'autoSortTasks', noteId: note.id});
    }

    function handleDragEnd(result: DropResult) {
        if (!result.destination || result.source.index === result.destination?.index) {
            return;
        }
        dispatch({type: 'changeTaskOrder', noteId: note.id, index: result.source.index, dstIndex: result.destination!.index});
        console.log(`Dragged ${result.source.index} to ${result.destination!.index}`);
    }

    let displayTasks = tag ? tasks.filter(task => task.tags.includes(tag)) : tasks

    const taskElements = displayTasks.map((task, index) =>
        (<Draggable key={task.id} draggableId={`${note.id}_${task.id}`} index={index}>
            {(provided) => (
                <div ref={provided.innerRef}
                     className="draggable"
                     {...provided.draggableProps}
                     {...provided.dragHandleProps}
                >
                    <TaskRow key={task.id} task={task} noteId={note.id}
                             index={index}
                             updateTaskCompletion={() => dispatch({
                                 type: 'changeTaskCompletion',
                                 noteId: note.id,
                                 taskId: task.id,
                                 completed: !task.completed
                             })}
                             updateTaskText={handleTaskTextChange}
                             handleKeyPress={handleTaskKeyPress}
                             toggleTag={handleToggleTaskTag}
                             autoFocus={toFocus === task.id}/>
                </div>
            )}

        </Draggable>));

    return (
        <div className="flex justify-center m-2 w-5/6 sm:w-3/4 md:2/3">
            <div className="flex flex-col grow bg-amber-100 md:p-6 md:m-5 rounded-lg text-cyan-700 text-md sm:text-lg drop-shadow max-w-3xl">

                <div>
                    <SortIcon className="float-left m-3" onClick={onAutoSortTasks}/>
                    <DeleteForeverIcon className="float-right m-3"
                                       onClick={() => dispatch({type: 'deleteNote', noteId: note.id})}/>
                </div>

                <NoteTitle title={note.title} setTitle={(t) => dispatch({type: 'setNoteTitle', noteId: note.id, title: t})}/>

                <div className="flex justify-center text-center pt-2 pb-3 text-sm">
                    <ColorButton tag={TAG.TWO_MINUTES}
                                 color={tag == null || tag === TAG.TWO_MINUTES ? COLOR.GREEN : COLOR.GRAY}
                                 onClick={() => handleToggleFilterTag(TAG.TWO_MINUTES)}/>
                    <ColorButton tag={TAG.URGENT}
                                 color={tag == null || tag === TAG.URGENT ? COLOR.ORANGE : COLOR.GRAY}
                                 onClick={() => handleToggleFilterTag(TAG.URGENT)}/>
                    <ColorButton tag={TAG.IMPORTANT}
                                 color={tag == null || tag === TAG.IMPORTANT ? COLOR.YELLOW : COLOR.GRAY}
                                 onClick={() => handleToggleFilterTag(TAG.IMPORTANT)}/>
                </div>

                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId={`droppable-${note.id}`}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}>
                                {taskElements}
                                {provided.placeholder}
                            </div>)}
                    </Droppable>
                </DragDropContext>

                <div className="flex justify-center text-center pt-2 pb-3">
                    <ColorButton tag="Add" color={COLOR.BLUE} onClick={handleAddTask} icon={() => <AddIcon/>}/>
                    <ColorButton tag="Questify" color={COLOR.VIOLET} onClick={() => setQuestView(true)}
                                 icon={() => <AutoFixHighIcon/>}/>
                </div>

            </div>
        </div>
    );
}
