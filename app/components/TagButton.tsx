import React from "react";

export default function TagButton({tag, color, onClick}: TagButtonProps) {
    return (
        <button className={"px-2 py-1 m-1 rounded shadow-md " + color} onClick={onClick}>
            {tag}
        </button>
    );
}
