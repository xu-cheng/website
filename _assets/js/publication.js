// copy citation
$(function() {
    $("button[id^=bibtex_btn_]").each(function() {
        var id = $(this).attr("id");
        $(this).click(function() {
            var textarea_id = id.replace(/^bibtex_btn/, "bibtex");
            var textarea = $("textarea[id=" + $.escapeSelector(textarea_id) + "]");
            textarea.select();
            document.execCommand('copy');
        });
    });
});
