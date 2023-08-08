import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";
const TemplateSeletor = () => {

    const [mousePosition, setMousePosition] = useState({ x: null, y: null });
    const [mouseClickPosition, setMouseClickPosition] = useState({ x: null, y: null });

    const updateMousePosition = ev => {
        setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    const updateMouseClickPosition = ev => {
        setMouseClickPosition({ x: ev.clientX, y: ev.clientY });
    };

    useEffect(() => {
        window.addEventListener("mousemove", updateMousePosition);
        window.addEventListener("click", updateMouseClickPosition);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("click", updateMouseClickPosition);
        };
    }, []);

    return (
        <div>
            <Link className="text-white" to="/">{'< Home'}</Link>
            <h1>TemplateSeletor</h1>
            <h1>Mouse position x: {mousePosition.x} y: {mousePosition.y}</h1>
            <h1>Mouse click position x: {mouseClickPosition.x} y: {mouseClickPosition.y}</h1>
        </div>
    );
}

export default TemplateSeletor;