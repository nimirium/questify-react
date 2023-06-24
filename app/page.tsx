"use client"; // This is a client component 👈🏽

import ListOfNotesOrQuests from "./components/ListOfNotesOrQuests";

export default function Home() {
    return (
        <main className="font-sans" dir="ltr">
            <div className="flex flex-col flex-center">
                <div className="text-center p-5 text-4xl text-cyan-700 rounded" style={{fontFamily: "'Lilita One', cursive"}}>
                    <span>Questify To-Do</span>
                </div>
            </div>
            <ListOfNotesOrQuests/>
        </main>
    )
}

