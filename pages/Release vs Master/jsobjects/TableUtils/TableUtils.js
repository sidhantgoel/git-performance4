export default {
	dataKey: 'RELEASE_MASTER_COMAPRISON_DATA',
	metrics: [
		'scripting',
		'rendering',
		'evalWorker_scripting',
	],
	init: async () => {
		await Promise.all([
			getCurrentRelease.run(),
			getPreviousRelease.run()
		]).then(data => {
			if(!data[0] || !data[1]) return undefined;
			return storeValue(this.dataKey, {currentRelease: data[0], previousRelease: data[1]});
		})
	},
	getTableData : () => {
		const data = getLatestReleaseComparisons.data;
		const results = [];
		for(const record of data) {
			const created = moment(record.created_at);
			const dat = {...record};
			if(!record.is_merge_commit) {
				for(const release of data) {
					const releaseCreated = moment(release.created_at);
					if(releaseCreated.isBefore(created) && release.is_merge_commit) {
						dat.comparisonMedian = release.lt_median_failure;
						dat.comparsonMin = release.lt_min_failure;
						break;
					}
				}
			}
			else {
				dat.comparisonMedian = null;
				dat.comparsonMin = null;
			}
			results.push(dat);
		}
		return results;
	},
	getReleaseSelectOptions: () => {
		const data = getLatestReleaseComparisons.data;
		return data.filter(record => !record.is_merge_commit).map(record => ({
			label: `${record.pull_request_id} -	${record.pr_title} (${record.gh_run_id} #${record.gh_run_attempt}) (${moment(record.created_at).format('DD/MM/YYYY HH:mm')})`,
			value: `${record.gh_run_id}_${record.gh_run_attempt}`
		}));
	},
	getCurrentSelectedRelease: () => {
		const runData = releaseSelect.selectedOptionValue.split('_');
		return runData;
	},
	getPrevSelectedRelease: () => {
		const runData = releaseSelect.selectedOptionValue.split('_');
		const data = getLatestReleaseComparisons.data;
		const results = [];
		let isFound = false;
		for(const record of data) {
			if(record.gh_run_id == runData[0] && record.gh_run_attempt == runData[1]) {
				isFound = true;
				continue;
			}
			if(isFound && record.is_merge_commit) {
				results.push(record.gh_run_id);
				results.push(record.gh_run_attempt);
				results.push(record.pull_request_id);
				results.push(record.pr_title);
				break;
			}
		}
		console.log(results, runData);
		return results;
	},
	getMetricsToShow : () => {
		return this.metrics.map(x => "'" + x + "'").toString();
	},
	getStandardDeviation: (array)=> {
		const n = array.length
		const mean = array.reduce((a, b) => a + b) / n
		const sd = Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
		return {sd, cov: sd/mean*100}; //cov : coefficient of variation
	},
	mean: (arr)=> {
		return (arr.reduce((sum, value) => sum + value, 0)/arr.length).toFixed(2);
	},
	median: (arr)=>{
		arr.sort(function(a, b){ return a - b; });
		var i = arr.length / 2;
		return i % 1 == 0 ? ((arr[i - 1] + arr[i]) / 2).toFixed(2) : arr[Math.floor(i)];
	},
	min: (arr)=> {
		return Math.min.apply(arr,arr);
	},
	getFromattedRunData: () => {
		const data = appsmith.store[this.dataKey];
		if(!data) return [];
		const { currentRelease, previousRelease } = data;
		let current= _.groupBy(currentRelease,'action');
		Object.entries(current).forEach(
			([key, value]) => {
				current[key]= _.groupBy(value,'metric')
			}
		);
		
		let prev = _.groupBy(previousRelease,'action')
		Object.entries(prev).forEach(
			([key, value]) => {
				prev[key]= _.groupBy(value,'metric')
			}
		);

		const out =[]
		Object.entries(current).sort((entry1, entry2) => entry1[0].localeCompare(entry2[0])).forEach(([action,value])=>{
			// Level #1 Actions
			out.push({action})
			Object.entries(value).forEach(([metric,values])=>{
				// Level #2 Metrics
				if(current[action]?.[metric]?.[0] != null && prev[action]?.[metric]?.[0] != null) {
					const row = {action:metric}
					const runValues = values.map((value) => value.value); 
					// const runIds = [];
					const prevValues = prev[action][metric];
					const prevRunValues = prevValues.map((value) => value.value);  
					// row.runIds = runIds;
					row.runValues = runValues;
					row.prevRunValues = prevRunValues;
					const standardDeviationCurrent = this.getStandardDeviation(runValues);
					row.sdCurrent = parseFloat(standardDeviationCurrent.sd.toFixed(2));// Add SD
					row.covCurrent = parseFloat(standardDeviationCurrent.cov.toFixed(2)); // Add SD Percentage
					const standardDeviationPrev = this.getStandardDeviation(prevRunValues);
					row.sdPrev = parseFloat(standardDeviationPrev.sd.toFixed(2));// Add SD
					row.covPrev = parseFloat(standardDeviationPrev.cov.toFixed(2)); // Add SD Percentage
					row.medianCurrent = this.median(runValues) // Add run median
					row.minCurrent = this.min(runValues);
					row.medianPrev = this.median(prevRunValues);
					row.minPrev = this.min(prevRunValues);
					row.difference = row.medianPrev ? parseFloat(((row.medianPrev-row.medianCurrent)/row.medianPrev*100).toFixed(2)) : undefined;
					row.differenceMin = row.minPrev ? parseFloat(((row.minPrev-row.minCurrent)/row.minPrev*100).toFixed(2)) : undefined;
					// const last3Medians = [baseMedian[action][metric]?.[0]?.median1, baseMedian[action][metric]?.[0]?.median2, baseMedian[action][metric]?.[0]?.median3];
					out.push(row)
				}
			})
		})
		return out;
	},
}