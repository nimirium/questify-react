import React from "react";
import TagButton from "./TagButton";
import LoadingIndicator from "./LoadingIndicator";

interface QuestDescriptionRowProps {
    task: Task,
    generating: boolean,
    canRegenerate: boolean,
    regenerateQuest: (task: Task) => void
}

export default function QuestDescriptionRow({task, generating, canRegenerate, regenerateQuest}: QuestDescriptionRowProps) {
    const [showTldr, setShowTldr] = React.useState(false);
    return (<div
        className={"bg-amber-700 text-amber-200 rounded-lg p-2 " + (task.completed ? "bg-amber-700" : "bg-amber-700")}>

        {generating && <LoadingIndicator text="Regenerating quest..."/>}

        {!generating &&
        <>
            <div>{task.questDescription}</div>
            <div className="flex flex-col flex-center text-sm items-center">
                <div className="flex flex-row flex-center">
                    <TagButton tag={(showTldr ? 'Hide' : 'Show') + " TL;DR"} color="bg-amber-600"
                               onClick={() => setShowTldr(s => !s)}/>
                    {canRegenerate &&
                    <TagButton tag="Regenerate" color="bg-amber-600" onClick={() => regenerateQuest(task)}/>}
                </div>
                {showTldr && <div className="text-amber-400">{task.text}</div>}
            </div>
        </>
        }

    </div>)

}
