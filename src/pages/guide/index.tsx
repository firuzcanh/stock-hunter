import { Layout } from "@/components";

const GuidePage: React.FC = () => {
  return (
    <Layout.Root>
      <Layout.Content className="border-none py-16">
        <div className="prose prose-xl mx-auto">
          <h1>Guide</h1>
          <p>
            First you need to install Tampermonkey extension from google chrome
            store.{" "}
            <a
              href="https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo"
              target="_blank"
            >
              Here is the link to install
            </a>
          </p>

          <p>
            Then you need create a script inside Tampermonkey and add entire
            codes below
          </p>

          <pre>
            <code>{script_code}</code>
          </pre>

          <p>
            After adding codes above, you will see Copy button on some image
            page on Shutterstock, you can click Copy button and paste it
            Generate input.
          </p>
        </div>
      </Layout.Content>
    </Layout.Root>
  );
};

const script_code = `// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2024-03-11
// @description  try to take over the world!
// @author       You
// @match        https://www.shutterstock.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=shutterstock.com
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    const targetDiv = document.querySelector(".mui-tlkxlz-actionIcons");

    // Eğer sınıfa sahip div bulunursa içine butonu ekliyoruz
    if (targetDiv) {
    const buttonHTML = '<button class="copyButton">Copy</button>';

    targetDiv.innerHTML += buttonHTML;

    // Buton elementini seçiyoruz ve tıklama olayını ekliyoruz
    const copyButton = targetDiv.querySelector(".copyButton");

    if (copyButton) {
        copyButton.addEventListener("click", function () {
        const data = window.__NEXT_DATA__;
        if (
            typeof data !== "undefined" &&
            data.props &&
            data.props.pageProps &&
            data.props.pageProps.asset
        ) {
            const asset = __NEXT_DATA__.props.pageProps.asset;

            const metaObject = {
            id: asset.id,
            title: asset.title,
            description: asset.description,
            keywords: asset.keywords,
            isEditorial: asset.isEditorial,
            categories: asset.categories,
            src: asset.src,
            status: 0,
            imageScores: asset.imageScores,
            };

            const metaText = JSON.stringify(metaObject, null, 2); // MetaObject'i JSON formatında stringe çeviriyoruz

            navigator.clipboard
            .writeText(metaText)
            .then(() => {
                console.log("MetaObject panoya kopyalandı:", metaText);
            })
            .catch((err) => {
                console.error("Panoya kopyalama hatası:", err);
            });
        } else {
            console.warn("Asset data bulunamadı.");
        }
        });
    }
    } else {
    console.warn("Target div bulunamadı.");
    }
})();`;

export default GuidePage;
