!function() {
    window.$ = function(e) {
        return document.querySelectorAll(e)
    }
    ,
    window.app = {
        nav: $("#mainMenu")[0],
        map: $("#map")[0],
        body: $("body")[0],
        logo: $("#logo")[0],
        menu: $("#mainMenu")[0],
        header: $("header")[0],
        navToggle: $("#nav-toggle")[0],
        heroVideo: $("#hero-video")[0],
        domainDependent: Array.prototype.slice.call($("[data-domain-dependent]")),
        heroImg: $("#hero-img")[0],
        stackedImages: $(".image-stack__image--staggered"),
        footer: $("#footer")[0],
        allContent: $("#content")[0],
        togglers: $("[data-toggle]"),
        emailLinks: $(".hooli"),
        pagination: 1,
        currentWidth: window.innerWidth,
        isResizing: !0,
        to: null,
        breakpoints: {
            phablet: 550,
            tablet: 768,
            desktop: 1025
        }
    },
    window.addClass = function(e, a) {
        return "string" == typeof e && (e = $(e)[0]),
        -1 == e.className.indexOf(a) && (e.className += " " + a),
        e
    }
    ,
    window.removeClass = function(e, a) {
        "string" == typeof e && (e = $(e)[0]);
        var t = e.className.split(" ")
          , n = t.indexOf(a);
        return -1 != n && t.splice(n, 1),
        e.className = t.join(" "),
        e
    }
    ,
    window.toggleClass = function(e, a) {
        return "string" == typeof e && (e = $(e)[0]),
        -1 == e.className.indexOf(a) ? addClass(e, a) : removeClass(e, a),
        e
    }
    ,
    app.timeLimitedClosingClass = function() {
        var e = null;
        return function(a, t, n) {
            addClass(a, t),
            e && clearTimeout(e),
            e = setTimeout(function() {
                removeClass(a, t)
            }, n)
        }
    }(),
    app.toggleNav = function() {
        /open/.test(app.nav.className) ? (removeClass(app.nav, "open"),
        removeClass(app.navToggle, "close"),
        app.timeLimitedClosingClass(app.navToggle, "closing", 2e3),
        removeClass(app.body, "no-scroll"),
        removeClass(app.allContent, "blur"),
        removeClass(app.footer, "blur"),
        removeClass(app.logo, "blur"),
        removeClass(app.header, "header--menu-open")) : (addClass(app.nav, "open"),
        addClass(app.navToggle, "close"),
        app.timeLimitedClosingClass(app.navToggle, "closing", 0),
        addClass(app.body, "no-scroll"),
        addClass(app.allContent, "blur"),
        addClass(app.footer, "blur"),
        addClass(app.logo, "blur"),
        addClass(app.header, "header--menu-open"))
    }
    ,
    app.resizeHeroVideo = function() {
        var e = app.heroVideoContainer.clientWidth
          , a = app.heroVideoContainer.clientHeight
          , t = Math.max(e, a / 9 * 16)
          , n = Math.max(a, e / 16 * 9);
        app.heroVideoFrame.style.width = t + "px",
        app.heroVideoFrame.style.height = n + "px"
    }
    ,
    app.heroVideo && (app.heroVideoContainer = app.heroVideo.parentNode,
    app.heroVideoFrame = app.heroVideo.querySelectorAll(".video-frame")[0],
    window.addEventListener("resize", app.resizeHeroVideo),
    app.resizeHeroVideo()),
    app.navToggle.addEventListener("click", app.toggleNav),
    app.addToggleListing = function(e) {
        function a() {
            var e = null;
            return function(a, t) {
                if (e && toggleClass(e, t),
                e === a)
                    return void (e = null);
                toggleClass(a, t),
                e = a
            }
        }
        for (var t = a(), n = a(), o = e.length - 1; o >= 0; o--)
            e[o].addEventListener("click", function(e) {
                var a = $("#" + this.dataset.toggle)[0];
                n(a, "show"),
                t(this, "open"),
                app.isMobileWidth() && this.scrollIntoView()
            }
            .bind(e[o]), !1)
    }
    ,
    app.addToggleListing(app.togglers),
    app.addStyling = function(e) {
        var a = document.head || document.getElementsByTagName("head")[0]
          , t = document.createElement("style");
        t.type = "text/css",
        a.appendChild(t);
        for (var n = 0; n < e.length; n++) {
            var o = e[n]
              , i = "[data-toggle=" + o.dataset.toggle + "]"
              , r = "#" + o.dataset.toggle
              , s = parseInt(n / 3);
            t.textContent += "@media screen and (min-width: 768px) { " + i + " { order: " + s + ";}}",
            t.textContent += "@media screen and (min-width: 768px) { " + r + " { order: " + (s + 1) + ";}}"
        }
    }(app.togglers),
    window.addEventListener("resize", function(e) {
        app.isResizing && (app.currentWidth = window.innerWidth)
    }),
    window.addEventListener("scroll", function() {
        window.scrollY < window.innerHeight ? app.heroImg && addClass(app.heroImg, "fixed") : app.heroImg && removeClass(app.heroImg, "fixed"),
        window.scrollY < window.innerHeight ? removeClass(app.navToggle, "smile") : addClass(app.navToggle, "smile");
        for (var e = window.innerHeight / 2, a = 0; a < app.stackedImages.length; a++) {
            var t = app.stackedImages[a]
              , n = t.getBoundingClientRect();
            if (n.y < window.innerHeight && -n.height < n.y) {
                var o = 1 - (n.y - e) / e;
                t.style.opacity = o
            }
        }
    });
    for (var e = $(".main-menu__a"), a = e.length - 1; a >= 0; a--)
        e[a].addEventListener("click", function(e) {
            e.preventDefault();
            var a = e.target.href;
            "_blank" === e.target.target ? setTimeout(function() {
                return window.open(a, "_blank"),
                !1
            }, 500) : (addClass(app.nav, "clicked-*"),
            addClass(e.target.parentNode, "stay-*"),
            setTimeout(function() {
                window.location = a
            }, 500))
        });
    for (var a = 0; a < app.emailLinks.length; a++) {
        app.emailLinks[a].addEventListener("click", function(e) {
            e.preventDefault();
            var a = e.target.getAttribute("data-gavin")
              , t = e.target.getAttribute("data-belson");
            window.location = "mailto:" + a + "@" + t
        })
    }
    if (app.isMobileWidth = function() {
        return !(app.currentWidth > app.breakpoints.tablet)
    }
    ,
    app.ifDomainEmbeddable = function(e, a) {
        var t = document.createElement("script");
        t.onload = function() {
            t.remove(),
            a(null, e)
        }
        ,
        t.onerror = function(n) {
            t.remove(),
            a({
                error: "Domain unreachable",
                url: e,
                state: n
            })
        }
        ,
        t.src = e;
        var n = document.getElementsByTagName("script")[0];
        n.parentNode.insertBefore(t, n)
    }
    ,
    app.ifDomainAllowed = function(e, a) {
        var t = new XMLHttpRequest;
        t.onreadystatechange = function() {
            4 == this.readyState && (200 == this.status ? a(null, e) : a({
                error: "Domain unreachable",
                url: e,
                state: this.readyState,
                status: this.status
            }))
        }
        ,
        t.open("HEAD", e),
        t.send()
    }
    ,
    app.domainDependent.length)
        for (app.domainTests = app.domainTests || {}; node = app.domainDependent.pop(); ) {
            var t = node.getAttribute("data-domain-dependent");
            app.domainTests[t] || (app.domainTests[t] = [],
            app.ifDomainEmbeddable(t, function(e, a) {
                if (e)
                    console.warn("Domain unreachable: " + a);
                else {
                    for (; node = app.domainTests[a].pop(); ) {
                        var t = node.getAttribute("data-src");
                        node.src = t || a
                    }
                    delete app.domainTests[a]
                }
            })),
            app.domainTests[t].push(node)
        }
}();
