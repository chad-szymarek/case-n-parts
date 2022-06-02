const axios = require("axios");
const cheerio = require("cheerio");
const cliProgress = require("cli-progress");

const createSqlInsert = require("../createSqlInsert");
const { partDefaultUrls } = require("../urls");

async function getDetailPages() {
  const { data } = await axios(partDefaultUrls.mobos);
  const $ = cheerio.load(data);

  const detailUrls = [];
  $(".detail_wrapper a").each((i, element) => {
    detailUrls.push(partDefaultUrls.base + $(element).attr("href"));
  });

  return detailUrls;
}

function mapDetailPage($) {
  const specs = {};
  $(".spec-body").each((i, element) => {
    const specName = $("div:first-child", element).text();
    const specValue = $("div:last-child", element).text();
    specs[specName] = specValue;
  });

  // totalPciSlots = pciSlots[express4] + pciSlots[express3] + pciSlots[express1];

  const data = {
    sku: specs["SKU"],
    socket_type: specs["Socket Type"],
    max_memory: specs["Max Memory Supported"],
    max_memory_per_slot: specs["Maximum Memory Supported Per Slot"],
    pcie_slots: 4,
    memory_slots: Number(specs["Memory Slots"].charAt(0)),
  };

  return data;
}

async function scrapeMobos() {
  const detailUrls = await getDetailPages();

  const scrapeProgress = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic
  );

  // start the progress bar with a total value of 200 and start value of 0
  scrapeProgress.start(detailUrls.length, 0);

  const detailValues = await Promise.all(
    detailUrls
      .filter(url => url.includes("am4"))
      .map(async (url, i) => {
        return new Promise((resolve, reject) => {
          try {
            setTimeout(async () => {
              const { data } = await axios(url);
              const $ = cheerio.load(data);
              const rowData = mapDetailPage($);
              resolve([rowData]);

              // update the current value in your application..
              scrapeProgress.update(i);
            }, i * 300 + Math.floor(Math.random() * 300));
          } catch (error) {
            reject(error);
          }
        });
      })
  );

  // stop the progress bar
  scrapeProgress.stop();

  await createSqlInsert("./mobos.sql", "mobos", detailValues[0]);

  console.log("Done! Go look in mobos.sql for your insert statement!");
}

exports.scrapeMobos = scrapeMobos;