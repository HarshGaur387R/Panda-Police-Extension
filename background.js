chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (changeInfo && changeInfo.url) {
		const changedUrl = new URL(changeInfo.url);
		if (changedUrl.protocol !== 'https:') {
			console.log('protocol is not https: ');
			return;
		} else {
			chrome.storage.local.get('Panda_police_data', (result) => {
				if (result) {
					const blockedWebsites = result.Panda_police_data?.blockedWebsites || [];
					if (blockedWebsites.includes(changedUrl.hostname)) {
						chrome.tabs.update(tabId, { url: chrome.runtime.getURL("block-page.html") });
					}
				}
			})
			console.log("Tab URL changed to:", changeInfo.url);
		}
	}
});
