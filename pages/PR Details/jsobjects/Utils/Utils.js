export default {
	defaultMetrics: [
		"scripting",
		"rendering",
		"evalWorker_scripting",
	], 
	metrics: [
		'scripting',
		'rendering',
		'evalWorker_scripting', 
	],
	metricsOrder: this.metrics.reduce((acc, metric, index) => ({...acc, [metric]: index+1}, {})),
	/*metricsOrder : new Proxy(this.metrics.reduce((acc, metric, index) => ({...acc, [metric]: index+1}, {})), {
		get(target, prop, receiver) {
    if (!this.metrics.includes(prop)) {
      return this.metrics.length + 1;
    }
    return Reflect.get(...arguments);
  },
	}),*/
	runComparisonOptions: [
		{
			label: 'Compare with Long Term average Merge Runs(LT)',
			value: 50,
		},
		{
			label: 'Compare with Short Term average Merge Runs(ST)',
			value: 3,
		},
		{
			label: 'Compare with Both(LT & ST)',
			value: 1, 
		}
	],
	defaultAction: 'SELECT_CATEGORY',
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
	isRegression:({median,baseMedian,baseSD,min,baseMin,baseSDmin}) => {
		const isMinRegression = (min - baseMin)> 1.2*baseSDmin;
		const isMedianRegression = (median-baseMedian)> 1.2*baseSD;
		return `Median: ${isMedianRegression ? '❌':'✅'} | Min: ${isMinRegression ? '❌':'✅'}`;
	},
	isRegressionLast3: ({median, last3BaseMedian, baseSD, min, last3BaseMin, baseSDmin}) => {
		const isMinRegression = (min - last3BaseMin)> 1.2*baseSDmin;
		const isMedianRegression = (median-last3BaseMedian)> 1.2*baseSD;
		return `Median: ${isMedianRegression ? '❌':'✅'} | Min: ${isMinRegression ? '❌':'✅'}`;
	},
	getCurrentTable:() => TableMedian,
	getRunAttemptOptions:() => getPRMetaRuns.data.filter(option => option.value === runId.selectedOptionValue)?.[0]?.children ?? [],
	getRunIdAttemptOptions:() => getPRMetaRuns.data.map(option => option.children.map(attempt => ({
			label: `${attempt.label} #${attempt.value} (${moment(attempt.time).format('DD/MM/YYYY HH:mm')})`,
			value: `${option.value}_${attempt.value}`,
			time: attempt.time,
			id: attempt.id, 
			mergeCommit: attempt.mergeCommit
		}))).flatMap(option => option).sort((a1, a2) => moment(a1.time).isAfter(a2.time) ? -1 : 1),
	getCurrentRunMetadata:(runIdValue) => getPRMetaRuns.data.map(option => option.children.map(attempt => ({
			value: `${option.value}_${attempt.value}`,
			runId: option.value,
			id: attempt.id,
			mergeCommit: attempt.mergeCommit
		}))).flatMap(option => option).filter(option => option.value == (runIdValue ?? runId.selectedOptionValue))?.[0],
	getLastMergeCommit: this.getRunIdAttemptOptions()?.[0]?.mergeCommit,
	getCurrentRunMetaId:(runIdValue) => {
		return this.getCurrentRunMetadata(runIdValue)?.id;
	},
	getMinimumRunMetaId: (runIdValue) => {
		const runIdVal = (runIdValue ?? runId.selectedOptionValue).split('_')?.[0]; 
		const minRun = getPRMetaRuns.data.filter(run => run.value == runIdVal)?.[0];
		let min = Number.MAX_SAFE_INTEGER;
		if(minRun) {
			console.log(minRun);
			for(const runMeta of minRun.children) {
				min = Math.min(parseInt(runMeta.id), min);
			}
			console.log(min);
			return min;
		}
		return undefined
	},
	getMetricsToShow:()=>{
		return selectMetrics.selectedOptionValues.map(x => "'" + x + "'").toString();
	},
	getStandardDeviation: (array)=> {
		const n = array.length
		const mean = array.reduce((a, b) => a + b) / n
		const sd = Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
		return {sd, cov: sd/mean*100}; //cov : coefficient of variation
	},
	getActions: () => {
		return Object.keys(_.groupBy(getRunData.data, 'action')).map(v => ({label: v, value: v}));
	},
	checkIfAR: () => RunComparisonSelect.selectedOptionValue === 1 || RunComparisonSelect.selectedOptionValue === 50,
	checkIfRR: () => RunComparisonSelect.selectedOptionValue === 1 || RunComparisonSelect.selectedOptionValue === 3,
	getPercentageSDValues: (row, sd, base) => {
		return row["Run 1"] ? `${sd} (${(sd/base * 100).toFixed(2)}%)` : undefined;
	},
	getFromattedRunData: () => { 
		let formatted= _.groupBy(getRunData.data,'action');
		Object.entries(formatted).forEach(
			([key, value]) => {
				formatted[key]= _.groupBy(value,'metric')
			}
		);
		
		let baseMedian = _.groupBy(getLatestReleaseMean.data,'action')
		Object.entries(baseMedian).forEach(
			([key, value]) => {
				baseMedian[key]= _.groupBy(value,'metric')
			}
		);
		let shortTermMedian = _.groupBy(getShortTermReleaseMean.data, 'action')
		Object.entries(shortTermMedian).forEach(
			([key, value]) => {
				shortTermMedian[key]= _.groupBy(value,'metric')
			}
		);
		const out =[]
		Object.entries(formatted).sort((entry1, entry2) => entry1[0].localeCompare(entry2[0])).forEach(([action,value])=>{
			// Level #1 Actions
			out.push({action})
			Object.entries(value).sort((entry1, entry2) => (this.metricsOrder[entry1[0]] ?? 4) - (this.metricsOrder[entry2[0]]?? 4)).forEach(([metric,values])=>{
				// Level #2 Metrics
				if(formatted[action][metric]?.[0] != null) {
					const row = {action:metric}
					let runValues=[]
					const runIds = [];
					values.forEach((value,i)=>{
						row[`Run ${i+1}`]=value.value;
						runIds.push(value.id);
						runValues.push(value.value)
					})
					row.runIds = runIds;
					const standardDeviation = this.getStandardDeviation(runValues);
					row.sd = parseFloat(standardDeviation.sd.toFixed(2));// Add SD
					row.cov = parseFloat(standardDeviation.cov.toFixed(2)); // Add SD Percentage
					row.baseMedian = baseMedian[action]?.[metric]?.[0]?.median ?? undefined; // Add base median
					row.baseMin = baseMedian[action]?.[metric]?.[0]?.min ?? undefined;
					row.baseSD = baseMedian[action]?.[metric]?.[0]?.sd ?? undefined;
					row.baseSDmin = baseMedian[action]?.[metric]?.[0]?.sdmin ?? undefined;
					row.median = this.median(runValues) // Add run median
					row.min = this.min(runValues);
					row.difference = row.baseMedian ? parseFloat(((row.baseMedian-row.median)/row.baseMedian*100).toFixed(2)) : undefined;
					row.differenceMin = row.baseMin ? parseFloat(((row.baseMin-row.min)/row.baseMin*100).toFixed(2)) : undefined;
					row.lastRelease = baseMedian[action][metric]?.[0]?.lastrelease;
					// const last3Medians = [baseMedian[action][metric]?.[0]?.median1, baseMedian[action][metric]?.[0]?.median2, baseMedian[action][metric]?.[0]?.median3];
					const last3Mins = [baseMedian[action][metric]?.[0]?.min1, baseMedian[action][metric]?.[0]?.min2, baseMedian[action][metric]?.[0]?.min3];
					// row.last3BaseMedian = this.mean(last3Medians);
					// row.last3BaseMin = this.mean(last3Mins);
					// row.last3BaseSDmedian = this.getStandardDeviation(last3Medians).sd.toFixed(2);
					// row.last3BaseSDmin = this.getStandardDeviation(last3Mins).sd.toFixed(2);
					
					row.last3BaseMedian = shortTermMedian[action]?.[metric]?.[0]?.median ?? undefined;
					row.last3BaseMin = shortTermMedian[action]?.[metric]?.[0]?.min ?? undefined;
					row.last3BaseSDmedian = shortTermMedian[action]?.[metric]?.[0]?.sd ?? undefined;
					row.last3BaseSDmin = shortTermMedian[action]?.[metric]?.[0]?.sdmin ?? undefined;
					
					row.last3Difference = row.last3BaseMedian ? parseFloat(((row.last3BaseMedian-row.median)/row.last3BaseMedian*100).toFixed(2)) : undefined;
					row.last3DifferenceMin = row.last3BaseMin ? parseFloat(((row.last3BaseMin-row.min)/row.last3BaseMin*100).toFixed(2)) : undefined;
					out.push(row)  
				}
			})
		}) 
		return out  ;
	},
	addPRandMergeRunToURL: () => {
		const pr = prSelect.selectedOptionValue;
		const run = runId.selectedOptionValue ?? this.getRunAttemptOptions()?.[0].value;
		if(pr != null) {
			navigateTo('PR Details',{...appsmith.URL.queryParams, pr,
															 runId: run}, 'SAME_WINDOW')
			return;
		}
		if(run != null) {
			navigateTo('PR Details',{...appsmith.URL.queryParams,
															 runId: run}, 'SAME_WINDOW')
		}
	},
	getRunValueRegex: () => "^[1-9]\\d*((\\.\\d+)|(\\d*))$",
	incorrectRunValueMessage: "Not a valid number",
	updateRunValue: async (runNumber) => {
		const updateRunObj = {
			id: this.getCurrentTable().updatedRow.runIds[runNumber-1],
			value: parseFloat(this.getCurrentTable().updatedRow[`Run ${runNumber}`]).toFixed(2)
		};
		try {
			await updateRunValue.run(updateRunObj);
			await getRunData.run();
			showAlert("Update Successful!", "success");
		}
		catch(e) {
			resetWidget('TableMedian');
			showAlert(e.message, "error");	
		}
	},
	getCustomLineChart: () => {
  	const config = {
			type: "msline",
			dataSource: {
				chart: {
					caption: this.getCurrentAction() ? (String(this.getCurrentAction()) + " : Metrics trend across releases") : "Please Select an Action to see metrics across releases",
					subCaption: "Showing selected metrics for the action:"+ this.getCurrentAction() +" across releases",
					xAxisName: "<i>Pull Request ID (Run Meta)</i>",
					yAxisName: "MS",
					theme: "fusion"
    		},
				categories: [{category: []}],
				dataset: [],
				trendlines: [
						{
								line: []
						}
				]
			}
		}
		
		const data = getLastReleaseRuns.data.filter(data => Number(data.prid) > 0).reverse();
		
		// create the config object for the chart with the given data
		data.forEach((v) => {
			if(!_.find(config.dataSource.categories[0].category, {label: `<a target="_blank" href="https://github.com/appsmithorg/appsmith/pull/${v.prid}">${v.prid}</a>(${v.meta})`})) {
				config.dataSource.categories[0].category.push({label: `<a target="_blank" href="https://github.com/appsmithorg/appsmith/pull/${v.prid}">${v.prid}</a>(${v.meta})`})
			}
			//if(!_.find(config.dataSource.categories[0].category, {label: `${v.prid}(${v.meta})`})) {
			//	config.dataSource.categories[0].category.push({label: `${v.prid}(${v.meta})`})
			//}
			if(!_.find(config.dataSource.dataset, {seriesname: v.metric})) {
				config.dataSource.dataset.push({seriesname: v.metric, data: [{value: v.value, "anchorBorderColor": v.is_anomaly ? "#cc3333" : '#fff',
            "anchorBgColor": v.is_anomaly ? "#ff9900" : '#fff'}]})
			}
			else {
				_.find(config.dataSource.dataset, {seriesname: v.metric}).data.push({value: v.value, "anchorBorderColor": v.is_anomaly ? "#cc3333" : '#fff',
            "anchorBgColor": v.is_anomaly ? "#ff9900" : '#fff'})
			}
		})
		return config
	},
	getPrUrlFromTag: (tag) => {
		return tag.split('href=&#034;')?.[1]?.split('&#034;')?.[0];
	},
	setCurrentAction: async (currentRow) => {
		if(currentRow["Run 1"] == null) {
			await storeValue("currentAction", currentRow.action);
			await getLastReleaseRuns.run();
		}
	},
	getCurrentAction: () => appsmith.store.currentAction ?? 'SELECT_CATEGORY'
}