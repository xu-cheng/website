if (document.querySelector("#disqus_thread")) {
    window.disqus_config = function() {
        this.page.url = document.querySelector('meta[name="DISQUS_PAGE_URL"]').content;
        this.page.identifier = document.querySelector('meta[name="DISQUS_PAGE_ID"]').content;
    };

    const s = document.createElement('script');
    s.src = 'https://xuc.disqus.com/embed.js';
    s.async = 1;
    s.setAttribute('data-timestamp', +new Date());
    (document.head || document.body).appendChild(s);
}
