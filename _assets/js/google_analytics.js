import $ from 'jquery';

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
$(function() {
    $("a").each(function() {
        var href = $(this).attr("href");
        if (href) {
            if (href.match(/^\/file\//)) {
                $(this).click(function() {
                    ga('send', 'event', {
                        eventCategory: 'internal_file',
                        eventAction: 'click',
                        eventLabel: href
                    });
                });
            } else if (href.match(/\.pdf$/)) {
                $(this).click(function() {
                    ga('send', 'event', {
                        eventCategory: 'external_pdf',
                        eventAction: 'click',
                        eventLabel: href
                    });
                });
            } else if (href.match(/doi\.org/)) {
                $(this).click(function() {
                    ga('send', 'event', {
                        eventCategory: 'external_doi',
                        eventAction: 'click',
                        eventLabel: href
                    });
                });
            }
        }
    });
});