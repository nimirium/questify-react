import React from "react";

export default function TagButton({tag, tinyTag, color, onClick, icon}: TagButtonProps) {
    return (
        <>
            <button className={"px-2 py-1 m-1 rounded shadow-md " + color + (tinyTag ? " hidden lg:block" : " ")}
                    onClick={onClick}>
                {icon && icon()} {tag}
            </button>
            {tinyTag &&
            <button className={"px-2 py-1 m-1 rounded shadow-md block lg:hidden " + color} onClick={onClick}>
                {icon && icon()} {tinyTag}
            </button>}
        </>
    );
}
