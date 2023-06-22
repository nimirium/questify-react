import React from "react";
import TagButton from "./TagButton";

export default function QuestDescriptionRow({task}: { task: Task }) {
    const [showTldr, setShowTldr] = React.useState(false);
    return (<div className={"bg-amber-700 text-amber-200 rounded-lg p-2 " + (task.completed ? "bg-amber-700" : "bg-amber-700")}>
        <div>{task.questDescription}</div>
        <div className="flex flex-col flex-center text-sm items-center">
            <TagButton tag={(showTldr ? 'Hide' : 'Show') + " TL;DR"} color="bg-amber-600" onClick={() => setShowTldr(s => !s)}/>
            {showTldr && <div className="text-amber-400">{task.text}</div>}
        </div>
    </div>)

}
