"use client"; // This is a client component 👈🏽

import ToDoNoteOrQuest from "./components/ToDoNoteOrQuest";

export default function Home() {

    return (
        <main className="font-sans" dir="ltr">
            <div className="flex flex-col flex-center">
                <div className="text-center p-5 p-1 text-2xl text-cyan-700 rounded underline">
                    Questify To-Do
                </div>
            </div>
            <ToDoNoteOrQuest/>
        </main>
    )
}
