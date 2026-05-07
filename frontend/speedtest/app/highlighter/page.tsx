'use client';

import { useEffect, useState } from "react";

const applyStyle = (range: Range | null, tag: string, className?: string) => {
    if (!range) return;

    const selection = window.getSelection();
    if (!selection) return;

    // restore selection before modifying
    selection.removeAllRanges();
    selection.addRange(range);

    const newNode = document.createElement(tag);

    if (className) newNode.className = className;

    newNode.appendChild(range.extractContents());
    range.insertNode(newNode);

    // reset selection after applying
    selection.removeAllRanges();
};

const Tools = ({ top, left, range }: { top: number, left: number, range: Range | null }) => {
    return (
        <div
            className="min-w-40 border bg-white shadow-xl rounded-md absolute flex items-center gap-3 p-2"
            style={{ top: top - 40, left }}
        >
            <p
                className="hover:bg-black/30 rounded-md cursor-pointer px-3 py-1"
                onMouseDown={(e) => {
                    e.preventDefault(); // prevent selection loss
                    applyStyle(range, "strong");
                }}
            >
                Bold
            </p>

            <p
                className="hover:bg-black/30 rounded-md cursor-pointer px-3 py-1"
                onMouseDown={(e) => {
                    e.preventDefault();
                    applyStyle(range, "em");
                }}
            >
                Italic
            </p>

            <p
                className="hover:bg-black/30 rounded-md cursor-pointer px-3 py-1"
                onMouseDown={(e) => {
                    e.preventDefault();
                    applyStyle(range, "mark");
                }}
            >
                Highlight
            </p>
        </div>
    );
};

export default function Page() {
    const [toolPos, setToolPos] = useState({ top: 0, left: 0 });
    const [toolShow, setToolShow] = useState(false);
    const [savedRange, setSavedRange] = useState<Range | null>(null);

    useEffect(() => {
        const handleSelection = () => {
            const sel = window.getSelection();

            if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {
                setToolShow(false);
                return;
            }

            const range = sel.getRangeAt(0);
            const rect = range.getBoundingClientRect();

            const top = rect.top;
            const midX = rect.left + rect.width / 2;

            setToolPos({ top, left: midX });
            setSavedRange(range.cloneRange());
            setToolShow(true);
        };

        window.addEventListener("mouseup", handleSelection);

        return () => window.removeEventListener("mouseup", handleSelection);
    }, []);

    return (
        <div className="w-screen h-screen flex justify-center items-center relative">
            <p className="max-w-3xl">
                {/* your text */}
                Lorem ipsum dolor sit amet...
            </p>

            {toolShow && (
                <Tools top={toolPos.top} left={toolPos.left} range={savedRange} />
            )}
        </div>
    );
}