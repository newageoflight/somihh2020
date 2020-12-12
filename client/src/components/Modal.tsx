import React, { useEffect, useRef, useState } from 'react'

import { Portal } from './Portal';

interface Props {
    open: boolean;
    onClose: () => void;
    locked?: boolean;
}

export const Modal: React.FC<Props> = (props) => {
    const [active, setActive] = useState(false);
    const { open, onClose, locked } = props
    const backdrop = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const { current } = backdrop;
        const transitionEnd = () => setActive(open);
        const keyHandler = (e: any) => !locked && [27].indexOf(e.which) >= 0 && onClose();
        const clickHandler = (e: any) => !locked && e.target === current && onClose();

        if (current) {
            current.addEventListener("transitioned", transitionEnd);
            current.addEventListener("click", clickHandler);
            current.addEventListener("keyup", keyHandler);
        }

        if (open) {
            window.setTimeout(() => {
                (document.activeElement as HTMLElement).blur();
                setActive(open);
                document.querySelector("#root")?.setAttribute("inert", "true");
            }, 10)
        }

        return () => {
            if (current) {
                current.removeEventListener("transitionend", transitionEnd);
                current.removeEventListener("click", clickHandler);
            }

            document.querySelector("#root")?.removeAttribute("inert");
            window.removeEventListener("keyup", keyHandler);
        }
    }, [open, locked, onClose])

    return (
        <>
            {
                (open || active) && (
                    <Portal className="modal-portal">
                        <div className={active && open ? "backdrop active" : "hidden"} ref={backdrop}>
                            <div className="content modal-content">
                                {props.children}
                            </div>
                        </div>
                    </Portal>
                )
            }
        </>
    )
}
