import ColorButton from "./TagButton";
import {COLOR} from "../constants";
import NoteTitle from "./NoteTitle";
import {useEffect, useState} from "react";
import axios from 'axios';
import LoadingIndicator from "./LoadingIndicator";
import QuestTitleRow from "./QuestTitleRow";
import QuestDescriptionRow from "./QuestDescriptionRow";

export default function QuestView({tasks, setTasks, title, setTitle, handleTaskCompletion, setQuestView}: NoteProps) {
    const [status, setStatus] = useState<TaskStatus>("generating");
    const [selectedQuest, setSelectedQuest] = useState<string | null>(null);

    function generateQuests(tasks: Task[]) {
        if (tasks.length > 0) {
            setStatus("generating");
            axios.post(`http://localhost:5000/questify`, tasks)
                .then(res => {
                    const quests = res.data;
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
        console.log(`tasks: ${JSON.stringify(tasks)}`)
        const tasksWithoutQuests = tasks.filter((task) => task.questName == null || task.questName.length === 0);
        console.log(`tasksWithoutQuests: ${JSON.stringify(tasksWithoutQuests)}`)
        generateQuests(tasksWithoutQuests);
    }, [])

    function regenerateAll() {
        generateQuests(tasks);
    }

    return (
        <>
            <div className="flex justify-center">
                <div className="flex flex-col grow bg-amber-100 p-6 m-5 rounded-lg text-cyan-700 text-lg drop-shadow max-w-3xl">

                    <div>status: {status}</div>

                    <NoteTitle title={title} setTitle={setTitle}/>

                    {status === "generating" && <LoadingIndicator/>}

                    {status === "ready" && tasks.map((task, index) => {
                        return (
                            <div key={task.id} className="my-2 p-2 border border-stone-500 rounded-lg" onClick={() => setSelectedQuest(task.id)}>
                                <QuestTitleRow task={task} handleTaskCompletion={handleTaskCompletion}/>
                                {selectedQuest === task.id &&
                                <QuestDescriptionRow questDescription={task.questDescription}/>}
                            </div>);
                    })}

                    <div className="flex justify-center text-center pt-2 pb-3">
                        {status == 'ready' && <ColorButton tag="Regenerate" color={COLOR.ORANGE} onClick={regenerateAll}/>}
                        <ColorButton tag="Back to To-Do View" color={COLOR.VIOLET} onClick={() => setQuestView(false)}/>
                    </div>

                </div>
            </div>
        </>
    );
}
