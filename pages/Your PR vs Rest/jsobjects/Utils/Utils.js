export default {
	init: async (config) => {
		if(!config?.ignoreRepos) await getAllReposRM.run();
		if(!config?.ignoreRepos) await getMetricsRM.run();
		if(!config?.ignoreRepos) await getActions.run();
		await getLastReleaseRuns.run();
		await fetchLast100PRruns.run();
		if(appsmith.URL.queryParams.pr)
		{
			await getPRRecentRunData.run();
		}
	},
	changeRepo: async () => {
		await navigateTo('Your PR vs Rest', {pr: undefined, runId: undefined, repo: RepoSelect.selectedOptionValue}, "SAME_WINDOW");
	},
	defaultMetrics: [
		"scripting",
		"rendering",
		"evalWorker_scripting",
		"lintWorker_scripting"
	],
	getMetricsToShow:()=>{
		return selectMetrics.selectedOptionValues.map(x => "'" + x + "'").toString();
	},
	getActionsToShow:() => {
		return actionSelect.selectedOptionValues.map(x => "'" + x + "'").toString();
	},
	getLineChartList: () => {
		const data = getLastReleaseRuns.data;
		const selectedActions = actionSelect.selectedOptionValues;
		
		const listData = Object
		.values(_.groupBy(data, 'action'));
		return listData
		.filter(value => selectedActions.includes(value[0].action))
		.map(value => ({
			action: value[0].action,
			config: this.getCustomLineChart(value[0].action, value)
		}));
	},
	getCustomLineChart: (action, actionData) => {
  	const config = {
			type: "msline",
			dataSource: {
				chart: {
					caption: action ? (String(action) + " : Metrics trend across releases") : "Please Select an Action to see metrics across releases",
					subCaption: "Showing selected metrics for the action:"+ action +" across releases",
					xAxisName: "<i>Pull Request ID (Run Meta)</i>",
					yAxisName: "MS",
					theme: "fusion",
					plotToolText: "",
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
		
		// const data = getLastReleaseRuns.data.filter(data => Number(data.prid) > 0).reverse();
		
		// create the config object for the chart with the given data
		actionData.filter(data => Number(data.prid) > 0).reverse().forEach((v) => {
			if(!_.find(config.dataSource.categories[0].category, {label: `${v.is_anomaly? '(a)': ''}<a target="_blank" href="https://github.com/appsmithorg/appsmith/pull/${v.prid}">${v.prid}</a>(${v.meta})`,
																														toolText: `(${moment(v.created_at).format('YYYY/MM/DD HH:mm')}) | ${v.prid}`})) {
				config.dataSource.categories[0].category.push({label: `${v.is_anomaly? '(a)': ''}<a target="_blank" href="https://github.com/appsmithorg/appsmith/pull/${v.prid}">${v.prid}</a>(${v.meta})`,
																											toolText: `(${moment(v.created_at).format('YYYY/MM/DD HH:mm')}) | ${v.prid}`})
			}
			//if(!_.find(config.dataSource.categories[0].category, {label: `${v.prid}(${v.meta})`})) {
			//	config.dataSource.categories[0].category.push({label: `${v.prid}(${v.meta})`})
			//}
			const metrics = v.metrics.reduce((acc, val)=> ({
				...acc,
				[val.metric]: {
					value: val.value,
					min: val.min,
					sd: val.sd,
				}
			}), {});
			for(const metric of selectMetrics.selectedOptionValues) {
				if(!_.find(config.dataSource.dataset, {seriesname: metric})) {
					config.dataSource.dataset.push({seriesname: metric, data: [{value: metrics[metric]?.[MeanMinSelect.selectedOptionValue] ?? 0, anchorRadius: v.is_anomaly? 2: this.getSelectedPR() == v.prid ? 10 : v.base_branch=='master' ? 7 : 3 , anchorBgColor: v.is_anomaly ? "#ff9900" : this.getSelectedPR() == v.prid ? "#ff0000" : undefined, anchorSides: this.getSelectedPR() == v.prid || v.base_branch=='master' ? 3: undefined}]})
				}
				else {
					_.find(config.dataSource.dataset, {seriesname: metric}).data.push({value: metrics[metric]?.[MeanMinSelect.selectedOptionValue] ?? 0, anchorRadius: v.is_anomaly? 2: this.getSelectedPR() == v.prid ? 10 : v.base_branch=='master' ? 7 : 3, anchorBgColor: v.is_anomaly ? "#ff9900" : this.getSelectedPR() == v.prid ? "#ff0000" : undefined, anchorSides: this.getSelectedPR() == v.prid || v.base_branch=='master'? 3: undefined})
				}
			}
			
		});
		return config
	},
	getPrUrlFromTag: (tag) => {
		return tag.split('href=&#034;')?.[1]?.split('&#034;')?.[0];
	},
	getPrIdFromTag: (tag) => {
		const prUrl = tag.split('href=&#034;')?.[1]?.split('&#034;')?.[0];
		return prUrl.split('pull/')[1];
	},
	getRunIdFromTag: (tag) => {
		return tag.split('(')[1].split(')')[0];
	},
	addPRToUrl: async () => {
		const pr = prSelect.selectedOptionValue;
		await navigateTo('Your PR vs Rest', pr ? {...appsmith.URL.queryParams, pr} : {...appsmith.URL.queryParams}, 'SAME_WINDOW');
		return;
	},
	getSelectedPR: () => {
		const pr = (!prSelect.selectedOptionValue ? undefined : prSelect.selectedOptionValue) ?? appsmith.URL.queryParams.pr;
		if(pr) return pr;
		return false;
	}
	
}