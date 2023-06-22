import Checkbox from "./Checkbox";
import React from "react";

export default function QuestTitleRow({task, handleTaskCompletion}: { task: Task, handleTaskCompletion: HandleTaskCompletion }) {
    return (<div className="flex flex-row">
        <Checkbox checked={task.completed} onChange={() => handleTaskCompletion(task.id, !task.completed)} />
        <div>{task.questName}</div>
    </div>)

}
