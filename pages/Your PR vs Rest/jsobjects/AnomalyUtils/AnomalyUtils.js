export default {
	getMetaFromTag: (tag) => {
		return tag.split('/a&gt;(')?.[1]?.split(')')?.[0];
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
		if(appsmith.store[this.ANOMALY_META_KEY]) {
			await markAsAnomaly.run({meta: appsmith.store.anomaly_meta});
			await storeValue(this.ANOMALY_META_KEY, undefined);
			showAlert(this.isStoredMetaAnomaly() ? 'Successfully removed Anomaly!' : 'Successfully added Anomaly!', 'success');
			await getLastReleaseRuns.run()
		}
		else {
			showAlert(this.isStoredMetaAnomaly() ? 'Failed to remove Anomaly!' : 'Failed to add Anomaly', 'error');
		}
	},
	showAnomalyMarking: () => {
		if(AccessUtils.isAnomalyMarkingAllowed()) {
			AnomalyUtils.storeCurrentDataPoint(MetricsChart.selectedDataPoint.x);
			showModal('MarkAnomalyModal');
		}
	}
}