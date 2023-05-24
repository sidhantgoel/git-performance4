export default {
	FAILURES_COUNT: 'FAILURES_COUNT',
	PR_DETAILS_DATA: 'PR_DETAILS_DATA',
	init:async ()=>{
		await Promise.all([
			getAllRepos.run(),
			getMetrics.run(),
			storeValue(this.FAILURES_COUNT, undefined),
			storeValue('PR_' + this.FAILURES_COUNT, undefined),
			storeValue(this.PR_DETAILS_DATA, undefined),
		]);
		await fetchLast100PRruns.run();
		await getPRMetaRuns.run();
		await getLastReleaseRuns.run();
		const runIdValue = appsmith.URL.queryParams.runId ?? Utils.getRunIdAttemptOptions()?.[0]?.value;
		await Promise.all([
			getRunData.run({runId: runIdValue}),
			getLatestReleaseMean.run({metaId: Utils.getMinimumRunMetaId(runIdValue)}),
			getShortTermReleaseMean.run({metaId: Utils.getMinimumRunMetaId(runIdValue)}),
			getCombinedRunData.run({runId: runIdValue}),
		]).then((data) => {
			return storeValue(this.PR_DETAILS_DATA, {runData: data[0], latestReleaseMean: data[1], shortTermMean: data[2], combinedRunData: data[3]})
		}).catch((data) => {
			return storeValue(this.PR_DETAILS_DATA, undefined);
		});
		await this.checkCombinedRunData();
		getPrDetails.run();
		/*await Promise.all([
			getAllRepos.run(),
			getMetrics.run(),
			fetchLast100PRruns.run(),
			getPRMetaRuns.run()
		]);*/
		// await getLatestReleaseMean.run();
		// await getShortTermReleaseMean.run();
		// await this.setCurrentAction(this.getCurrentAction());
	},
	isRunDone: false,
	getDistinctPrs: () => {
		const prData = fetchLast100PRruns.data;
		const distinctPrIds = new Set();
		const distinctPrData = [];
		for(const pr of prData) {
			if(distinctPrIds.has(pr.value)) continue;
			distinctPrIds.add(pr.value);
			distinctPrData.push(pr);
		}
		return distinctPrData;
	},
	getCurrentRunMetaId:() => {
		const currentRunId = runId.selectedOptionValue.split('_')?.[0];
		return getPRMetaRuns.data.filter(option => {
									console.log(option.value, currentRunId);
									return String(option.value) == String(currentRunId);
								})?.[0]?.id || getPRMetaRuns.data?.[0]?.id;
	},
	changeRepo: async () => {
		await navigateTo('PR Details',{pr: undefined,
															 runId: undefined, repo: RepoSelect.selectedOptionValue}, 'SAME_WINDOW')
	},
	getFailureStatsData: (num) => {
		const data = getFailureStats.data;
		const total = data.filter(record => record.failures === 100)?.[0]?.count
		const count =  data.filter(record => record.failures === num)?.[0]?.count;
		return `${count} / ${total}`
	},
	getRunDataWithLTandST: () => {
		// const runData = getRunData.data;
		// const latestReleaseMean = getLatestReleaseMean.data;
		// const shortTermMean = getShortTermReleaseMean.data;
		// const combinedRunData = getCombinedRunData.data;
		// return {runData, latestReleaseMean, shortTermMean, combinedRunData };
		return appsmith.store[this.PR_DETAILS_DATA];
	},
	getRunDataWithMeans: async (runIdValue) => {
		// await getRunData.run();
		// await getLatestReleaseMean.run();
		// await getShortTermReleaseMean.run();
		await storeValue(this.FAILURES_COUNT, undefined);
		const minRunMetaId = Utils.getMinimumRunMetaId(runIdValue);
		console.log({minRunMetaId});
		await Promise.all([
			getRunData.run({runId: runIdValue}),
			getLatestReleaseMean.run({metaId: minRunMetaId}),
			getShortTermReleaseMean.run({metaId: minRunMetaId}),
			getCombinedRunData.run({runId: runIdValue}),
		]).then((data) => {
			return storeValue(this.PR_DETAILS_DATA, {runData: data[0], latestReleaseMean: data[1], shortTermMean: data[2], combinedRunData: data[3]})
		}).catch((data) => {
			return storeValue(this.PR_DETAILS_DATA, undefined);
		});
		await this.checkCombinedRunData();
	},
	checkCombinedRunData: async () => {
		const { combinedRunData, latestReleaseMean, shortTermMean } = this.getRunDataWithLTandST();
		let formatted= _.groupBy(combinedRunData,'action');
		Object.entries(formatted).forEach(
			([key, value]) => {
				formatted[key]= _.groupBy(value,'metric')
			}
		);
		
		let baseMedian = _.groupBy(latestReleaseMean,'action')
		Object.entries(baseMedian).forEach(
			([key, value]) => {
				baseMedian[key]= _.groupBy(value,'metric')
			}
		);
		let shortTermMedian = _.groupBy(shortTermMean, 'action')
		Object.entries(shortTermMedian).forEach(
			([key, value]) => {
				shortTermMedian[key]= _.groupBy(value,'metric')
			}
		);
		let failures = 0;
		const out = [];
		Object.entries(formatted).forEach(([action,value])=>{
			Object.entries(value).forEach(([metric,values])=>{
				if(formatted[action][metric]?.[0] != null && baseMedian[action][metric]?.[0] != null && shortTermMedian[action]?.[metric]?.[0] != null) {
					const row = {action:metric}
					row.baseMedian = baseMedian[action]?.[metric]?.[0]?.median ?? undefined; // Add base median
					row.baseMin = baseMedian[action]?.[metric]?.[0]?.min ?? undefined;
					row.baseSD = baseMedian[action]?.[metric]?.[0]?.sd ?? undefined;
					row.baseSDmin = baseMedian[action]?.[metric]?.[0]?.sdmin ?? undefined;
					row.median = formatted[action]?.[metric]?.[0]?.median ?? undefined;// Add run median
					row.min = formatted[action]?.[metric]?.[0]?.min ??  undefined;
					row.last3BaseMedian = shortTermMedian[action]?.[metric]?.[0]?.median ?? undefined;
					row.last3BaseMin = shortTermMedian[action]?.[metric]?.[0]?.min ?? undefined;
					
					row.isLTMedianFailure = (row.median-row.baseMedian)> 1.2*row.baseSD;
					row.isLTMinFailure = (row.min-row.baseMin)> 1.2*row.baseSDmin;
					row.isSTMedianFailure = (row.median-row.last3BaseMedian)> 1.2*row.baseSD;
					row.isSTMinFailure = (row.min-row.last3BaseMin)> 1.2*row.baseSDmin;
					const currentFailures = ((row.isLTMedianFailure ? 1 : 0) + (row.isLTMinFailure ? 1 : 0) + (row.isSTMedianFailure ? 1 : 0) + (row.isSTMinFailure ?  1 : 0));
					failures += currentFailures;
					if(currentFailures > 0)
						out.push({
							action,
							metric,
							median: row.median,
							min: row.min,
							ltMedian: row.baseMedian,
							ltMin: row.baseMin,
							stMedian: row.last3BaseMedian,
							stMin: row.last3BaseMin,
							ltMedianRes: row.isLTMedianFailure,
							ltMinRes: row.isLTMinFailure,
							stMedianRes: row.isSTMedianFailure,
							stMinRes: row.isSTMinFailure,

						})
				}
				else {
					console.log(`NULL checkCombinedRunData ${action} ${metric}`);
				}
			})
		});
		const firstRunId = Utils.getRunIdAttemptOptions()?.[0]?.value;
		if(runId.selectedOptionValue == firstRunId) {
			await storeValue(`PR_${this.FAILURES_COUNT}`, failures);
		}
		await storeValue(`${this.FAILURES_COUNT}_OUT`, JSON.stringify(out));
		await storeValue(this.FAILURES_COUNT, failures);
		return failures;
	},
	
	storePRFailures : async () => {
		await storeValue(`PR_${this.FAILURES_COUNT}`, appsmith.store.FAILURES_COUNT)
	},
	
	getFromattedRunData: () => {
		const { runData, latestReleaseMean, shortTermMean } = this.getRunDataWithLTandST();
		let formatted= _.groupBy(runData,'action');
		Object.entries(formatted).forEach(
			([key, value]) => {
				formatted[key]= _.groupBy(value,'metric')
			}
		);
		
		let baseMedian = _.groupBy(latestReleaseMean,'action')
		Object.entries(baseMedian).forEach(
			([key, value]) => {
				baseMedian[key]= _.groupBy(value,'metric')
			}
		);
		let shortTermMedian = _.groupBy(shortTermMean, 'action')
		Object.entries(shortTermMedian).forEach(
			([key, value]) => {
				shortTermMedian[key]= _.groupBy(value,'metric')
			}
		);
		const out =[]
		Object.entries(formatted).sort((entry1, entry2) => entry1[0].localeCompare(entry2[0])).forEach(([action,value])=>{
			// Level #1 Actions
			out.push({action})
			Object.entries(value).sort((entry1, entry2) => (Utils.metricsOrder[entry1[0]] ?? 4) - (Utils.metricsOrder[entry2[0]]?? 4)).forEach(([metric,values])=>{
				// Level #2 Metrics
				if(formatted[action][metric]?.[0] != null && baseMedian[action][metric]?.[0] != null && shortTermMedian[action]?.[metric]?.[0] != null) {
					const row = {action:metric}
					let runValues=[]
					const runIds = [];
					values.forEach((value,i)=>{
						row[`Run ${i+1}`]=value.value;
						runIds.push(value.id);
						runValues.push(value.value)
					})
					row.runIds = runIds;
					const standardDeviation = Utils.getStandardDeviation(runValues);
					row.sd = parseFloat(standardDeviation.sd.toFixed(2));// Add SD
					row.cov = parseFloat(standardDeviation.cov.toFixed(2)); // Add SD Percentage
					row.baseMedian = baseMedian[action]?.[metric]?.[0]?.median ?? undefined; // Add base median
					row.baseMin = baseMedian[action]?.[metric]?.[0]?.min ?? undefined;
					row.baseSD = baseMedian[action]?.[metric]?.[0]?.sd ?? undefined;
					row.baseSDmin = baseMedian[action]?.[metric]?.[0]?.sdmin ?? undefined;
					row.median = Utils.median(runValues) // Add run median
					row.min = Utils.min(runValues);
					row.difference = row.baseMedian ? parseFloat(((row.baseMedian-row.median)/row.baseMedian*100).toFixed(2)) : undefined;
					row.differenceMin = row.baseMin ? parseFloat(((row.baseMin-row.min)/row.baseMin*100).toFixed(2)) : undefined;
					row.lastRelease = baseMedian[action]?.[metric]?.[0]?.lastrelease;
					// const last3Medians = [baseMedian[action][metric]?.[0]?.median1, baseMedian[action][metric]?.[0]?.median2, baseMedian[action][metric]?.[0]?.median3];
					// const last3Mins = [baseMedian[action]?.[metric]?.[0]?.min1, baseMedian[action][metric]?.[0]?.min2, baseMedian[action][metric]?.[0]?.min3];
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
		return out;
	},
}