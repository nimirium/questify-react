import classNames from 'classnames';
import TextareaAutosize from 'react-textarea-autosize';
import React from "react";
import Button from "../ui/Button";
import { COLOR, TAG } from "../../constants";
import Checkbox from "../ui/Checkbox";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

type ToDoComponentProps = {
    noteId: string;
    task: Task;
    index: number,
    updateTaskCompletion: HandleTaskCompletion;
    updateTaskText: HandleTaskTextChange;
    handleKeyPress: HandleKeyPress;
    toggleTag: (index: number, tag: string) => void;
    autoFocus: boolean;
};

export default function TaskRow({ noteId, task, index, updateTaskCompletion, updateTaskText, handleKeyPress, toggleTag, autoFocus }: ToDoComponentProps) {
    const noteClass = classNames("m-1 px-1 grow outline-0 resize-none rounded self-center w-full sm:w-1/2", {
        "bg-pink-300": task.completed,
        "bg-amber-100": !task.completed
    });

    return (
        <div className="flex">
            <DragIndicatorIcon className="self-center m-1" />
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
                <Button text={TAG.TWO_MINUTES} tinyTag={'2M'}
                    color={task.tags.includes(TAG.TWO_MINUTES) ? COLOR.GREEN : COLOR.GRAY}
                    onClick={() => toggleTag(index, TAG.TWO_MINUTES)} />
                <Button text={TAG.URGENT} tinyTag={'U'}
                    color={task.tags.includes(TAG.URGENT) ? COLOR.ORANGE : COLOR.GRAY}
                    onClick={() => toggleTag(index, TAG.URGENT)} />
                <Button text={TAG.IMPORTANT} tinyTag={'I'}
                    color={task.tags.includes(TAG.IMPORTANT) ? COLOR.YELLOW : COLOR.GRAY}
                    onClick={() => toggleTag(index, TAG.IMPORTANT)} />
            </div>

        </div>
    );
}
