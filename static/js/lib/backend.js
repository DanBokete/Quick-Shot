import { player } from "../../game.js";

/** @type {FormData | undefined} */
let http;

export function sendData() {
    const score = player.score;
    const cheated = player.cheated ?? false;

    let url = window.location.pathname;

    const data = new FormData();
    data.append("score", score);
    data.append("cheated", cheated ? 1 : 0);

    http = new XMLHttpRequest();
    http.addEventListener("readystatechange", handleResponse, false);
    http.open("POST", url, true);
    http.send(data);
}

export function handleResponse() {
    if (http.readyState === 4) {
        if (http.status === 200) {
            if (document.querySelector("#popup")) {
                document.querySelector("#popup").remove();
            }
            const container = document.createElement("div");
            container.className =
                "bg-slate-100 border border-slate-400 text-slate-700 px-3 py-1.5 rounded absolute right-10 top-5 animate-pulse";
            const popup = document.createElement("div");
            container.id = "popup";
            popup.innerText = http.responseText;
            container.appendChild(popup);
            document.querySelector("body").appendChild(container);

            setInterval(() => {
                if (document.querySelector("#popup")) {
                    document.querySelector("#popup").remove();
                }
            }, 8000);
        }
    }
}
