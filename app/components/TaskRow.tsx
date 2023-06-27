import classNames from 'classnames';
import TextareaAutosize from 'react-textarea-autosize';
import React from "react";
import TagButton from "./TagButton";
import {COLOR, TAG} from "../constants";
import Checkbox from "./Checkbox";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

export default function TaskRow({noteId, task, index, updateTaskCompletion, updateTaskText, handleKeyPress, toggleTag, autoFocus}: ToDoComponentProps) {
    const noteClass = classNames("m-1 px-1 grow outline-0 resize-none rounded self-center", {
        "bg-pink-300": task.completed,
        "bg-amber-100": !task.completed
    });

    return (
        <div className="flex">
            <DragIndicatorIcon className="self-center m-1"/>
            <Checkbox checked={task.completed} onClick={() => updateTaskCompletion(task.id, !task.completed)} />
            <TextareaAutosize
                value={task.text}
                onInput={(e: any) => updateTaskText(index, e.target.value)}
                onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => handleKeyPress(e, index)}
                className={noteClass}
                id={`input_${noteId}_${task.id}`}
                autoFocus={autoFocus}
            />
            <div className="flex justify-center text-center self-center	text-sm	text-gray-500">
                <TagButton tag={TAG.TWO_MINUTES} tinyTag={'2M'}
                           color={task.tags.includes(TAG.TWO_MINUTES) ? COLOR.GREEN : COLOR.GRAY}
                           onClick={() => toggleTag(index, TAG.TWO_MINUTES)}/>
                <TagButton tag={TAG.URGENT} tinyTag={'U'}
                           color={task.tags.includes(TAG.URGENT) ? COLOR.ORANGE : COLOR.GRAY}
                           onClick={() => toggleTag(index, TAG.URGENT)}/>
                <TagButton tag={TAG.IMPORTANT} tinyTag={'I'}
                           color={task.tags.includes(TAG.IMPORTANT) ? COLOR.YELLOW : COLOR.GRAY}
                           onClick={() => toggleTag(index, TAG.IMPORTANT)}/>
            </div>

        </div>
    );
}
