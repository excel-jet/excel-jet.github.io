document.addEventListener("DOMContentLoaded", function() {
    const isMobile = window.innerWidth < 768;
    const isHomePage = window.location.pathname === "/" || 
                       window.location.pathname === "/index.html";
    if (isMobile) {
        window.yaContextCb.push(() => {
            Ya.Context.AdvManager.render({
                blockId: "R-A-15276962-5",
                type: "floorAd",
                platform: "touch"
            });
        });
    }
    
    window.yaContextCb.push(() => {
        Ya.Context.AdvManager.render({
            blockId: isMobile ? "R-A-15276962-3" : "R-A-15276962-4",
            type: "fullscreen",
            platform: isMobile ? "touch" : "desktop"
        });
    });
    
    insertContentAds();
    
    if (!isMobile && !isHomePage) {
        initFloatingAds();
    }
});

function insertContentAds() {
    const content = document.querySelector('div.entry-content[itemprop="articleBody"]');
    if (!content) return;

    const paragraphs = content.querySelectorAll("p");
    if (paragraphs.length === 0) return;

    let positions = [1];
    for (let i = 8; i < paragraphs.length && positions.length < 6; i += 8) {
        positions.push(i);
    }

    positions.forEach((position, index) => {
        const renderTo = `yandex_rtb_R-A-15276962-1-${index + 1}`;
        const adContainer = document.createElement("div");

        adContainer.id = renderTo;
        adContainer.style.margin = "6px";

        const paragraph = paragraphs[position];
        if (paragraph && paragraph.parentNode) {
            paragraph.parentNode.insertBefore(adContainer, paragraph.nextSibling);
        }

        window.yaContextCb.push(() => {
            Ya.Context.AdvManager.render({
                blockId: "R-A-15276962-1",
                renderTo: renderTo
            });
        });
    });
}

function initFloatingAds() {
    const showInterval = 31000;
    
    function showFloatingAd() {
        const existingAd = document.getElementById("ya-float-ads");
        if (existingAd) existingAd.remove();

        const floatContainer = document.createElement("div");
        floatContainer.id = "ya-float-ads";
        floatContainer.style.cssText = "position:fixed;top:95px;right:0;z-index:9999;max-width:480px;background:#fff;border:1px solid #ccc;border-radius:4px;box-shadow:0 2px 10px rgba(0,0,0,0.15);";
        floatContainer.innerHTML = '<div id="ya-close" style="cursor:pointer;padding:0;margin:0;border-bottom:1px solid #ccc;">' +
                    '<svg width="60" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                    '<path d="M10.485 6.06A8 8 0 0118.246 0h23.508a8 8 0 017.76 6.06l3.728 14.91A4 4 0 0057.123 24H60 0h2.877a4 4 0 003.88-3.03l3.728-14.91z" fill="#D1D6E0"></path>' +
                    '<path d="M24.793 6.793a1 1 0 000 1.414L28.586 12l-3.793 3.793a1 1 0 001.414 1.414L30 13.414l3.793 3.793a1 1 0 001.414-1.414L31.414 12l3.793-3.793a1 1 0 00-1.414-1.414L30 10.586l-3.793-3.793a1 1 0 00-1.414 0z" fill="#575C66"></path>' +
                    '</svg></div><div id="yandex_rtb_R-A-15276962-2" style="padding:0;margin:0;"></div>';

        document.body.appendChild(floatContainer);

        document.getElementById("ya-close").onclick = function() {
            floatContainer.remove();
        };

        window.yaContextCb.push(() => {
            Ya.Context.AdvManager.render({
                blockId: "R-A-15276962-2",
                renderTo: "yandex_rtb_R-A-15276962-2"
            });
        });
    }
    setTimeout(showFloatingAd, 2000);
    //setInterval(showFloatingAd, showInterval);
}
