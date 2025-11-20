// ./popup.js

// Add the website's hostname to the local storage.
function blockWebsite(hostname) {
	chrome.storage.local.get('Panda_police_data', (result) => {
		if (!result.Panda_police_data) {
			chrome.storage.local.set({ 'Panda_police_data': { blockedwebsites: [] } },
				function() {
					console.log('Storage did not exist, Insitialized it');
					const blockedWebsites = result.Panda_police_data?.blockedWebsites || [];
					blockedWebsites[0] = hostname;
					chrome.storage.local.set({ 'Panda_police_data': { 'blockedWebsites': blockedWebsites } })
				}
			)
			return;
		}
		else {
			const blockedWebsites = result.Panda_police_data?.blockedWebsites;
			if(blockedWebsites.includes(hostname)){
				console.log('Already blocked');
				return;
			}
			blockedWebsites.push(hostname);
			chrome.storage.local.set({ 'Panda_police_data': { 'blockedWebsites': blockedWebsites } })
		}
	})
}

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

const onBlockButtonClick = document.querySelector('.block-button');
onBlockButtonClick.addEventListener('click', function() {
	chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
		const newUrl = new URL(tabs[0].url);
		blockWebsite(newUrl.hostname);
	});
})

