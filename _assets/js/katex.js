// copy LaTeX equation
$(document).on("copy", function(event) {
    event = event.originalEvent;
    var selection = window.getSelection();
    if (selection.isCollapsed) { return; }
    var fragment = $(selection.getRangeAt(0).cloneContents());
    if (!fragment.find(".katex, .katex-equation")) { return; }
    var html = fragment.clone();
    html.find(".katex-mathml").remove();
    event.clipboardData.setData("text/html", $("<div>").append(html).get(0).innerHTML);
    var text = fragment;
    text.find(".katex-html").remove();
    text.find(".katex-display .katex-mathml").replaceWith(function() {
        return "\\[" + $(this).find("annotation").text() + "\\]";
    });
    text.find(".katex-mathml").replaceWith(function() {
        return "\\(" + $(this).find("annotation").text() + "\\)";
    });
    event.clipboardData.setData("text/plain", text.get(0).textContent);
    event.preventDefault();
});
