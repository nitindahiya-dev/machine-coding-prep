import { useState } from "react";
import "../../styles/Accordion.css";

const Accordion = () => {
    const [activeId, setActiveId] = useState(null);

    const data = [
        {
            id: 1,
            heading: "What is React?",
            description: "React is a JavaScript library for building user interfaces, particularly single-page applications."
        },
        {
            id: 2,
            heading: "How does state work in React?",
            description: "State is a built-in React object that contains data or information about the component."
        },
        {
            id: 3,
            heading: "What are React hooks?",
            description: "Hooks are functions that let you use state and other React features without writing a class."
        },
    ];

    const toggleAccordion = (id) => {
        setActiveId(activeId === id ? null : id);
    };

    return (
        <div className="accordion-container">

            <div className="accordion-container-heading">
                <h1>Accordion Demo</h1>
            </div>
            {data.map((item) => (
                <div key={item.id} className="accordion-item">
                    <div
                        className={`accordion-heading ${activeId === item.id ? 'active' : ''}`}
                        onClick={() => toggleAccordion(item.id)}
                    >
                        <h3>{item.heading}</h3>
                        <span className="accordion-icon">{activeId === item.id ? '−' : '+'}</span>
                    </div>
                    <div
                        id={`content-${item.id}`}
                        className={`accordion-content ${activeId === item.id ? 'show' : ''}`}
                    >
                        <p>{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Accordion;