import React, { useEffect } from 'react'
import ReactDOM from 'react-dom';

interface Props {
    parent?: any;
    className?: string;
}

export const Portal: React.FC<Props> = ({ children, parent, className }) => {
    const el = React.useMemo(() => document.createElement("div"), []);
    // On mount
    useEffect(() => {
        const target = parent && parent.appendChild ? parent : document.body;
        // default classes
        const classList = ["portal-container"];
        if (className)
            className.split(" ").forEach(item => classList.push(item))
        classList.forEach(item => el.classList.add(item));
        // Append to DOM
        target.appendChild(el)
        // Cleanup
        return () => {
            target.removeChild(el);
        }
    }, [el, parent, className])
    return ReactDOM.createPortal(children, el)
}
