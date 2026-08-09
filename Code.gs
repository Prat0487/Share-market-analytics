/**
 * Zerodha Holdings Analytics — Google Apps Script Web App
 * Serves the dashboard UI. All CSV parsing & analytics run client-side
 * so holdings never leave the browser.
 */

function doGet() {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Holdings Pulse — Zerodha Analytics')
    .setFaviconUrl('https://www.gstatic.com/images/branding/product/1x/apps_script_48dp.png')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/** Include HTML partials (Stylesheet, ClientJS). */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Optional server-side parse for Sheet export / logging.
 * Primary path remains client-side FileReader.
 * @param {string} csvText Raw Zerodha holdings.csv contents
 * @return {Object} Summary counts for Apps Script logs
 */
function logUploadSummary(csvText) {
  if (!csvText || typeof csvText !== 'string') {
    return { ok: false, message: 'Empty payload' };
  }
  var lines = csvText.trim().split(/\r?\n/).filter(Boolean);
  var holdings = Math.max(0, lines.length - 1);
  console.log('Holdings upload: ' + holdings + ' rows');
  return { ok: true, holdings: holdings, uploadedAt: new Date().toISOString() };
}
