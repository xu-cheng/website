var disqus_config = function () {
    this.page.url = $('meta[name=DISQUS_PAGE_URL]').attr("content");
    this.page.identifier = $('meta[name=DISQUS_PAGE_ID]').attr("content");
};
(function() {
var d = document, s = d.createElement('script');
s.src = 'https://xuc.disqus.com/embed.js';
s.setAttribute('data-timestamp', +new Date());
(d.head || d.body).appendChild(s);
})();
