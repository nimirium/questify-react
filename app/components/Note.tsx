import ToDo from "./ToDo";
import {useEffect, useState} from "react";
import ColorButton from "./TagButton";
import {COLOR, TAG} from "../constants";
import SortIcon from '@mui/icons-material/Sort';

export default function Note() {
    const firstId = Date.now();
    const initialTasks = () => {
        const localTasks = localStorage.getItem('tasks');
        return localTasks ? JSON.parse(localTasks) : [
            {
                id: firstId,
                text: "",
                completed: false,
                tags: [],
            }
        ];
    };
    const initialTitle = () => {
        const localTitle = localStorage.getItem('title');
        return localTitle ? localTitle : "";
    };

    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [toFocus, setToFocus] = useState<number | null>(null);
    const [tag, setTag] = useState<string | null>(null);
    const [title, setTitle] = useState<string>(initialTitle);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem('title', title);
    }, [title]);

    useEffect(() => {
        if (toFocus !== null) {
            const input: HTMLInputElement = document.getElementById(toFocus.toString()) as HTMLInputElement;
            if (input) {
                input.focus();
                input.selectionStart = input.selectionEnd = input.value.length;  // keep the cursor at the end of the text
            }
            // Clear the toFocus after the focus operation has been attempted
            setToFocus(null);
        }
    }, [toFocus]);

    const updateTaskCompletion: UpdateTaskCompletion = (i, completed) => {
        setTasks((tasks) => tasks.map((task) => {
            return task.id === i ? {...task, completed} : task;
        }));
    }

    const updateTaskText: UpdateTaskText = (index, text) => {
        if ('\n' === text.slice(-1)) {
            const newId = Date.now();
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
            setTasks((tasks) => {
                const newTasks = [...tasks];
                newTasks.splice(index, 1);
                return newTasks;
            });
            setToFocus(tasks[index - 1].id);
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

    let displayTasks = tag ? tasks.filter(task => task.tags.includes(tag)) : tasks

    const taskElements = displayTasks.map((task, index) =>
        <ToDo key={task.id} task={task}
              index={index}
              updateTaskCompletion={updateTaskCompletion}
              updateTaskText={updateTaskText}
              handleKeyPress={handleDeleteTask}
              toggleTag={toggleTaskTag}
        />);

    function toggleFilterTag(newTag: TAG) {
        if (tag == newTag) {
            setTag(null);
        } else {
            setTag(newTag);
        }
    }

    function addTask() {
        const newId = Date.now();
        setTasks((notes) => [...notes, {
            id: newId,
            text: "",
            completed: false,
            tags: [],
        }]);
        setToFocus(newId);
    }

    return (
        <>
            <div className="flex justify-center">
                <div className="flex flex-col grow bg-amber-100 p-6 m-5 rounded-lg text-cyan-700 text-lg drop-shadow max-w-3xl">

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
                        <SortIcon className="m-2"/>
                    </div>

                    {taskElements}

                    <div className="flex justify-center text-center pt-2 pb-3">
                        <ColorButton tag="Add" color={COLOR.BLUE} onClick={addTask}/>
                    </div>

                </div>
            </div>
        </>
    );
}
