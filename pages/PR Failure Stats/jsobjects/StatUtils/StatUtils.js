export default {
	getStatsData: () => {
		const data = getFailureStats.data;
		const statsData = data.reduce((acc, record) => {
			const lastEntry = record.values.reduce((max, entry) => {
				if(moment(entry.created_at).isAfter(max.created_at)) {
					return entry;
				} else {
					return max;
				}
			}, record.values[0]);
			acc.lt_1 = (acc.lt_1 ?? 0) + (lastEntry.lt <= 1 ? 1 : 0);
			acc.lt_2 = (acc.lt_2 ?? 0) + (lastEntry.lt <= 2 ? 1 : 0);
			acc.st_1 = (acc.st_1 ?? 0) + (lastEntry.st <= 1 ? 1 : 0);
			acc.st_2 = (acc.st_2 ?? 0) + (lastEntry.st <= 2 ? 1 : 0);
			acc.tot_2 = (acc.tot_2 ?? 0) + (lastEntry.tot <= 2 ? 1 : 0);
			acc.tot_0 = (acc.tot_0 ?? 0) + (lastEntry.tot === 0 ? 1 : 0);
			acc.total = data.length;
			return acc;
		}, {});
		return statsData;
	},
	getStatsEntry: (data, entry) => {
		return `${data[entry]}/${data.total}`;
	}
}