import axios from "axios";
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
        const htmlContent = response.data;

        const regex = /<tr>.*?<td>(\d+)<\/td>.*?<td class="td-top20"><img [^>]+alt="([^"]+)".*?<\/td><td>([^<]+)%<\/td><td>([\+\-\d.]+%)<\/td>/g;

        const languagesList: LanguageEntry[] = [];
        let match: RegExpExecArray | null;

        while ((match = regex.exec(htmlContent)) !== null) {
            const rank = parseInt(match[1], 10);
            const languageAlt = match[2];
            const language = languageAlt.split(" page")[0].trim();
            const percentage = parseFloat(match[3]);
            const change = match[4];

            languagesList.push({ rank, name: language, percentage, change });
        }

        return languagesList;
    } catch (error) {
        console.error("Error fetching TIOBE index:", error);
        return [];
    }
}

async function saveData() {
    const languages = await scrapeTiobe();
    console.log(languages);
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
