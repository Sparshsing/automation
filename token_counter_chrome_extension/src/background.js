import { getEncoding } from 'js-tiktoken';

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'tokenCount',
    title: 'Get Token Count',
    contexts: ['selection'],
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === 'tokenCount' && info.selectionText) {
    const tokenCount = await calculateTokenCount(info.selectionText);
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: showAlert,
      args: [`Token Count: ${tokenCount}`],
    });
  }
});

async function calculateTokenCount(text) {
  const enc = getEncoding('cl100k_base');
  const tokens = enc.encode(text);
  const tokenCount = tokens.length;
  return tokenCount;
//   const wordCount = text.trim().split(/\s+/).length;

//   return { tokenCount, wordCount };
}

function showAlert(message) {
  alert(message);
}
