import Checkbox from "../ui/Checkbox";
import React from "react";

interface QuestTitleRowProps {
    task: Task,
    handleQuestTitleClick: () => void,
    handleTaskCompletion: HandleTaskCompletion
}

export default function QuestTitleRow({ task, handleQuestTitleClick, handleTaskCompletion }: QuestTitleRowProps) {

    function handleCheckboxClick(e: any) {
        e.stopPropagation();
        handleTaskCompletion(task.id, !task.completed);
    }


    return (
        <div
            className={"border rounded-lg cursor-pointer text-lg " + (task.completed ? "bg-amber-400" : "bg-amber-600")}

            onClick={handleQuestTitleClick}>

            <div className="flex flex-row p-2">
                <Checkbox className="accent-amber-200" checked={task.completed} onClick={handleCheckboxClick} />
                <div>{task.questName}</div>
            </div>
        </div>
    )

}
