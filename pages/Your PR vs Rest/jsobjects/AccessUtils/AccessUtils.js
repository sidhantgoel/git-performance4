export default {
	ANOMALY_MARKING_ALLOWED: ['rhitottam@appsmith.com', 'satish@appsmith.com'],
	isAnomalyMarkingAllowed: () => {
		return (this.ANOMALY_MARKING_ALLOWED.includes(appsmith.user.email));
	}
}