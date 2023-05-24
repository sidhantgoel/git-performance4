export default {
	getCustomLineChart: () => {
  	const config = {
			type: "msline",
			dataSource: {
				chart: {
					caption: Utils.getCurrentAction() ? (String(Utils.getCurrentAction()) + " : Metrics trend across releases") : "Please Select an Action to see metrics across releases",
					subCaption: "Showing selected metrics for the action:"+ Utils.getCurrentAction() +" across releases",
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
		const groupedData = _.groupBy(data, 'prid');
		// create the config object for the chart with the given data
		data.forEach((v) => {
			if(!_.find(config.dataSource.categories[0].category, {label: `<a target="_blank" href="https://github.com/appsmithorg/appsmith/pull/${v.prid}">${v.prid}</a>(${v.meta})`})) {
				config.dataSource.categories[0].category.push({label: `<a target="_blank" href="https://github.com/appsmithorg/appsmith/pull/${v.prid}">${v.prid}</a>(${v.meta})`})
				const metrics = groupedData[v.prid].reduce((acc, val)=> ({
					...acc,
					[val.metric]: {
						value: val.value,
						min: val.min,
						sd: val.sd,
					}
				}), {});
				for(const metric of selectMetrics.selectedOptionValues) {
					if(!_.find(config.dataSource.dataset, {seriesname: metric})) {
						config.dataSource.dataset.push({seriesname: metric, data: [{value: metrics[metric]?.[MedianMinSelect.selectedOptionValue ?? 'value'] ?? 0, anchorRadius: v.is_anomaly? 2: 4, anchorBgColor: v.is_anomaly ? "#ff9900" : undefined,
																																			 anchorBorderThickness: v.base_branch=='master' ? "2" : undefined, anchorSides: v.base_branch=='master' ? "3" : "undefined"}]})
					}
					else {
						_.find(config.dataSource.dataset, {seriesname: metric}).data.push({value: metrics[metric]?.[MedianMinSelect.selectedOptionValue ?? 'value'] ?? 0, anchorRadius: v.is_anomaly? 2: 4, anchorBgColor: v.is_anomaly ? "#ff9900" : undefined,
																																			 anchorBorderThickness: v.base_branch=='master' ? "2" : undefined, anchorSides: v.base_branch=='master' ? "3" : "undefined"})
					}
				}
			}
			//if(!_.find(config.dataSource.categories[0].category, {label: `${v.prid}(${v.meta})`})) {
			//	config.dataSource.categories[0].category.push({label: `${v.prid}(${v.meta})`})
			//}
			/*
			if(!_.find(config.dataSource.dataset, {seriesname: v.metric})) {
				config.dataSource.dataset.push({seriesname: v.metric, data: [{value: v[MedianMinSelect.selectedOptionValue ?? 'value'] ?? 0,
            "anchorBgColor": v.is_anomaly ? "#ff9900" : undefined}]})
			}
			else {
				_.find(config.dataSource.dataset, {seriesname: v.metric}).data.push({value: v[MedianMinSelect.selectedOptionValue ?? 'value'] ?? 0,
            "anchorBgColor": v.is_anomaly ? "#ff9900" : undefined})
			}
			*/
			
		})
		return config
	},
	getMetaFromTag: (tag) => {
		return tag.split('/a&gt;(')?.[1]?.split(')')?.[0];
	},
	ANOMALY_META_KEY: 'anomaly_meta',
	storeCurrentDataPoint: async (tag) => {
		const meta = this.getMetaFromTag(tag);
		console.log({meta, tag});
		await storeValue(this.ANOMALY_META_KEY, meta);
	},
	markAsAnomaly: async () => {
		if(appsmith.store[this.ANOMALY_META_KEY]) {
			await markAsAnomaly.run({meta: appsmith.store.anomaly_meta});
			await storeValue(this.ANOMALY_META_KEY, undefined);
			showAlert('Successfully added Anomaly!', 'success');
			await getLastReleaseRuns.run()
		}
		else {
			showAlert('Failed to add Anomaly', 'error');
		}
	},
}