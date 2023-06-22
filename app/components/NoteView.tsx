import TaskRow from "./TaskRow";
import {useEffect, useState} from "react";
import ColorButton from "./TagButton";
import {COLOR, TAG, tagScores} from "../constants";
import SortIcon from '@mui/icons-material/Sort';
import NoteTitle from "./NoteTitle";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import AddIcon from '@mui/icons-material/Add';

export default function NoteView({tasks, setTasks, title, setTitle, handleTaskCompletion, setQuestView}: NoteProps) {
    const [toFocus, setToFocus] = useState<string | null>(null);
    const [tag, setTag] = useState<string | null>(null);

    useEffect(() => {
        if (toFocus != null) {
            const input: HTMLInputElement = document.getElementById(toFocus.toString()) as HTMLInputElement;
            if (input) {
                input.focus();
                input.selectionStart = input.selectionEnd = input.value.length;  // keep the cursor at the end of the text
            }
            setToFocus(null);
        }
    }, [toFocus]);

    const handleTaskTextChange: HandleTaskTextChange = (index, text) => {
        if ('\n' === text.slice(-1)) {
            const newId = crypto.randomUUID();
            setTasks((tasks) => {
                const newTasks = [...tasks];
                newTasks.splice(index + 1, 0, {
                    id: newId,
                    text: "",
                    completed: false,
                    tags: [],
                    questName: "",
                    questDescription: "",
                });
                return newTasks;
            });
            setToFocus(newId);
        } else {
            setTasks((tasks) => tasks.map((task, i) => {
                return i === index ? {...task, text, questName: "", questDescription: ""} : task;
            }));
        }
    }

    const handleTaskKeyPress: HandleKeyPress = (e, index) => {
        if (e.key == "Backspace" && index > 0 && tasks[index].text === "" && tasks.length > 0) {
            e.preventDefault();
            setToFocus(tasks[index - 1].id);
            setTasks((tasks) => {
                const newTasks = [...tasks];
                newTasks.splice(index, 1);
                return newTasks;
            });
        }
    }

    function handleToggleTaskTag(taskIndex: number, tag: string) {
        setTasks((tasks) => tasks.map((task, i) => {
            if (i === taskIndex) {
                if (task.tags.includes(tag)) {
                    return {... task, tags: task.tags.filter(t => t !== tag)};
                } else {
                    return {... task, tags: [...task.tags, tag]};
                }
            }
            return task;
        }));
    }

    function handleToggleFilterTag(newTag: TAG) {
        if (tag == newTag) {
            setTag(null);
        } else {
            setTag(newTag);
        }
    }

    function handleAddTask() {
        const newId = crypto.randomUUID();
        setTasks((notes) => [...notes, {
            id: newId,
            text: "",
            completed: false,
            tags: [],
            questName: "",
            questDescription: "",
        }]);
        setToFocus(newId);
    }

    let displayTasks = tag ? tasks.filter(task => task.tags.includes(tag)) : tasks

    const taskElements = displayTasks.map((task, index) =>
        <TaskRow key={task.id} task={task}
                 index={index}
                 updateTaskCompletion={handleTaskCompletion}
                 updateTaskText={handleTaskTextChange}
                 handleKeyPress={handleTaskKeyPress}
                 toggleTag={handleToggleTaskTag}
                 autoFocus={toFocus === task.id}
        />);

    function onAutoSortTasks() {
        setTasks((tasks) => [...tasks].sort((a, b) => {
            const aScore = a.tags.reduce((score, tag) => score + (tagScores[tag] || 0), 0);
            const bScore = b.tags.reduce((score, tag) => score + (tagScores[tag] || 0), 0);

            // If both tasks are completed or uncompleted, sort by score.
            if ((a.completed && b.completed) || (!a.completed && !b.completed)) {
                return bScore - aScore;
            }

            // If only one task is completed, that task goes last.
            return a.completed ? 1 : -1;
        }));
    }

    return (
        <div className="flex justify-center mx-2">
            <div className="flex flex-col grow bg-amber-100 md:p-6 md:m-5 rounded-lg text-cyan-700 text-lg drop-shadow max-w-3xl">

                <div>
                    <SortIcon className="float-left m-3" onClick={onAutoSortTasks}/>
                </div>

                <NoteTitle title={title} setTitle={setTitle}/>

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

                {taskElements}

                <div className="flex justify-center text-center pt-2 pb-3">
                    <ColorButton tag="Add" color={COLOR.BLUE} onClick={handleAddTask} icon={() => <AddIcon/>}/>
                    <ColorButton tag="Questify" color={COLOR.VIOLET} onClick={() => setQuestView(true)}
                                 icon={() => <AutoFixHighIcon/>}/>
                </div>

            </div>
        </div>
    );
}
