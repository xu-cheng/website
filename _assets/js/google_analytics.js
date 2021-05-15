(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-4293090-10', 'auto');
ga('set', 'anonymizeIp', true);
ga('require', 'displayfeatures');
ga('require', 'linkid');
ga('send', 'pageview');

// report download events
document.querySelectorAll("a").forEach((anchor) => {
    const url = anchor.href;
    if (url) {
        let category = null;
        if (url.match(/^\/file\//)) {
            category = "internal_file";
        } else if (url.match(/\.pdf$/)) {
            category = "external_pdf";
        } else if (url.match(/doi\.org/)) {
            category = "external_doi";
        }

        if (category) {
            anchor.addEventListener("click", (e) => {
                ga("send", "event", {
                    eventCategory: category,
                    eventAction: "click",
                    eventLabel: url
                });
            });
        }
    }
});
