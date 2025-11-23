document.addEventListener('DOMContentLoaded', () => {
	loadBlockedSites();
})

function loadBlockedSites() {
	const block_list = document.querySelector('.block-list');
	if (block_list) {
		block_list.innerHTML = '';
		chrome.storage.local.get('Panda_police_data', (result) => {
			if (result && result.Panda_police_data && result.Panda_police_data.blockedWebsites) {
				const blockedWebsites = result.Panda_police_data.blockedWebsites;

				blockedWebsites.forEach((hostname) => {
					addItemInList(hostname);
				})
			}
		})
	}

}

function addItemInList(hostname) {
	const block_list = document.querySelector('.block-list');

	if (block_list) {
		const item = document.createElement('li');
		item.id = hostname;

		const site_name = document.createElement('span');
		const button = document.createElement('button');

		site_name.className = 'site-name';
		site_name.innerText = hostname;

		item.appendChild(site_name);

		button.className = 'unblock-button';
		button.innerText = 'Unblock';
		button.onclick = ()=>{
			unBlock(hostname);
		}

		item.appendChild(button);
		block_list.appendChild(item);
	}
}

function unBlock(hostname) {
	chrome.storage.local.get('Panda_police_data', (result) => {
		if (result && result.Panda_police_data && result.Panda_police_data.blockedWebsites) {
			let blockedWebsites = result.Panda_police_data.blockedWebsites;
			const index = blockedWebsites.indexOf(hostname);

			if (index !== -1) { blockedWebsites.splice(index, 1) }
			chrome.storage.local.set({ 'Panda_police_data': { 'blockedWebsites': blockedWebsites } })
			loadBlockedSites();
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
