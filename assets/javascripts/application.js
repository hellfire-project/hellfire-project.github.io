path = window.location.pathname, hash = window.location.hash, paths = path.split(
        "/"), "enterprise" != paths[1] || 0 !== paths[2].length && !isNaN(paths[
        2]) || (paths.splice(2, 0, String(2.9)), suffix = window.location.search ||
        window.location.hash, window.location.href = window.location.protocol +
        "//" + window.location.host + paths.join("/") + suffix), "/v3/repos/" ==
    path && "#enabling-and-disabling-branch-protection" == hash && (window.location
        .href = "/v3/repos/branches/#get-branch-protection"), "/v3/repos/" ==
    path && "#list-branches" == hash && (window.location.href =
        "/v3/repos/branches/#list-branches"), "/v3/repos/" == path &&
    "#get-branch" == hash && (window.location.href =
        "/v3/repos/branches/#get-branch"), $(function() {
        var e, t = $("#js-sidebar .js-topic"),
            s = !0,
            a = function() {
                var e = /\/\/[^\/]+([A-Za-z0-9-_.\/]+)/g,
                    t = e.exec(window.location.toString());
                t && $("#js-sidebar .js-topic a").each(function() {
                    $(this).parent("li").hasClass("disable") && $(
                        this).parent("li").removeClass(
                        "disable");
                    var e = $(this).attr("href").toString();
                    "/" !== e.substr(-1) && (e += "/");
                    var s = t[1];
                    if (e.indexOf(s) >= 0 && e.length == s.length) {
                        $(this).parent("li").addClass("disable");
                        var a = $(this).parents(".js-topic").first();
                        a.addClass("js-current"), a.find(
                            ".js-expand-btn").first().toggleClass(
                            "collapsed expanded")
                    }
                })
            };
        $("#js-sidebar .js-accordion-list .js-topic a[href*=#]").bind(
            "click",
            function(e) {
                window.location.toString().indexOf($(e.target).attr(
                    "href")) == -1 && setTimeout(a, 0)
            }), $("body.api") && window.location && a(), $(
            "#js-sidebar .js-topic").each(function() {
            0 != $(this).find(".disable").length && 0 != s || 1 ==
                $(this).hasClass("js-current") ? (e = $(this).index(),
                    s = !1) : $(this).find(".js-guides").children()
                .hide()
        }), $("#js-sidebar .js-toggle-list .js-expand-btn").click(
            function() {
                var e = $(this).parents(".js-topic").first(),
                    t = e.find(".js-guides li");
                return $(this).toggleClass("collapsed expanded"), t.slideToggle(
                    100), !1
            }), $("#js-sidebar .js-accordion-list .js-topic h3 a").click(
            function() {
                var s = $(this).parents(".js-topic").first(),
                    a = s.find(".js-guides li");
                return e != s.index() ? (t.eq(e) && t.eq(e).find(
                        ".js-guides li").slideToggle(100), e = s.index(),
                    a.slideToggle(100)) : (e = void 0, a.slideToggle(
                    100)), !1
            }), $.getJSON(
            "https://status.github.com/api/status.json?callback=?",
            function(e) {
                if (e) {
                    var t = $("<a>").attr("href",
                            "https://status.github.com").addClass(e.status)
                        .attr("title", "API Status: " + e.status +
                            ". Click for details.").text("API Status: " +
                            e.status);
                    $(".api-status").html(t)
                }
            }), $(".js-earth-animation").length && setTimeout(function() {
            $(".js-earth-animation").addClass("show-loop")
        }, 19e3), $(".tooltip-link").hover(function() {
            var e = $(this).attr("title");
            $(this).data("tipText", e).removeAttr("title"), $(
                '<p class="tooltip-text"></p>').text(e).appendTo(
                $(this)).fadeIn("slow")
        }, function() {
            $(this).attr("title", $(this).data("tipText")), $(
                ".tooltip-text").remove()
        }).mousemove(function(e) {
            var t = e.pageX + 20,
                s = e.pageY + 10;
            $(".tooltip").css({
                top: s,
                left: t
            })
        })
    }), $(function() {
        function e() {
            $.getJSON("/search/search-index.json", function(e) {
                e.type = {
                        index: !0
                    }, d.postMessage(e), l = e, localStorage.searchIndex =
                    JSON.stringify(l), localStorage.updated = (new Date)
                    .getTime()
            })
        }

        function t() {
            return (new Date).getTime() - parseInt(localStorage.updated, 10) >
                864e5
        }

        function s() {
            $("#searchfield").val(""), $("#search-container").removeClass(
                "active")
        }

        function a(e) {
            c = [], e = e.toLowerCase(), d.postMessage({
                query: e,
                type: "search"
            })
        }

        function i(e, t) {
            if ($("#search-results").empty(), t.length < 1) return void $(
                '<li class="placeholder">No results for <em></em></li>'
            ).appendTo("#search-results").find("em").text(e);
            for (var s = 0; s < Math.min(t.length, 8); s++) {
                var a = t[s];
                $('<li class="result"><a href="' + a.url + '"><em>' + a.title +
                    "</em></a></li>").appendTo("#search-results")
            }
            $("#search-results li:first-child").addClass("selected")
        }

        function n() {
            $prev = $("#search-results .selected").prev(), $prev.length < 1 ||
                ($("#search-results .selected").removeClass("selected"),
                    $prev.addClass("selected"))
        }

        function o() {
            $next = $("#search-results .selected").next(), $next.length < 1 ||
                ($("#search-results .selected").removeClass("selected"),
                    $next.addClass("selected"))
        }

        function r() {
            var e = $("#search-results .selected a").attr("href");
            e && (window.location.href = e)
        }
        var l, c, d = new Worker("./assets/javascripts/search_worker.js");
        localStorage.searchIndex ? (l = JSON.parse(localStorage.searchIndex),
            t() ? e() : (l.type = "index", d.postMessage(l))) : e(), $(
            "#searchfield").val().length > 0 && ($("#search-container")
            .addClass("active"), a($("#searchfield").val())), $(
            "#searchfield").on("input", function(e) {
            $(this).val().length > 0 ? $("#search-container").addClass(
                "active") : $("#search-container").removeClass(
                "active"), a($(this).val())
        }), $("body").keyup(function(e) {
            if (83 == e.keyCode) {
                if ($("input").is(":focus")) return;
                e.preventDefault(), $("#searchfield").focus()
            }
        }), $("#searchfield").keyup(function(e) {
            27 == e.keyCode ? (e.preventDefault(), $("#searchfield")
                    .val().length > 0 ? s() : $("#searchfield").blur()
                ) : 13 == e.keyCode ? (e.preventDefault(), r()) : 8 !=
                e.keyCode && 46 != e.keyCode || ($(this).val().length >
                    0 ? $("#search-container").addClass("active") :
                    $("#search-container").removeClass("active"), a(
                        $(this).val()))
        }).keydown(function(e) {
            38 == e.keyCode ? (e.preventDefault(), n()) : 40 == e.keyCode ?
                (e.preventDefault(), o()) : 27 == e.keyCode && e.preventDefault()
        }), $(".cancel-search").click(function(e) {
            s()
        }), d.addEventListener("message", function(e) {
            e.data.type.search && i(e.data.query, e.data.results)
        }), $("#search-results").on("mouseenter", "li", function(e) {
            $(this).parent().find(".selected").removeClass(
                "selected").end().end().addClass("selected")
        })
    }), $(function() {
        var e;
        $("ol img").each(function(e, t) {
            return $(t).parent().prepend(t)
        }), $(document).on("click", "ol img", function(t) {
            var s, a;
            return e(), a = $(t.currentTarget).clone(), s = $(
                '<div class="js-full-image full-image"><span class="octicon octicon-x"></span></div>'
            ).prepend(a), $(this).closest("li").append(s), $(
                document).on("click", ".js-full-image",
                function() {
                    return e(), !1
                })
        }), e = function() {
            return $(document).off("click", ".js-full-image", e), $(
                ".js-full-image").remove()
        }
    });