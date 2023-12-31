import Button from "../ui/Button";
import { COLOR } from "../../constants";
import NoteTitle from "../note-view/NoteTitle";
import { useEffect, useState } from "react";
import axios from 'axios';
import LoadingIndicator from "../ui/LoadingIndicator";
import QuestTitleRow from "./QuestTitleRow";
import QuestDescriptionRow from "./QuestDescriptionRow";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function QuestView({ note, dispatch, setQuestView }: NoteComponentProps) {
    const [status, setStatus] = useState<TaskStatus>("generating");
    const [generatingQuestId, setGeneratingQuestId] = useState<string | null>(null);
    const [selectedQuest, setSelectedQuest] = useState<string | null>(null);

    const tasks = note.tasks;
    const questTasks = tasks.filter(t => t.text.length > 0);

    function generateQuests(tasks: Task[], updateQuestlineName: boolean, onSuccess: () => void, onError: () => void) {
        if (tasks.length > 0) {
            // axios.post(`http://localhost:5000/questify`, ...)
            const payload = {
                tasks: tasks.filter(t => t.text.length > 0),
                context: {
                    title: note.title,
                    time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
                }
            }
            axios.post(`https://questify-72477d5ba67d.herokuapp.com/v2/questify`, payload)
                .then(res => {
                    dispatch({ type: "changeQuests", noteId: note.id, quests: res.data.quests })
                    if (updateQuestlineName)
                        dispatch({ type: "setQuestlineName", noteId: note.id, questlineName: res.data.questlineName })
                    onSuccess();
                }).catch(err => {
                    console.error(err);
                    onError();
                });
            return;
        } else {
            onSuccess();
        }

    }

    useEffect(() => {
        if (selectedQuest == null && questTasks.length > 0) {
            const toSelect = questTasks.find(t => !t.completed) || questTasks[0];
            if (toSelect) {
                setSelectedQuest(toSelect.id);
            }
        }

        const tasksWithoutQuests = questTasks.filter((task) => task.questName == null || task.questName.length === 0);
        setStatus("generating");
        generateQuests(tasksWithoutQuests, true, () => setStatus("ready"), () => setStatus("error"))
    }, [])

    function regenerateQuest(task: Task) {
        setGeneratingQuestId(task.id);

        const onSuccess = () => setGeneratingQuestId(null)
        const onError = () => {
            setGeneratingQuestId(null)
            dispatch({
                type: "changeQuests",
                noteId: note.id,
                quests: { [task.id]: { questName: task.text, questDescription: 'Could not generate quest, please try again.' } }
            })
        }

        generateQuests([task], false, onSuccess, onError)
    }

    function handleQuestTitleClick(id: string) {
        setSelectedQuest(id === selectedQuest ? null : id);
    }

    function changeTaskCompletion(id: string, c: boolean) {
        dispatch({ type: "changeTaskCompletion", noteId: note.id, taskId: id, completed: c })
    }

    return (
        <>
            <div className="flex justify-center m-2 w-11/12 sm:w-5/6 md:2/3">
                <div className="flex flex-col grow bg-amber-800 p-6 m-5 rounded-lg text-amber-200 text-sm md:text-lg drop-shadow max-w-3xl">

                    <NoteTitle title={note.questlineName}
                        placeholder="[ Questline name ]"
                        setTitle={(qln) => dispatch({ type: 'setQuestlineName', noteId: note.id, questlineName: qln })} />

                    {status === "generating" && <LoadingIndicator text={"Generating quests..."} />}

                    {status === "error" &&
                        <div className="text-center">Could not generate quests, please try again.</div>
                    }

                    {status === "ready" && questTasks.map((task) => {
                        return (
                            <div key={task.id}
                                className="my-2 border border-stone-300 rounded-lg bg-amber-700 text-amber-50">
                                <QuestTitleRow task={task}
                                    handleQuestTitleClick={() => handleQuestTitleClick(task.id)}
                                    handleTaskCompletion={changeTaskCompletion} />
                                {selectedQuest === task.id &&
                                    <QuestDescriptionRow task={task}
                                        generating={generatingQuestId == task.id}
                                        canRegenerate={generatingQuestId == null}
                                        regenerateQuest={regenerateQuest} />}
                            </div>);
                    })}

                    <div className="flex justify-center text-center pt-2 pb-3 text-amber-800">
                        <Button text="To-Do View" color="bg-amber-300" onClick={() => setQuestView(false)} icon={() => <ArrowBackIcon />} />
                    </div>

                </div>
            </div>
        </>
    );
}
