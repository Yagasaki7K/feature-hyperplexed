import { useRef, useState } from 'react';

function App() {
    const trackRef = useRef(null);
    const [mouseDownAt, setMouseDownAt] = useState("0");
    const [prevPercentage, setPrevPercentage] = useState("0");

    const handleOnDown = e => setMouseDownAt(e.clientX || e.touches[0].clientX);

    const handleOnUp = () => {
        setMouseDownAt("0");
        setPrevPercentage(trackRef.current.dataset.percentage);
    }

    const handleOnMove = e => {
        if (mouseDownAt === "0") return;

        const mouseDelta = parseFloat(mouseDownAt) - (e.clientX || e.touches[0].clientX);
        const maxDelta = window.innerWidth / 2;

        const percentage = (mouseDelta / maxDelta) * -100;
        const nextPercentageUnconstrained = parseFloat(prevPercentage) + percentage;
        const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

        trackRef.current.dataset.percentage = nextPercentage;

        trackRef.current.animate([
            { transform: `translate(${nextPercentage}%, -50%)` }
        ], { duration: 1200, fill: "forwards" });

        for (const image of trackRef.current.getElementsByClassName("image")) {
            image.animate([
                { objectPosition: `${100 + nextPercentage}% center` }
            ], { duration: 1200, fill: "forwards" });
        }
    };

    // Event listeners
    window.onmousedown = e => handleOnDown(e);
    window.ontouchstart = e => handleOnDown(e.touches[0]);
    window.onmouseup = e => handleOnUp(e);
    window.ontouchend = e => handleOnUp(e.touches[0]);
    window.onmousemove = e => handleOnMove(e);
    window.ontouchmove = e => handleOnMove(e.touches[0]);

    return (
        <>
            <head>
                <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css" />
            </head>

            <div id="image-track" ref={trackRef} data-mouse-down-at={mouseDownAt} data-prev-percentage={prevPercentage}>
                <img className="image" src="https://images.unsplash.com/photo-1524781289445-ddf8f5695861?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" draggable="false" />
                <img className="image" src="https://images.unsplash.com/photo-1610194352361-4c81a6a8967e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80" draggable="false" />
                <img className="image" src="https://images.unsplash.com/photo-1618202133208-2907bebba9e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" draggable="false" />
                <img className="image" src="https://images.unsplash.com/photo-1495805442109-bf1cf975750b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" draggable="false" />
                <img className="image" src="https://images.unsplash.com/photo-1548021682-1720ed403a5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" draggable="false" />
                <img className="image" src="https://images.unsplash.com/photo-1496753480864-3e588e0269b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2134&q=80" draggable="false" />
                <img className="image" src="https://images.unsplash.com/photo-1613346945084-35cccc812dd5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1759&q=80" draggable="false" />
                <img className="image" src="https://images.unsplash.com/photo-1516681100942-77d8e7f9dd97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" draggable="false" />
            </div>

            <a id="source-link" className="meta-link" href="https://github.com/Yagasaki7K/feature-hyperplexed" target="_blank">
                <i className="uil uil-link"></i>
                <span>Source</span>
            </a>

            <a id="yt-link" className="meta-link" href="https://youtu.be/PkADl0HubMY" target="_blank">
                <i className="uil uil-youtube"></i>
                <span>7 min tutorial</span>
            </a>
        </>
    );
}

export default App;