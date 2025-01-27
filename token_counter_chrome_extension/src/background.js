import { getEncoding } from 'js-tiktoken';

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'tokenCount',
    title: 'Get Token Count',
    contexts: ['selection'],
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === "tokenCount" && info.selectionText) {
      const { tokenCount, wordCount } = await calculateCounts(info.selectionText);
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: showAlert,
        args: [`Token Count: ${tokenCount}, Word Count: ${wordCount}`],
      });
    }
  });

async function calculateCounts(text) {
  const enc = getEncoding('cl100k_base');
  const tokens = enc.encode(text);
  const tokenCount = tokens.length;
  const wordCount = text.trim().split(/\s+/).length;

  return { tokenCount, wordCount };
}

function showAlert(message) {
  alert(message);
}
