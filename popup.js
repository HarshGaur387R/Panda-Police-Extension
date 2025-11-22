// ./popup.js
// TODO: Change text and make block-button dissable once website is dissable.

const blockButton = document.querySelector('.block-button');

// Add the website's hostname to the local storage.
function blockWebsite(hostname, tabId) {
	chrome.storage.local.get('Panda_police_data', (result) => {
		if (!result.Panda_police_data) {
			chrome.storage.local.set({ 'Panda_police_data': { blockedwebsites: [] } },
				function() {
					console.log('Storage did not exist, Insitialized it');
					const blockedWebsites = result.Panda_police_data?.blockedWebsites || [];
					blockedWebsites[0] = hostname;
					chrome.storage.local.set({ 'Panda_police_data': { 'blockedWebsites': blockedWebsites } })
					chrome.tabs.update(tabId, { url: chrome.runtime.getURL("block-page.html") });
				}
			)
			return;
		}
		else {
			const blockedWebsites = result.Panda_police_data?.blockedWebsites;
			if (blockedWebsites.includes(hostname)) {
				console.log('Already blocked');
				return;
			}
			blockedWebsites.push(hostname);
			chrome.storage.local.set({ 'Panda_police_data': { 'blockedWebsites': blockedWebsites } })
			chrome.tabs.update(tabId, { url: chrome.runtime.getURL("block-page.html") });
		}
	})
}

// // // // // DOM Manipulation // // // // // 

// Check if back button exists (on option.html) and navigate to popup.html
const backBtn = document.getElementById('backBtn');
if (backBtn) {
	backBtn.addEventListener('click', function() {
		window.location.href = 'popup.html';
	});
}

// Add listener for buttons that navigate to option.html
const openOptionsButtons = document.querySelectorAll('.open-options');
openOptionsButtons.forEach(btn => {
	btn.addEventListener('click', function() {
		window.location.href = 'option.html';
	});
});


if (blockButton) {
	blockButton.addEventListener('click', function() {
		chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
			const newUrl = new URL(tabs[0].url);
			if (newUrl.protocol === 'https:') {
				blockWebsite(newUrl.hostname, tabs[0].tabId);
			}
		});
	})
}
