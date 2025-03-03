# TIOBE Scraper

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A simple web scraper to fetch the latest programming language rankings from the [TIOBE Index](https://www.tiobe.com/tiobe-index/). The data is extracted using **Bun, TypeScript, and Regular Expressions**, then saved as JSON and YAML.

## Features

- Fetches the latest programming language rankings from TIOBE
- Extracts **rank, name, percentage, and change** in ranking
- Saves results in **JSON** and **YAML** formats
- Uses **Bun** for fast execution

## Installation

Ensure you have [Bun](https://bun.sh/) installed on your system:

```sh
curl -fsSL https://bun.sh/install | bash
```

Then, clone the repository and install dependencies:

```sh
git clone https://github.com/BaseMax/tiobe-scraper.git
cd tiobe-scraper
bun install
```

## Usage

Run the scraper with:

```sh
bun run start
or
bun run scraper.ts
```

### Output

The results will be saved as:
- **tiobe.json** (structured JSON format)
- **tiobe.yaml** (YAML format for easy readability)

Example output:
```json
[
  {
    "rank": 1,
    "name": "Python",
    "percentage": 23.88,
    "change": "+8.72%"
  },
  {
    "rank": 2,
    "name": "C++",
    "percentage": 11.37,
    "change": "+0.84%"
  }
]
```

## License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.

## Author

**Max Base** (c) 2025
