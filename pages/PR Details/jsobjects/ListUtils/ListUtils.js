export default {
	getListData: (item) => {
		let res = "<table>";
		for(const metricData of item) {
			res += `<tr><td colspan=4><b>${metricData.metric}</b><td></tr>`;
			res += `<tr><th>Aggregate</th><th>Value</th><th>LT Value</th><th>ST Value</th></tr>`
			res += `<tr><td>Median</td> <td>${metricData.median}</td>
			<td>${metricData.ltMedian} ${!metricData.ltMedianRes ? '✅' : '❌'}</td>
			<td>${metricData.stMedian} ${!metricData.stMedianRes ? '✅' : '❌'}</td></tr>`;
			res += `<tr><td>Min</td> <td>${metricData.min}</td>
			<td>${metricData.ltMin} ${!metricData.ltMinRes ? '✅' : '❌'}</td>
			<td>${metricData.stMin} ${!metricData.stMinRes ? '✅' : '❌'}</td></tr>`;
			res += '<br>';
		}
		res += "</table>";
		return res;
		
	}
}