import Checkbox from "./Checkbox";
import React from "react";

export default function QuestTitleRow({task, onClick, handleTaskCompletion}: { task: Task, onClick: () => void, handleTaskCompletion: HandleTaskCompletion }) {
    return (
        <div className={"border rounded-lg cursor-pointer text-lg " + (task.completed ? "bg-amber-400" : "bg-amber-600")} onClick={onClick}>
            <div className="flex flex-row p-2">
                <Checkbox checked={task.completed} className="accent-amber-200"
                          onClick={(e) => {
                              e.stopPropagation();
                              handleTaskCompletion(task.id, !task.completed);
                          }} />
                <div>{task.questName}</div>
            </div>
        </div>
    )

}
