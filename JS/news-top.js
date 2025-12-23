import { createClient } from "https://esm.sh/microcms-js-sdk";

const client = createClient({
    serviceDomain: "0y1eryzl26",
    apiKey: "sBsiDsclPsMlxYJE1OVQk0AD9fiZSBct3ubM",
});

// 日付整形（2025-12-15）
const formatDate = (dateString) => {
    if (!dateString) return "";
    return dateString.substring(0, 10);
};

client
    .get({
        endpoint: "news",
        queries: {
            limit: 3,                 // トップは3件
            orders: "-publishedAt",   // 新しい順
        },
    })
    .then((res) => {
        const wrap = document.getElementById("top-news-list");
        if (!wrap) return;

        wrap.innerHTML = res.contents
            .map((item) => {
                const date = item.publishedAt || item.createdAt;

                return `
          <li class="news-item">
            <a href="./news-page.html?id=${item.id}">
              <p class="news-date">${formatDate(date)}</p>
              <p class="news-text">${item.title}</p>
            </a>
          </li>
        `;
            })
            .join("");
    })
    .catch((err) => console.error("microCMS error:", err));