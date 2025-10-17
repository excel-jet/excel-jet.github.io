document.addEventListener("DOMContentLoaded", function () {
  const isHomePage =
    window.location.pathname === "/" ||
    window.location.pathname === "/index.html";

  // === MVCONTENTROLL (на всех страницах, кроме главной)
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

  // === INLINE БАННЕРЫ SURFE.PRO
  function insertSurfeBanners() {
    if (isHomePage) return;

    const content = document.querySelector(
      'div.entry-content[itemprop="articleBody"]'
    );
    if (!content) return;

    const paragraphs = content.querySelectorAll("p");
    if (paragraphs.length === 0) return;

    let positions = [1];
    for (let i = 8; i < paragraphs.length && positions.length < 3; i += 8) {
      positions.push(i);
    }

    positions.forEach((position, index) => {
      const bannerContainer = document.createElement("div");
      bannerContainer.style.margin = "5px";

      // Вставляем скрипт Surfe.pro только один раз на страницу
      if (index === 0) {
        const surfeScript = document.createElement("script");
        surfeScript.src = "//static.surfe.pro/js/net.js";
        document.head.appendChild(surfeScript);
      }

      const ins = document.createElement("ins");
      ins.className = "surfe-be";
      ins.setAttribute("data-sid", "415955");

      const triggerScript = document.createElement("script");
      triggerScript.innerHTML = "(adsurfebe = window.adsurfebe || []).push({});";

      bannerContainer.appendChild(ins);
      bannerContainer.appendChild(triggerScript);

      const paragraph = paragraphs[position];
      if (paragraph && paragraph.parentNode) {
        paragraph.parentNode.insertBefore(bannerContainer, paragraph.nextSibling);
      }
    });
  }

  insertSurfeBanners();
  if (window.innerWidth > 1024) {
    const bannerLink = document.createElement('a');
    bannerLink.href = 'https://t.me/ii_nejrosetbot?start=ref954291600';
    bannerLink.target = '_blank';

    const bannerImg = document.createElement('img');
    bannerImg.src = 'https://github.com/excel-jet/excel-jet.github.io/blob/main/image45/banner1.png';
    bannerImg.alt = 'ИИ помощник';
    bannerImg.style.width = '300px';
    bannerImg.style.height = '111px';
    bannerImg.style.display = 'block';
    const wrapper = document.createElement('div');
    wrapper.appendChild(bannerLink);
    bannerLink.appendChild(bannerImg);
    wrapper.style.position = 'fixed';
    wrapper.style.top = '200px';
    wrapper.style.right = '2px';
    wrapper.style.zIndex = '1000';
    wrapper.style.display = 'block';
    document.body.appendChild(wrapper);
  }});
