import React from "react";
import TextareaAutosize from 'react-textarea-autosize';

type NoteTitleProps = {
    title: string,
    setTitle: (v: string) => void,
    placeholder?: string
}

export default function NoteTitle({ title, setTitle, placeholder }: NoteTitleProps) {
    return (
        <TextareaAutosize
            value={title}
            className="m-1 px-1 grow outline-0 resize-none rounded self-center bg-transparent text-center text-xl sm:text-2xl w-full"
            placeholder={placeholder}
            onInput={(e: any) => setTitle(e.target.value)}
        />
    );
}
