import TaskRow from "./TaskRow";
import {useEffect, useState} from "react";
import ColorButton from "./TagButton";
import {COLOR, TAG} from "../constants";
import SortIcon from '@mui/icons-material/Sort';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function Note() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [toFocus, setToFocus] = useState<string | null>(null);
    const [tag, setTag] = useState<string | null>(null);
    const [title, setTitle] = useState<string>('');

    useEffect(() => {
        // Initialize tasks and note title from local storage
        const firstId =  crypto.randomUUID();
        const initialTasks = localStorage.getItem('tasks');
        const initialTitle = localStorage.getItem('title') ?? '';
        setTasks(initialTasks ? JSON.parse(initialTasks) : [
            {
                id: firstId,
                text: "",
                completed: false,
                tags: [],
            }
        ]);
        if (initialTitle != null) {
            setTitle(initialTitle);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem('title', title);
    }, [title]);

    useEffect(() => {
        if (toFocus != null) {
            const input: HTMLInputElement = document.getElementById(toFocus.toString()) as HTMLInputElement;
            if (input) {
                input.focus();
                input.selectionStart = input.selectionEnd = input.value.length;  // keep the cursor at the end of the text
            }
            // Clear the toFocus after the focus operation has been attempted
            setToFocus(null);
        }
    }, [toFocus]);

    const updateTaskCompletion: UpdateTaskCompletion = (id, completed) => {
        setTasks((tasks) => tasks.map((task) => {
            return task.id === id ? {...task, completed} : task;
        }));
    }

    const updateTaskText: UpdateTaskText = (index, text) => {
        if ('\n' === text.slice(-1)) {
            const newId = crypto.randomUUID();
            setTasks((tasks) => {
                const newTasks = [...tasks];
                newTasks.splice(index + 1, 0, {
                    id: newId,
                    text: "",
                    completed: false,
                    tags: [],
                });
                return newTasks;
            });
            setToFocus(newId);
        } else {
            setTasks((tasks) => tasks.map((task, i) => {
                return i === index ? {...task, text} : task;
            }));
        }
    }

    const handleDeleteTask: HandleKeyPress = (e, index) => {
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

    function toggleTaskTag(taskIndex: number, tag: string) {
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

    function toggleFilterTag(newTag: TAG) {
        if (tag == newTag) {
            setTag(null);
        } else {
            setTag(newTag);
        }
    }

    function addTask() {
        const newId = crypto.randomUUID();
        setTasks((notes) => [...notes, {
            id: newId,
            text: "",
            completed: false,
            tags: [],
        }]);
        setToFocus(newId);
    }

    let displayTasks = tag ? tasks.filter(task => task.tags.includes(tag)) : tasks

    const taskElements = displayTasks.map((task, index) =>
        <TaskRow key={task.id} task={task}
                 index={index}
                 updateTaskCompletion={updateTaskCompletion}
                 updateTaskText={updateTaskText}
                 handleKeyPress={handleDeleteTask}
                 toggleTag={toggleTaskTag}
                 autoFocus={toFocus === task.id}
        />);

    const tagScores = {
        [TAG.TWO_MINUTES]: 4,
        [TAG.URGENT]: 2,
        [TAG.IMPORTANT]: 1,
    };

    function autoSortTasks() {
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
        <>
            <div className="flex justify-center">
                <div className="flex flex-col grow bg-amber-100 p-6 m-5 rounded-lg text-cyan-700 text-lg drop-shadow max-w-3xl">

                    <div>
                        <SortIcon className="float-left" sx="Auto Sort" onClick={autoSortTasks}/>
                        <DeleteForeverIcon className="float-right" sx="Delete"/>
                    </div>
                    <input type="text"
                           placeholder="[ Note title ]"
                           className="m-1 px-1 grow outline-0 resize-none rounded self-center bg-amber-100 text-center text-2xl w-full"
                           value={title}
                           onChange={(e) => setTitle(e.target.value)}
                    />

                    <div className="flex justify-center text-center pt-2 pb-3 text-sm">
                        <ColorButton tag={TAG.TWO_MINUTES}
                                     color={tag == null || tag === TAG.TWO_MINUTES ? COLOR.GREEN : COLOR.GRAY}
                                     onClick={() => toggleFilterTag(TAG.TWO_MINUTES)}/>
                        <ColorButton tag={TAG.URGENT}
                                     color={tag == null || tag === TAG.URGENT ? COLOR.ORANGE : COLOR.GRAY}
                                     onClick={() => toggleFilterTag(TAG.URGENT)}/>
                        <ColorButton tag={TAG.IMPORTANT}
                                     color={tag == null || tag === TAG.IMPORTANT ? COLOR.YELLOW : COLOR.GRAY}
                                     onClick={() => toggleFilterTag(TAG.IMPORTANT)}/>
                    </div>

                    {taskElements}

                    <div className="flex justify-center text-center pt-2 pb-3">
                        <ColorButton tag="Add" color={COLOR.BLUE} onClick={addTask}/>
                        <ColorButton tag={'Questify'} color={'bg-violet-300'} onClick={() => {}}/>
                    </div>

                </div>
            </div>
        </>
    );
}
