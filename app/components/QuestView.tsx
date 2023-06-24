import ColorButton from "./TagButton";
import {COLOR} from "../constants";
import NoteTitle from "./NoteTitle";
import {useEffect, useState} from "react";
import axios from 'axios';
import LoadingIndicator from "./LoadingIndicator";
import QuestTitleRow from "./QuestTitleRow";
import QuestDescriptionRow from "./QuestDescriptionRow";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AutorenewIcon from '@mui/icons-material/Autorenew';

export default function QuestView({noteId, tasks, setTasks, title, handleTaskCompletion, setQuestView}: NoteProps) {
    // const [status, setStatus] = useState<TaskStatus>("error");
    const [status, setStatus] = useState<TaskStatus>("generating");
    const [selectedQuest, setSelectedQuest] = useState<string | null>(null);
    const [questlineName, setQuestlineName] = useState<string>(title);

    const questTasks = tasks.filter(t => t.text.length > 0);

    useEffect(() => {
        const initialQuestlineName = localStorage.getItem(`note_${noteId}_questlineName`) ?? '';
        if (initialQuestlineName != null) {
            setQuestlineName(initialQuestlineName);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(`note_${noteId}_questlineName`, questlineName);
    }, [questlineName]);

    function generateQuests(tasks: Task[]) {
        if (tasks.length > 0) {
            setStatus("generating");
            // axios.post(`http://localhost:5000/questify`, tasks.filter(t => t.text.length > 0))
            axios.post(`https://questify-72477d5ba67d.herokuapp.com/questify`, tasks.filter(t => t.text.length > 0))
                .then(res => {
                    const quests = res.data.quests;
                    setTasks(tasks => {
                        return [...tasks].map(t => {
                            const quest = quests[t.id];
                            if (quest) {
                                return {...t, questName: quest.questName, questDescription: quest.questDescription};
                            } else {
                                return t;
                            }
                        })
                    })
                    setStatus("ready")
                    setQuestlineName(res.data.questlineName)
                }).catch(err => {
                console.error(err);
                setStatus("error")
            });
            return;
        } else {
            setStatus("ready");
        }

    }

    useEffect(() => {
        if (status == "ready") {
            return;
        }
        const tasksWithoutQuests = questTasks.filter((task) => task.questName == null || task.questName.length === 0);
        generateQuests(tasksWithoutQuests);
    }, [])

    function regenerateAll() {
        generateQuests(questTasks);
    }

    function handleQuestTitleClick(id: string) {
        setSelectedQuest(id === selectedQuest ? null : id);
    }

    return (
        <>
            <div className="flex justify-center">
                <div className="flex flex-col grow bg-amber-800 p-6 m-5 rounded-lg text-amber-200 text-lg drop-shadow max-w-3xl">

                    <NoteTitle title={questlineName} setTitle={setQuestlineName}/>

                    {status === "generating" && <LoadingIndicator text={"Generating quests..."}/>}

                    {status === "error" &&
                        <div className="text-center">Could not generate quests, please try again.</div>
                    }

                    {status === "ready" && questTasks.map((task, index) => {
                        return (
                            <div key={task.id} className="my-2 border border-stone-300 rounded-lg bg-amber-700 text-amber-50">
                                <QuestTitleRow task={task}
                                               onClick={() => handleQuestTitleClick(task.id)}
                                               handleTaskCompletion={handleTaskCompletion}/>
                                {selectedQuest === task.id &&
                                <QuestDescriptionRow task={task}/>}
                            </div>);
                    })}

                    <div className="flex justify-center text-center pt-2 pb-3 text-amber-800">
                        <ColorButton tag="To-Do View" color="bg-amber-300" onClick={() => setQuestView(false)} icon={() => <ArrowBackIcon/>}/>
                        {['ready', 'error'].includes(status) && <ColorButton tag="Regenerate" color={COLOR.ORANGE} onClick={regenerateAll} icon={() => <AutorenewIcon/>}/>}
                    </div>

                </div>
            </div>
        </>
    );
}
