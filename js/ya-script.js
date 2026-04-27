document.addEventListener("DOMContentLoaded", function () {
  const isHomePage =
    window.location.pathname === "/" ||
    window.location.pathname === "/index.html";

  const isDesktop = window.innerWidth > 1024;

  // =========================
  // === MOEVIDEO (ТОЛЬКО ПК)
  // =========================
  if (!isHomePage && isDesktop) {
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
          positionMobile: "bottom"
        },
      });
    };
    document.body.appendChild(script1);
  }

  // =========================
  // === РСЯ В СТАТЬЕ
  // =========================
  function insertContentAds() {
    if (isHomePage) return;

    const content = document.querySelector(
      'div.entry-content[itemprop="articleBody"]'
    );
    if (!content) return;

    const paragraphs = content.querySelectorAll("p");
    if (paragraphs.length === 0) return;

    let positions = [1];
    for (let i = 8; i < paragraphs.length && positions.length < 6; i += 8) {
      positions.push(i);
    }

    positions.forEach((position, index) => {
      const renderTo = `yandex_rtb_R-A-17305005-1-${index + 1}`;
      const adContainer = document.createElement("div");

      adContainer.id = renderTo;
      adContainer.style.margin = "6px";

      const paragraph = paragraphs[position];
      if (paragraph && paragraph.parentNode) {
        paragraph.parentNode.insertBefore(adContainer, paragraph.nextSibling);
      }

      window.yaContextCb.push(() => {
        Ya.Context.AdvManager.render({
          blockId: "R-A-17305005-1",
          renderTo: renderTo
        });
      });
    });
  }

  insertContentAds();

  // =========================
  // === FULLSCREEN
  // =========================

  // Mobile fullscreen
  window.yaContextCb.push(() => {
    Ya.Context.AdvManager.render({
      blockId: "R-A-17305005-2",
      type: "fullscreen",
      platform: "touch"
    });
  });

  // Desktop fullscreen (только ПК)
  if (isDesktop) {
    window.yaContextCb.push(() => {
      Ya.Context.AdvManager.render({
        blockId: "R-A-17305005-3",
        type: "fullscreen",
        platform: "desktop"
      });
    });
  }

  // =========================
  // === FLOOR (ТОЛЬКО MOBILE)
  // =========================
  if (!isDesktop) {
    window.yaContextCb.push(() => {
      Ya.Context.AdvManager.render({
        blockId: "R-A-17305005-4",
        type: "floorAd",
        platform: "touch"
      });
    });
  }

  // =========================
  // === FEED + FLOOR
  // =========================
  const feedId = "yandex_rtb_R-A-17305005-5";

  const feedContainer = document.createElement("div");
  feedContainer.id = feedId;
  document.body.appendChild(feedContainer);

  window.yaContextCb.push(() => {
    Ya.Context.AdvManager.renderFeed({
      blockId: "R-A-17305005-5",
      renderTo: feedId
    });
  });

  // Убираем floor когда пользователь дошёл до ленты
  const callback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        Ya.Context.AdvManager.destroy({
          blockId: "R-A-17305005-4"
        });
      }
    });
  };

  const observer = new IntersectionObserver(callback, {
    threshold: 0,
  });

  observer.observe(feedContainer);
});
// =========================
// === DESKTOP БАННЕР (ВСЕГДА НА ПК)
// =========================
if (window.innerWidth > 1024) {
  const wrapper = document.createElement('div');
  wrapper.style.position = 'fixed';
  wrapper.style.top = '100px';
  wrapper.style.right = '2px';
  wrapper.style.zIndex = '1000';

  const bannerLink = document.createElement('a');
  bannerLink.href = 'https://vk.cc/cQxYEz';
  bannerLink.target = '_blank';

  const bannerImg = document.createElement('img');
  bannerImg.src = 'https://raw.githubusercontent.com/excel-jet/excel-jet.github.io/refs/heads/main/image45/banner3.jpg';
  bannerImg.alt = 'ИИ помощник';
  bannerImg.style.width = '300px';
  bannerImg.style.height = '111px';
  bannerImg.style.display = 'block';

  // кнопка закрытия
  const closeBtn = document.createElement('div');
  closeBtn.innerHTML = '✕';
  closeBtn.style.position = 'absolute';
  closeBtn.style.top = '2px';
  closeBtn.style.right = '5px';
  closeBtn.style.cursor = 'pointer';
  closeBtn.style.background = '#000';
  closeBtn.style.color = '#fff';
  closeBtn.style.fontSize = '12px';
  closeBtn.style.padding = '2px 5px';
  closeBtn.style.zIndex = '1001';

  closeBtn.onclick = () => wrapper.remove();

  bannerLink.appendChild(bannerImg);
  wrapper.appendChild(closeBtn);
  wrapper.appendChild(bannerLink);

  document.body.appendChild(wrapper);
}
// =========================
// === FALLBACK FLOOR MOBILE
// =========================
if (window.innerWidth <= 1024) {
  setTimeout(() => {
    const rtbExists = document.querySelector('iframe[src*="yandex"]');

    // если РСЯ не загрузился — показываем заглушку
    if (!rtbExists) {
      const wrapper = document.createElement('div');
      wrapper.style.position = 'fixed';
      wrapper.style.bottom = '0';
      wrapper.style.left = '0';
      wrapper.style.width = '100%';
      wrapper.style.background = '#fff';
      wrapper.style.zIndex = '9999';
      wrapper.style.textAlign = 'center';
      wrapper.style.boxShadow = '0 -2px 10px rgba(0,0,0,0.2)';

      const bannerLink = document.createElement('a');
      bannerLink.href = 'https://vk.cc/cQxYEz';
      bannerLink.target = '_blank';

      const bannerImg = document.createElement('img');
      bannerImg.src = 'https://raw.githubusercontent.com/excel-jet/excel-jet.github.io/refs/heads/main/image45/banner3.jpg';
      bannerImg.style.width = '100%';
      bannerImg.style.maxHeight = '100px';
      bannerImg.style.objectFit = 'cover';

      // кнопка закрытия
      const closeBtn = document.createElement('div');
      closeBtn.innerHTML = '✕';
      closeBtn.style.position = 'absolute';
      closeBtn.style.top = '5px';
      closeBtn.style.right = '10px';
      closeBtn.style.cursor = 'pointer';
      closeBtn.style.background = '#000';
      closeBtn.style.color = '#fff';
      closeBtn.style.fontSize = '14px';
      closeBtn.style.padding = '3px 6px';

      closeBtn.onclick = () => wrapper.remove();

      bannerLink.appendChild(bannerImg);
      wrapper.appendChild(closeBtn);
      wrapper.appendChild(bannerLink);

      document.body.appendChild(wrapper);
    }
  }, 3000); // ждём загрузку РСЯ
}
