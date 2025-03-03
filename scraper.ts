import axios from "axios";
import * as cheerio from "cheerio";
import * as fs from "fs";
import * as yaml from "js-yaml";

interface LanguageEntry {
    rank: number;
    name: string;
    percentage: number;
    change: string;
}

async function scrapeTiobe(): Promise<LanguageEntry[]> {
    const url = "https://www.tiobe.com/tiobe-index/";
    
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        const languagesList: LanguageEntry[] = [];

        $("tr").each((_, row) => {
            const columns = $(row).find("td");
            if (columns.length >= 4) {
                const rank = parseInt($(columns[0]).text().trim(), 10);
                const languageAlt = $(columns[1]).find("img").attr("alt") || "";
                const language = languageAlt.split(" page")[0].trim();
                const percentage = parseFloat($(columns[2]).text().trim());
                const change = $(columns[3]).text().trim();

                if (!isNaN(rank) && language) {
                    languagesList.push({ rank, name: language, percentage, change });
                }
            }
        });

        return languagesList;
    } catch (error) {
        console.error("Error fetching TIOBE index:", error);
        return [];
    }
}

async function saveData() {
    const languages = await scrapeTiobe();
    if (languages.length === 0) {
        console.error("No data fetched.");
        return;
    }

    const jsonOutput = JSON.stringify(languages, null, 2);
    const yamlOutput = yaml.dump(languages);

    fs.writeFileSync("tiobe.json", jsonOutput);
    fs.writeFileSync("tiobe.yaml", yamlOutput);

    console.log("Data saved as tiobe.json and tiobe.yaml");
}

saveData();
