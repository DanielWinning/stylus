const coverageData = require('../coverage/coverage-final.json');
const fs = require('fs');

let coveragePercentages = getPercentagesFromAllFiles(coverageData);

displayCoverageBadge(coveragePercentages);

function calculateCoverage(dataset)
{
    let total = Object.keys(dataset).length,
        covered = Object.values(dataset).filter(count => count > 0).length;

    return ((covered / total) * 100).toFixed(2);
}

function getPercentagesFromAllFiles(coverageData)
{
    let coveragePercentages = [];

    for (const filepath in coverageData) {
        const data = coverageData[filepath];

        coveragePercentages.push(calculateCoverage(data.s));
        coveragePercentages.push(calculateCoverage(data.f));
    }

    return coveragePercentages;
}

function getTotalCoverage(coveragePercentages)
{
    let count = coveragePercentages.length,
        sum = coveragePercentages.reduce((runningTotal, percentage) => {

            return Number(runningTotal) + Number(percentage);
        });

    return (sum / count).toFixed(2);
}

function generateBadgeURL(coveragePercentages, coverageStatus) {
    return `https://img.shields.io/badge/Coverage-${coveragePercentages}%25-${coverageStatus}.svg`;
}

function getCoverageStatus(coveragePercentages) {
    const coverage = parseFloat(coveragePercentages);

    if (coverage >= 90) {
        return 'green';
    } else if (coverage >= 80) {
        return 'yellow';
    } else {
        return 'red';
    }
}

function generateHTMLBadge(coveragePercentages, coverageStatus) {
    const badgeURL = generateBadgeURL(coveragePercentages, coverageStatus);
    return `<img src="${badgeURL}" alt="Coverage ${coveragePercentages}%">`;
}

function displayCoverageBadge(coverageData) {
    const coveragePercentages = getTotalCoverage(coverageData);
    const coverageStatus = getCoverageStatus(coveragePercentages);
    const badgeHTML = generateHTMLBadge(coveragePercentages, coverageStatus);

    updateReadmeWithBadge(badgeHTML);
}

function updateReadmeWithBadge(badgeHTML) {
    const readmePath = 'README.md';

    fs.readFile(readmePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading README file: ${err}`);
            return;
        }

        const badgeRegex = /<!-- Coverage Badge -->\n(<img[^>]*>)/;
        if (badgeRegex.test(data)) {
            const updatedReadme = data.replace(badgeRegex, `<!-- Coverage Badge -->\n${badgeHTML}`);
            updateReadmeFile(readmePath, updatedReadme);
        } else {
            // No existing badge found, so add the new badge after the comment
            const updatedReadme = data.replace(/(<!-- Coverage Badge -->)/, `$1\n${badgeHTML}`);
            updateReadmeFile(readmePath, updatedReadme);
        }
    });
}

function updateReadmeFile(readmePath, updatedReadme) {
    fs.writeFile(readmePath, updatedReadme, 'utf8', (err) => {
        if (err) {
            console.error(`Error writing to README file: ${err}`);
        } else {
            console.log('Badge added to README');
        }
    });
}