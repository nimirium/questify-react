import React from "react";

export default function NoteTitle({title, setTitle}: { title: string, setTitle: (v: string) => void }) {
    return (
        <input type="text"
               placeholder="[ Note title ]"
               className="m-1 px-1 grow outline-0 resize-none rounded self-center bg-amber-100 text-center text-2xl w-full"
               value={title}
               onChange={(e) => setTitle(e.target.value)}
        />
    );
}
