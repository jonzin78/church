import { createClient } from "https://esm.sh/microcms-js-sdk";

const client = createClient({
    serviceDomain: "0y1eryzl26",
    apiKey: "sBsiDsclPsMlxYJE1OVQk0AD9fiZSBct3ubM",
});

/* -----------------------
   日付整形
----------------------- */
function formatDate(dateString) {
    if (!dateString) return "";
    return dateString.substring(0, 10).replace(/-/g, ".");
}

/* -----------------------
   URLから記事ID取得
----------------------- */
const params = new URLSearchParams(window.location.search);
const newsId = params.get("id");

if (!newsId) {
    console.error("記事IDが見つかりません");
}

/* -----------------------
   記事を1件取得
----------------------- */
client
    .get({
        endpoint: "news",
        contentId: newsId,
    })
    .then((item) => {
        /* 日付（公開日 → なければ作成日） */
        document.getElementById("news-date").textContent =
            formatDate(item.publishedAt || item.createdAt);

        /* タイトル */
        document.getElementById("news-title").textContent =
            item.title || "";

        /* 画像 */
        const img = document.getElementById("news-image");
        if (item.image?.url) {
            img.src = item.image.url;
            img.alt = item.title;
        } else {
            img.style.display = "none";
        }

        /* 本文（リッチテキスト対応） */
        document.getElementById("news-body").innerHTML =
            item.body || item.content || "";
    })
    .catch((err) => {
        console.error("microCMS error:", err);
    });