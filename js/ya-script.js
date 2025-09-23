document.addEventListener("DOMContentLoaded", function () {
  const isHomePage =
    window.location.pathname === "/" ||
    window.location.pathname === "/index.html";

  if (!isHomePage) {
    const mvDiv = document.createElement("div");
    mvDiv.id = "mvcontentroll";
    document.body.appendChild(mvDiv);

    const script1 = document.createElement("script");
    script1.src = "https://cdn1.moe.video/p/cr.js";
    script1.onload = () => {
      addContentRoll({
        element: "#mvcontentroll",
        width: "100%",
        placement: 10444,
        promo: true,
        advertCount: 50,
        slot: "page",
        sound: "onclick",
        deviceMode: "all",
        background: "none",
        fly: {
          mode: "always",
          animation: "fly",
          width: 450,
          closeSecOffset: 10,
          position: "bottom-right",
          indent: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          },
          positionMobile: "bottom",
        },
      });
    };
    document.body.appendChild(script1);
  }

  // === INLINE БАННЕРЫ ВНУТРИ КОНТЕНТА
  function insertContentBanners() {
    if (isHomePage) return;

    const content = document.querySelector(
      'div.entry-content[itemprop="articleBody"]'
    );
    if (!content) return;

    const paragraphs = content.querySelectorAll("p");
    if (paragraphs.length === 0) return;

    const sizes = [
      [300, 250],
      [336, 280],
      [728, 90],
    ];

    let positions = [1];
    for (let i = 8; i < paragraphs.length && positions.length < 3; i += 8) {
      positions.push(i);
    }

    positions.forEach((position, index) => {
      const id = `banner-inline-${index}`;
      const [w, h] = sizes[index % sizes.length];

      const adDiv = document.createElement("div");
      adDiv.id = id;
      adDiv.style.margin = "5px";

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.text = `
        (() => {
          const script = document.createElement("script");
          script.src = "https://cdn1.moe.video/p/b.js";
          script.onload = () => {
            addBanner({
              element: '#${id}',
              placement: 11823,
              width: '${w}px',
              height: '${h}px',
              advertCount: 0,
              background: 'none',
              deviceMode: 'all',
            });
          };
          document.body.appendChild(script);
        })();
      `;

      const paragraph = paragraphs[position];
      if (paragraph && paragraph.parentNode) {
        paragraph.parentNode.insertBefore(adDiv, paragraph.nextSibling);
        paragraph.parentNode.insertBefore(script, adDiv.nextSibling);
      }
    });
  }

  insertContentBanners();
});
