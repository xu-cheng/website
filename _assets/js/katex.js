// copy LaTeX equation
document.addEventListener("copy", (event) => {
    const selection = window.getSelection();
    if (selection.isCollapsed) {
        return;
    }
    const fragment = selection.getRangeAt(0).cloneContents();
    if (!fragment.querySelector(".katex, .katex-equation")) {
        return;
    }

    let html = fragment.cloneNode(true);
    html.querySelectorAll(".katex-mathml").forEach((el) => {
        el.remove();
    });
    html = Array.prototype.map.call(html.childNodes,
        (el) => el.outerHTML || el.textContent).join("");
    event.clipboardData.setData("text/html", html);

    let text = fragment;
    text.querySelectorAll(".katex-html").forEach((el) => {
        el.remove();
    });
    text.querySelectorAll(".katex-display .katex-mathml").forEach((el) => {
        const tex = el.querySelector("annotation").textContent;
        el.replaceWith(`\\[${tex}\\]`);
    });
    text.querySelectorAll(".katex-mathml").forEach((el) => {
        const tex = el.querySelector("annotation").textContent;
        el.replaceWith(`\\(${tex}\\)`);
    });
    event.clipboardData.setData("text/plain", text.textContent);
    event.preventDefault();
});
