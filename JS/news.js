/*----------------------
micro cms
-----------------------*/
import { createClient } from "https://esm.sh/microcms-js-sdk";

const client = createClient({
  serviceDomain: "0y1eryzl26",
  apiKey: "sBsiDsclPsMlxYJE1OVQk0AD9fiZSBct3ubM",
});

// news一覧を取得
client
  .get({ endpoint: "news" })
  .then((res) => {
    console.log(res.contents); // ★ デバッグ用（確認できたら消してOK）

    const wrap = document.getElementById("news-list");
    if (!wrap) return;

    wrap.innerHTML = res.contents
      .map((item) => {
        const imageUrl = item.thumbnail?.url
          ? item.thumbnail.url
          : "./images/church_in.JPG";

        const date = item.publishedAt
          ? item.publishedAt.substring(0, 10)
          : "";

        return `
          <a href="./news-page.html?id=${item.id}">
            <div class="news-page">
              <img class="news-image" src="${imageUrl}" alt="${item.title}">
              <div class="news-right">
                <p class="news-page-date">${date}</p>
                <p class="news-page-text">${item.title}</p>
              </div>
              <img class="btn-more" src="./images/btn-more.svg" alt="">
            </div>
          </a>
        `;
      })
      .join("");
  })
  .catch((err) => {
    console.error("microCMS error:", err);
  });