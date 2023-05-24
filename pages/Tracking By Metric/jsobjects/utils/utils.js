export default {
	unitMapToMetric: [{
		metric: "scripting",
		unit: "MS"
	}, {
		metric: "printing",
		unit: "MS"
	}, {
		metric: "rendering",
		unit: "MS"
	}, {
		metric: "ideal",
		unit: "MS"
	}, {
		metric: "others",
		unit: "MS"
	}, {
		metric: "ForcedLayout",
		unit: "events"
	}, {
		metric: "ForcedStyle",
		unit: "events"
	}, {
		metric: "LongHandler",
		unit: "events"
	}, {
		metric: "LongTask",
		unit: "events"
	}],
	myVar2: {},
	getUnitMapToMetric: () => {
		var x = _.find(this.unitMapToMetric, {metric: Select1.selectedOptionValue})
		return x
	},
	onInit: async () => {
		//use async-await or promises
		await GetActions.run();
		await GetMetrics.run();
		if(Select2.selectedOptionValue == 'min'){
			await run_by_metric_min.run();
		}else{
			await run_by_metric.run();
		}
	},
	getChartData: () => {
		let config = {
				type: "msline",
				dataSource: {
					chart: {
						caption: "Metric actions across PRs",
						subCaption: "Showing selected actions across PRs for the selected metric",
						xAxisName: "Lable created with <i>MM/DD (PR ID) - Meta ID</i>",
						yAxisName: "Number of " + utils.getUnitMapToMetric().unit,
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

			let d =  Select2.selectedOptionValue == 'min' ? run_by_metric_min.data : run_by_metric.data

			// create the config object for the chart with the given data
			d.map((v) => {
					if(!_.find(config.dataSource.categories[0].category, {label: (v.is_anomaly ? "(a)" : "") + moment(v.created_at).format("MM/DD").toString() +" (" + (v.is_merge_commit ? "<b>" : "") + v.pull_request_id.toString()  + (v.is_merge_commit ? "</b>" : "") + ") - "+v.meta})) {
						config.dataSource.categories[0].category.push({"label": (v.is_anomaly ? "(a)" : "") + moment(v.created_at).format("MM/DD").toString() +" (" + (v.is_merge_commit ? "<b>" : "") + v.pull_request_id.toString() + (v.is_merge_commit ? "</b>" : "") + ") - "+ v.meta})
					}
					if(!_.find(config.dataSource.dataset, {seriesname: v.action})) {
						config.dataSource.dataset.push({seriesname: v.action, data: [{value: v.median, "anchorRadius": v.is_anomaly ? 4: 2,  "anchorBgColor": v.is_anomaly ? "#ff9900" : undefined}]})
					} else {
						_.find(config.dataSource.dataset, {seriesname: v.action}).data.push({value: v.median, "anchorRadius": v.is_anomaly ? 4: 2,  "anchorBgColor": v.is_anomaly ? "#ff9900" : undefined})
					}
			})

		if(config.dataSource.dataset.length > 0){
			config.dataSource.dataset.map((v) => {
				var x = _.meanBy(v.data, (p) => p.value)
				config.dataSource.trendlines[0].line.push({
					"startvalue": x,
					"color": Math.floor(Math.random()*16777215).toString(16),
					"valueOnRight": "1",
					"displayvalue": "Mean"
				})
			})
		}

			return config
	},
	getMetaFromTag: (tag) => {
		return tag.split('-')?.[1]?.trim();
	},
	isMergeCommit: (tag) => {
		return tag.includes('&gt;');
	},
	iscurrentMetaAnomaly: (tag) => {
		console.log(tag);
		return tag.includes('(a)')
	},
	ANOMALY_META_KEY: 'anomaly_meta',
	IS_ANOMALY_KEY: 'is_anomaly',
	storeCurrentDataPoint: async (tag) => {
		const meta = this.getMetaFromTag(tag);
		await storeValue(this.ANOMALY_META_KEY, meta);
		await storeValue(this.IS_ANOMALY_KEY, this.iscurrentMetaAnomaly(tag) ? '1' :  undefined);
	},
	isStoredMetaAnomaly: () => {
		return appsmith.store[this.IS_ANOMALY_KEY];
	},
	markAsAnomaly: async () => {
		if(appsmith.store[this.ANOMALY_META_KEY] && accessUtils.isAnomalyMarkingAllowed() && this.isMergeCommit(appsmith.store.metricDetail)) {
			await markAsAnomaly.run({meta: appsmith.store[this.ANOMALY_META_KEY]});
			await storeValue(this.ANOMALY_META_KEY, undefined);
			showAlert(this.isStoredMetaAnomaly() ? 'Successfully removed Anomaly!' : 'Successfully added Anomaly!', 'success');
			if(Select2.selectedOptionValue == 'min'){
				await run_by_metric_min.run();
			}else{
				await run_by_metric.run();
			}
		}
		else {
			showAlert(this.isStoredMetaAnomaly() ? 'Failed to remove Anomaly!' : 'Failed to add Anomaly', 'error');
		}
	}
}