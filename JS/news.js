/*----------------------
micro cms
-----------------------*/
import { createClient } from "https://esm.sh/microcms-js-sdk";

const client = createClient({
  serviceDomain: "0y1eryzl26",
  apiKey: "sBsiDsclPsMlxYJE1OVQk0AD9fiZSBct3ubM",
});

// ★ news の一覧を取得
client
  .get({
    endpoint: "news",
  })
  .then((res) => {
    const wrap = document.getElementById("news-list");

    // データ（res.contents）を並べて表示
    wrap.innerHTML = res.contents
      .map(
        (item) => `
      <a href="./news-page.html?id=${item.id}">
        <div class="news-page">
          <img class="news-image" src="${item.image?.url || "./images/church_in.JPG"}" alt="">
          <div class="news-right">
            <p class="news-page-date">${item.publishedAt?.substring(0, 10)}</p>
            <p class="news-page-text">${item.title}</p>
          </div>
          <img class="btn-more" src="./images/btn-more.svg" alt="">
        </div>
      </a>
    `
      )
      .join("");
  })
  .catch((err) => console.error(err));
