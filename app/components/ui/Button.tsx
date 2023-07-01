import React from "react";

type ButtonProps = {
    text: string;
    tinyTag?: string;
    color: string;
    onClick: () => void;
    icon?: () => JSX.Element;
}

export default function Button({text: tag, tinyTag, color, onClick, icon}: ButtonProps) {
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
