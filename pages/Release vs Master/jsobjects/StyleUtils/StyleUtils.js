export default {
	getRowStyle: (currentRow) => !currentRow.runValues?'#e6e7e6':'',
	getDiffTextColor: (diff) => diff < 0 ? 'red' : 'green',
}