import $ from 'jquery';

$(function() {
    if($("#disqus_thread").length) {
        window.disqus_config = function () {
            this.page.url = $('meta[name=DISQUS_PAGE_URL]').attr("content");
            this.page.identifier = $('meta[name=DISQUS_PAGE_ID]').attr("content");
        };

        var d = document, s = d.createElement('script');
        s.src = 'https://xuc.disqus.com/embed.js';
        s.async = 1;
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    }
});
