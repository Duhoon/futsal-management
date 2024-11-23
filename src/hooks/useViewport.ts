import { useState, useEffect } from "react";

interface Viewport {
    width: number;
    height: number;
}

export function useViewport(): [
    Viewport | null,
    React.Dispatch<React.SetStateAction<Viewport | null>>,
] {
    const [viewport, setViewport] = useState<Viewport | null>(null);

    useEffect(() => {
        if (window && window.document) {
            setViewport({
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight,
            });

            window.addEventListener("resize", () => {
                setViewport({
                    width: document.documentElement.clientWidth,
                    height: document.documentElement.clientHeight,
                });
            });
        }
    }, []);

    return [viewport, setViewport];
}
