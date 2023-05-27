// Load the necessary libraries
const puppeteer = require('puppeteer');

// Define the URL to scrape
const url = 'https://www.google.com/maps/search/preschools/';

// Define a function to extract phone numbers from a given page
async function extractPhoneNumbers(page) {
  const phoneNumbers = await page.evaluate(() => {
    const phoneElements = document.querySelectorAll('[data-item-id] [data-tooltip*="Phone"] span');
    return Array.from(phoneElements, el => el.textContent.trim());
  });
  return phoneNumbers;
}

// Define the main function to run the script
async function scrape() {
  // Launch a new browser instance
  const browser = await puppeteer.launch();

  // Open a new page
  const page = await browser.newPage();

  // Navigate to the URL
  await page.goto(url);

  // Wait for the results to load
  await page.waitForSelector('[data-result-index="0"]');

  // Extract the phone numbers from the first page of results
  const phoneNumbers = await extractPhoneNumbers(page);

  // Log the results
  console.log(phoneNumbers);

  // Close the browser
  await browser.close();
}

// Run the script
scrape();