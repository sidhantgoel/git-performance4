export default {
	downloadS3BaseUrl: 'https://run-artifacts-perf-infra.s3.ap-south-1.amazonaws.com/run_artifacts/',
	getRunFolder: () => runId.selectedOptionValue.split("_").join("/"),
	getActions: () => [
		'SELECT_CATEGORY',
		'BIND_TABLE_DATA',
		'CLICK_ON_TABLE_ROW',
		'UPDATE_POST_TITLE',
		'OPEN_MODAL',
		'CLOSE_MODAL',
		'SELECT_WIDGET_MENU_OPEN',
		'SELECT_WIDGET_SELECT_OPTION'
	],
	getDownloadSelectChromeProfile: () => {
		return this.getActions().map(action => ({
			label: action,
			value: action,
			children: Array(5).fill(0).map((val, index) => ({
				label: `${action} - Run ${index+1}`,
				value: `${action}_${index}.json.zip`
			}))
		}));
	},
	getDownloadChromeProfileUrl: async (iteration) => {
		const selectedValue = DownloadChromeProfileSelect.selectedOptionValue;
		const data = await getS3Artifacts.run({path: `${this.getRunFolder()}/Profiles/${selectedValue}_${iteration}.json.zip`});
		// const data = await getS3Artifacts.run({path: `3375150721/1/Profiles/CLOSE_MODAL_1.json.zip`});
		download(atob(data.fileData), `${selectedValue}_${iteration}.json.zip`);
	},
	downloadChromeProfileAllIterations: async () => {
		const selectedValue = DownloadChromeProfileSelect.selectedOptionValue;
		const downloadPromises = [];
		for(let i=1;i<=5;i++) {
			downloadPromises.push(getS3Artifacts.run({path: `${this.getRunFolder()}/Profiles/${selectedValue}_${i}.json.zip`}).then(data => download(atob(data.fileData), `${selectedValue}_${i}.json.zip`)));
		}
		await Promise.all(downloadPromises);
	},
	getDownloadTraceReportsUrl: async (iteration) => {
		const data = await getS3Artifacts.run({path: `${this.getRunFolder()}/Summaries&Reports/report__${iteration}__.json`});
		download(atob(data.fileData), `report__${iteration}__.json`);
	},
	getDownloadDebugLogsUrl: async () => {
		const data = await getS3Artifacts.run({path: `${this.getRunFolder()}/logs/debugLogs.log`});
		download(atob(data.fileData), `debugLogs.log`);
	},
	getDownloadTestCompareResultsUrl: async (which) => {
		// return `${this.downloadS3BaseUrl}${this.getRunFolder()}/${which}-perf-test-results.zip`;
		const data = await getS3Artifacts.run({path: `${this.getRunFolder()}/${which}-perf-test-results.zip`});
		download(atob(data.fileData), `${which}-perf-test-results.zip`);
	},
	getDownloadLogsUrl: async () => {
		const data = await getS3Artifacts.run({path: `${this.getRunFolder()}/logs.zip`});
		download(atob(data.fileData), `logs.zip`);
	},
	getDownloadScreenshots: async () => {
		const data = await Query1.run();
		download(atob(data.fileData), `welcome.png`);
		// download(atob(data.fileData), `login.png`);
	}
}