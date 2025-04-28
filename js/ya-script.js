document.addEventListener("DOMContentLoaded", function() {
    if (!window.yaContextCb) {
        const e = document.createElement("script");
        e.textContent = "window.yaContextCb = window.yaContextCb || [];",
        document.head.appendChild(e);

        const t = document.createElement("script");
        t.src = "https://yandex.ru/ads/system/context.js";
        t.async = true;
        document.head.appendChild(t);
    }

    window.yaContextCb.push(() => {
        Ya.Context.AdvManager.render({
            blockId: "R-A-15276962-5",
            type: "floorAd",
            platform: "touch"
        });
    });

    window.yaContextCb.push(() => {
        Ya.Context.AdvManager.render({
            blockId: "R-A-15276962-3",
            type: "fullscreen",
            platform: "touch"
        });
    });

    window.yaContextCb.push(() => {
        Ya.Context.AdvManager.render({
            blockId: "R-A-15276962-4",
            type: "fullscreen",
            platform: "desktop"
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const e = document.querySelector('div.entry-content[itemprop="articleBody"]');
    if (!e) return;

    const t = e.querySelectorAll("p");
    if (t.length === 0) return;

    let n = [0];
    for (let e = 7; e < t.length && n.length < 8; e += 7) {
        n.push(e);
    }

    n.forEach((n, o) => {
        const r = `yandex_rtb_R-A-15276962-1-${o + 1}`,
              d = document.createElement("div");

        d.id = r;
        d.style.margin = "5px";

        const a = t[n];
        if (a && a.parentNode) {
            a.parentNode.insertBefore(d, a.nextSibling);
        }

        window.yaContextCb.push(() => {
            Ya.Context.AdvManager.render({
                blockId: "R-A-15276962-1",
                renderTo: r
            });
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    if (window.innerWidth < 768 || window.location.pathname === "/" || window.location.pathname === "/index.html" || window.location.href.includes("category")) {
        return;
    }

    function r() {
        const e = document.getElementById("ya-float-ads");
        if (e) e.remove();

        const t = document.createElement("div");
        t.id = "ya-float-ads";
        t.style.cssText = "position:fixed;top:95px;right:0;z-index:9999;background:#fff;border:1px solid #ccc;border-radius:4px;box-shadow:0 2px 10px rgba(0,0,0,0.15);";
        t.innerHTML = '<div id="ya-close" style="cursor:pointer;padding:0;margin:0;background:#fff;border-bottom:1px solid #ccc;">' +
                      '<svg width="60" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                      '<path d="M10.485 6.06A8 8 0 0118.246 0h23.508a8 8 0 017.76 6.06l3.728 14.91A4 4 0 0057.123 24H60 0h2.877a4 4 0 003.88-3.03l3.728-14.91z" fill="#D1D6E0"></path>' +
                      '<path d="M24.793 6.793a1 1 0 000 1.414L28.586 12l-3.793 3.793a1 1 0 001.414 1.414L30 13.414l3.793 3.793a1 1 0 001.414-1.414L31.414 12l3.793-3.793a1 1 0 00-1.414-1.414L30 10.586l-3.793-3.793a1 1 0 00-1.414 0z" fill="#575C66"></path>' +
                      '</svg></div><div id="yandex_rtb_R-A-15276962-2" style="padding:0;margin:0;"></div>';

        document.body.appendChild(t);

        document.getElementById("ya-close").onclick = function() {
            t.remove();
        };

        window.yaContextCb.push(() => {
            Ya.Context.AdvManager.render({
                blockId: "R-A-15276962-2",
                renderTo: "yandex_rtb_R-A-15276962-2"
            });
        });
    }

    r();
    setInterval(r, 31000);
});
