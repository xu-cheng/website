// copy citation
document.querySelectorAll("button[id^=bibtex_btn_]").forEach((button) => {
    const id = button.id;
    button.addEventListener("click", (e) => {
        const textarea_id = id.replace(/^bibtex_btn/, "bibtex");
        const textarea = document.querySelector(`textarea[id=${CSS.escape(textarea_id)}]`);
        textarea.select();
        document.execCommand('copy');
    });
});
