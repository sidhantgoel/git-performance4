export default {
	getRunFolder: (runId, runAttempt) => `${runId}/${runAttempt}`,
	showDebugModal: async (action, basePrId, baseRunId) => {
		console.log(action, basePrId, baseRunId);
		await getMergeRunData.run({
			prId: basePrId,
			runId: baseRunId
		});
		// console.log(getMergeRunData.data[0]);
		// console.log(getPRRecentRunData.data[0]);
		showModal('DebugRunModal')
		
	},
	getRunData: (sqlData) => {
		const data = sqlData[0];
		const metricsData = data.metrics;
		const runData = _.groupBy(metricsData, 'action')[List1.selectedItem.action];
		const metricsRunData = _.groupBy(runData, 'metric');
		return Object.entries(metricsRunData).map((data) => {
			const metric = data[0];
			const runValues = data[1].reduce((acc, curr, index) => {
				return {
					...acc,
					[`Run ${index+1}`]: curr.value
				}
			}, {});
			return {
				metric,
				...runValues,
			};
		});
		
	},
	getDownloadChromeProfileUrl: async (runId, runAttempt, iteration) => {
		const action = List1.selectedItem.action;
		const data = await getS3Artifacts.run({path: `${this.getRunFolder(runId, runAttempt)}/Profiles/${action}_${iteration}.json.zip`});
		// const data = await getS3Artifacts.run({path: `3375150721/1/Profiles/CLOSE_MODAL_1.json.zip`});
		download(atob(data.fileData), `${action}_${runId}_${runAttempt}_${iteration}.json.zip`);
	},
	testData: [
  {
    "runid": 4374555403,
    "runattempt": 2,
    "id": 19743,
    "prid": 21292,
    "metrics": [
      {
        "metric": "scripting",
        "value": 634.61,
        "action": "SELECT_WIDGET_MENU_OPEN",
        "id": 6518934,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 574.75,
        "action": "SELECT_WIDGET_MENU_OPEN",
        "id": 6518935,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 641.67,
        "action": "SELECT_WIDGET_MENU_OPEN",
        "id": 6518936,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 648.97,
        "action": "SELECT_WIDGET_MENU_OPEN",
        "id": 6518937,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 693.55,
        "action": "SELECT_WIDGET_MENU_OPEN",
        "id": 6518938,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 886.62,
        "action": "SELECT_WIDGET_MENU_OPEN",
        "id": 6518944,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 1017.54,
        "action": "SELECT_WIDGET_MENU_OPEN",
        "id": 6518945,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 1052.24,
        "action": "SELECT_WIDGET_MENU_OPEN",
        "id": 6518946,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 1066.51,
        "action": "SELECT_WIDGET_MENU_OPEN",
        "id": 6518947,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 1080.28,
        "action": "SELECT_WIDGET_MENU_OPEN",
        "id": 6518948,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 10.38,
        "action": "SELECT_WIDGET_MENU_OPEN",
        "id": 6518959,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 16.98,
        "action": "SELECT_WIDGET_MENU_OPEN",
        "id": 6518960,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 15.16,
        "action": "SELECT_WIDGET_MENU_OPEN",
        "id": 6518961,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 15.32,
        "action": "SELECT_WIDGET_MENU_OPEN",
        "id": 6518962,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 15.37,
        "action": "SELECT_WIDGET_MENU_OPEN",
        "id": 6518973,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 13.37,
        "action": "SELECT_WIDGET_MENU_OPEN",
        "id": 6518974,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 15.56,
        "action": "SELECT_WIDGET_MENU_OPEN",
        "id": 6518975,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 21.44,
        "action": "SELECT_WIDGET_MENU_OPEN",
        "id": 6518976,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 146.52,
        "action": "SELECT_WIDGET_SELECT_OPTION",
        "id": 6519007,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 149.54,
        "action": "SELECT_WIDGET_SELECT_OPTION",
        "id": 6519008,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 175.94,
        "action": "SELECT_WIDGET_SELECT_OPTION",
        "id": 6519009,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 162.9,
        "action": "SELECT_WIDGET_SELECT_OPTION",
        "id": 6519010,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 167.55,
        "action": "SELECT_WIDGET_SELECT_OPTION",
        "id": 6519011,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 736,
        "action": "SELECT_WIDGET_SELECT_OPTION",
        "id": 6519017,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 785.24,
        "action": "SELECT_WIDGET_SELECT_OPTION",
        "id": 6519018,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 755.52,
        "action": "SELECT_WIDGET_SELECT_OPTION",
        "id": 6519019,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 725.52,
        "action": "SELECT_WIDGET_SELECT_OPTION",
        "id": 6519020,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 801.5,
        "action": "SELECT_WIDGET_SELECT_OPTION",
        "id": 6519021,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 264.11,
        "action": "SELECT_WIDGET_SELECT_OPTION",
        "id": 6519032,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 240.24,
        "action": "SELECT_WIDGET_SELECT_OPTION",
        "id": 6519033,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 221.14,
        "action": "SELECT_WIDGET_SELECT_OPTION",
        "id": 6519034,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 225.76,
        "action": "SELECT_WIDGET_SELECT_OPTION",
        "id": 6519035,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 223.56,
        "action": "SELECT_WIDGET_SELECT_OPTION",
        "id": 6519036,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 282.04,
        "action": "SELECT_WIDGET_SELECT_OPTION",
        "id": 6519047,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 441.94,
        "action": "SELECT_WIDGET_SELECT_OPTION",
        "id": 6519048,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 271.18,
        "action": "SELECT_WIDGET_SELECT_OPTION",
        "id": 6519049,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 283.02,
        "action": "SELECT_WIDGET_SELECT_OPTION",
        "id": 6519050,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 400.75,
        "action": "SELECT_WIDGET_SELECT_OPTION",
        "id": 6519051,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 397.48,
        "action": "MISC_OPEN_SELECT_WIDGET",
        "id": 6519082,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 444.55,
        "action": "MISC_OPEN_SELECT_WIDGET",
        "id": 6519083,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 468.01,
        "action": "MISC_OPEN_SELECT_WIDGET",
        "id": 6519084,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 457.35,
        "action": "MISC_OPEN_SELECT_WIDGET",
        "id": 6519085,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 508.22,
        "action": "MISC_OPEN_SELECT_WIDGET",
        "id": 6519086,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 1214.78,
        "action": "MISC_OPEN_SELECT_WIDGET",
        "id": 6519092,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 1176.13,
        "action": "MISC_OPEN_SELECT_WIDGET",
        "id": 6519093,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 1255.32,
        "action": "MISC_OPEN_SELECT_WIDGET",
        "id": 6519094,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 1224.81,
        "action": "MISC_OPEN_SELECT_WIDGET",
        "id": 6519095,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 1261.56,
        "action": "MISC_OPEN_SELECT_WIDGET",
        "id": 6519096,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 605.9,
        "action": "MISC_SELECT_OPTION",
        "id": 6519137,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 684.65,
        "action": "MISC_SELECT_OPTION",
        "id": 6519138,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 623.24,
        "action": "MISC_SELECT_OPTION",
        "id": 6519139,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 590.21,
        "action": "MISC_SELECT_OPTION",
        "id": 6519140,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 380.4,
        "action": "MISC_SELECT_OPTION",
        "id": 6519141,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 354.78,
        "action": "MISC_SELECT_OPTION",
        "id": 6519147,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 321.68,
        "action": "MISC_SELECT_OPTION",
        "id": 6519148,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 299.57,
        "action": "MISC_SELECT_OPTION",
        "id": 6519149,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 350.82,
        "action": "MISC_SELECT_OPTION",
        "id": 6519150,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 557.87,
        "action": "MISC_SELECT_OPTION",
        "id": 6519151,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 382.77,
        "action": "MISC_SELECT_OPTION",
        "id": 6519162,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 368.7,
        "action": "MISC_SELECT_OPTION",
        "id": 6519163,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 366.7,
        "action": "MISC_SELECT_OPTION",
        "id": 6519164,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 373.57,
        "action": "MISC_SELECT_OPTION",
        "id": 6519165,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 373.81,
        "action": "MISC_SELECT_OPTION",
        "id": 6519166,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 253.78,
        "action": "MISC_SELECT_OPTION",
        "id": 6519177,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 309.74,
        "action": "MISC_SELECT_OPTION",
        "id": 6519178,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 305.36,
        "action": "MISC_SELECT_OPTION",
        "id": 6519179,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 278.89,
        "action": "MISC_SELECT_OPTION",
        "id": 6519180,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 342.52,
        "action": "MISC_SELECT_OPTION",
        "id": 6519181,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 897.3,
        "action": "MISC_ECHO",
        "id": 6519212,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 984.74,
        "action": "MISC_ECHO",
        "id": 6519213,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 1046.37,
        "action": "MISC_ECHO",
        "id": 6519214,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 1079.09,
        "action": "MISC_ECHO",
        "id": 6519215,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 973.14,
        "action": "MISC_ECHO",
        "id": 6519216,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 54.92,
        "action": "MISC_ECHO",
        "id": 6519222,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 49.59,
        "action": "MISC_ECHO",
        "id": 6519223,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 59.41,
        "action": "MISC_ECHO",
        "id": 6519224,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 60.05,
        "action": "MISC_ECHO",
        "id": 6519225,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 53.78,
        "action": "MISC_ECHO",
        "id": 6519226,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 301.57,
        "action": "MISC_ECHO",
        "id": 6519237,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 315.71,
        "action": "MISC_ECHO",
        "id": 6519238,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 298.33,
        "action": "MISC_ECHO",
        "id": 6519239,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 364.77,
        "action": "MISC_ECHO",
        "id": 6519240,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 330.5,
        "action": "MISC_ECHO",
        "id": 6519241,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 139.45,
        "action": "MISC_ECHO",
        "id": 6519252,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 101.77,
        "action": "MISC_ECHO",
        "id": 6519253,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 148.78,
        "action": "MISC_ECHO",
        "id": 6519254,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 124.78,
        "action": "MISC_ECHO",
        "id": 6519255,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 155.06,
        "action": "MISC_ECHO",
        "id": 6519256,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 3534.15,
        "action": "MISC_SELECT_TABLE",
        "id": 6519287,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 3893.72,
        "action": "MISC_SELECT_TABLE",
        "id": 6519288,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 3732.66,
        "action": "MISC_SELECT_TABLE",
        "id": 6519289,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 3818.25,
        "action": "MISC_SELECT_TABLE",
        "id": 6519290,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 3862.03,
        "action": "MISC_SELECT_TABLE",
        "id": 6519291,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 1430.1,
        "action": "MISC_SELECT_TABLE",
        "id": 6519297,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 1434.37,
        "action": "MISC_SELECT_TABLE",
        "id": 6519298,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 1460.65,
        "action": "MISC_SELECT_TABLE",
        "id": 6519299,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 1437.06,
        "action": "MISC_SELECT_TABLE",
        "id": 6519300,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 1382.25,
        "action": "MISC_SELECT_TABLE",
        "id": 6519301,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 939.53,
        "action": "MISC_SELECT_TABLE",
        "id": 6519312,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 789.42,
        "action": "MISC_SELECT_TABLE",
        "id": 6519313,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 882.73,
        "action": "MISC_SELECT_TABLE",
        "id": 6519314,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 897.4,
        "action": "MISC_SELECT_TABLE",
        "id": 6519315,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 961.4,
        "action": "MISC_SELECT_TABLE",
        "id": 6519316,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 586.51,
        "action": "MISC_SELECT_TABLE",
        "id": 6519327,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 959.21,
        "action": "MISC_SELECT_TABLE",
        "id": 6519328,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 481.01,
        "action": "MISC_SELECT_TABLE",
        "id": 6519329,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 559.69,
        "action": "MISC_SELECT_TABLE",
        "id": 6519330,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 598.92,
        "action": "MISC_SELECT_TABLE",
        "id": 6519331,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 1721.42,
        "action": "MISC_CLICK_TABLE_ROW",
        "id": 6519362,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 1700.48,
        "action": "MISC_CLICK_TABLE_ROW",
        "id": 6519363,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 1705.23,
        "action": "MISC_CLICK_TABLE_ROW",
        "id": 6519364,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 1654.28,
        "action": "MISC_CLICK_TABLE_ROW",
        "id": 6519365,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 1688.13,
        "action": "MISC_CLICK_TABLE_ROW",
        "id": 6519366,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 23.21,
        "action": "MISC_CLICK_TABLE_ROW",
        "id": 6519372,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 22.63,
        "action": "MISC_CLICK_TABLE_ROW",
        "id": 6519373,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 24.3,
        "action": "MISC_CLICK_TABLE_ROW",
        "id": 6519374,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 28.91,
        "action": "MISC_CLICK_TABLE_ROW",
        "id": 6519375,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 27.46,
        "action": "MISC_CLICK_TABLE_ROW",
        "id": 6519376,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 476.69,
        "action": "MISC_CLICK_TABLE_ROW",
        "id": 6519387,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 500.44,
        "action": "MISC_CLICK_TABLE_ROW",
        "id": 6519388,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 568.5,
        "action": "MISC_CLICK_TABLE_ROW",
        "id": 6519389,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 540.06,
        "action": "MISC_CLICK_TABLE_ROW",
        "id": 6519390,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 600.18,
        "action": "MISC_CLICK_TABLE_ROW",
        "id": 6519391,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 312.94,
        "action": "MISC_CLICK_TABLE_ROW",
        "id": 6519402,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 285.11,
        "action": "MISC_CLICK_TABLE_ROW",
        "id": 6519403,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 329.49,
        "action": "MISC_CLICK_TABLE_ROW",
        "id": 6519404,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 425.8,
        "action": "MISC_CLICK_TABLE_ROW",
        "id": 6519405,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 549.78,
        "action": "MISC_CLICK_TABLE_ROW",
        "id": 6519406,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 620.38,
        "action": "MISC_OPEN_SIMPLE_MODAL",
        "id": 6519437,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 803.64,
        "action": "MISC_OPEN_SIMPLE_MODAL",
        "id": 6519438,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 1121.62,
        "action": "MISC_OPEN_SIMPLE_MODAL",
        "id": 6519439,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 890.9,
        "action": "MISC_OPEN_SIMPLE_MODAL",
        "id": 6519440,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 970.32,
        "action": "MISC_OPEN_SIMPLE_MODAL",
        "id": 6519441,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 1229.04,
        "action": "MISC_OPEN_SIMPLE_MODAL",
        "id": 6519447,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 1009.18,
        "action": "MISC_OPEN_SIMPLE_MODAL",
        "id": 6519448,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 1128.91,
        "action": "MISC_OPEN_SIMPLE_MODAL",
        "id": 6519449,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 1103.7,
        "action": "MISC_OPEN_SIMPLE_MODAL",
        "id": 6519450,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 981.94,
        "action": "MISC_OPEN_SIMPLE_MODAL",
        "id": 6519451,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 339.35,
        "action": "MISC_OPEN_SIMPLE_MODAL",
        "id": 6519462,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 324.67,
        "action": "MISC_OPEN_SIMPLE_MODAL",
        "id": 6519463,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 397.17,
        "action": "MISC_OPEN_SIMPLE_MODAL",
        "id": 6519464,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 395.41,
        "action": "MISC_OPEN_SIMPLE_MODAL",
        "id": 6519465,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 337.37,
        "action": "MISC_OPEN_SIMPLE_MODAL",
        "id": 6519466,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 80.01,
        "action": "MISC_OPEN_SIMPLE_MODAL",
        "id": 6519477,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 57.92,
        "action": "MISC_OPEN_SIMPLE_MODAL",
        "id": 6519478,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 66.35,
        "action": "MISC_OPEN_SIMPLE_MODAL",
        "id": 6519479,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 52.29,
        "action": "MISC_OPEN_SIMPLE_MODAL",
        "id": 6519480,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 83.03,
        "action": "MISC_OPEN_SIMPLE_MODAL",
        "id": 6519481,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 496.49,
        "action": "MISC_CLOSE_SIMPLE_MODAL",
        "id": 6519512,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 520.61,
        "action": "MISC_CLOSE_SIMPLE_MODAL",
        "id": 6519513,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 627.1,
        "action": "MISC_CLOSE_SIMPLE_MODAL",
        "id": 6519514,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 660.92,
        "action": "MISC_CLOSE_SIMPLE_MODAL",
        "id": 6519515,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 591.38,
        "action": "MISC_CLOSE_SIMPLE_MODAL",
        "id": 6519516,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 948.36,
        "action": "MISC_CLOSE_SIMPLE_MODAL",
        "id": 6519522,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 968.47,
        "action": "MISC_CLOSE_SIMPLE_MODAL",
        "id": 6519523,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 1027.97,
        "action": "MISC_CLOSE_SIMPLE_MODAL",
        "id": 6519524,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 1056.28,
        "action": "MISC_CLOSE_SIMPLE_MODAL",
        "id": 6519525,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 1010.43,
        "action": "MISC_CLOSE_SIMPLE_MODAL",
        "id": 6519526,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 130.86,
        "action": "MISC_CLOSE_SIMPLE_MODAL",
        "id": 6519537,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 152.91,
        "action": "MISC_CLOSE_SIMPLE_MODAL",
        "id": 6519538,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 152.73,
        "action": "MISC_CLOSE_SIMPLE_MODAL",
        "id": 6519539,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 178.08,
        "action": "MISC_CLOSE_SIMPLE_MODAL",
        "id": 6519540,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 151.29,
        "action": "MISC_CLOSE_SIMPLE_MODAL",
        "id": 6519541,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 2421.72,
        "action": "MISC_OPEN_COMPLEX_MODAL",
        "id": 6519577,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 1760.41,
        "action": "MISC_OPEN_COMPLEX_MODAL",
        "id": 6519578,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 1866.26,
        "action": "MISC_OPEN_COMPLEX_MODAL",
        "id": 6519579,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 2190.98,
        "action": "MISC_OPEN_COMPLEX_MODAL",
        "id": 6519580,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 2645.24,
        "action": "MISC_OPEN_COMPLEX_MODAL",
        "id": 6519581,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 2022.15,
        "action": "MISC_OPEN_COMPLEX_MODAL",
        "id": 6519587,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 2209.01,
        "action": "MISC_OPEN_COMPLEX_MODAL",
        "id": 6519588,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 2313.65,
        "action": "MISC_OPEN_COMPLEX_MODAL",
        "id": 6519589,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 2044.12,
        "action": "MISC_OPEN_COMPLEX_MODAL",
        "id": 6519590,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 1565.66,
        "action": "MISC_OPEN_COMPLEX_MODAL",
        "id": 6519591,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 489.8,
        "action": "MISC_OPEN_COMPLEX_MODAL",
        "id": 6519602,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 647.65,
        "action": "MISC_OPEN_COMPLEX_MODAL",
        "id": 6519603,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 495.5,
        "action": "MISC_OPEN_COMPLEX_MODAL",
        "id": 6519604,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 475.48,
        "action": "MISC_OPEN_COMPLEX_MODAL",
        "id": 6519605,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 466.31,
        "action": "MISC_OPEN_COMPLEX_MODAL",
        "id": 6519606,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 77.16,
        "action": "MISC_OPEN_COMPLEX_MODAL",
        "id": 6519617,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 184.52,
        "action": "MISC_OPEN_COMPLEX_MODAL",
        "id": 6519618,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 187.51,
        "action": "MISC_OPEN_COMPLEX_MODAL",
        "id": 6519619,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 199.51,
        "action": "MISC_OPEN_COMPLEX_MODAL",
        "id": 6519620,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 182.98,
        "action": "MISC_OPEN_COMPLEX_MODAL",
        "id": 6519621,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 354.55,
        "action": "MISC_CLOSE_COMPLEX_MODAL",
        "id": 6519652,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 358.78,
        "action": "MISC_CLOSE_COMPLEX_MODAL",
        "id": 6519653,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 479.71,
        "action": "MISC_CLOSE_COMPLEX_MODAL",
        "id": 6519654,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 469.39,
        "action": "MISC_CLOSE_COMPLEX_MODAL",
        "id": 6519655,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 472.58,
        "action": "MISC_CLOSE_COMPLEX_MODAL",
        "id": 6519656,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 280.62,
        "action": "MISC_CLOSE_COMPLEX_MODAL",
        "id": 6519662,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 287.4,
        "action": "MISC_CLOSE_COMPLEX_MODAL",
        "id": 6519663,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 334.82,
        "action": "MISC_CLOSE_COMPLEX_MODAL",
        "id": 6519664,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 341.83,
        "action": "MISC_CLOSE_COMPLEX_MODAL",
        "id": 6519665,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 334.67,
        "action": "MISC_CLOSE_COMPLEX_MODAL",
        "id": 6519666,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 523.29,
        "action": "SELECT_CATEGORY",
        "id": 6519707,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 565.31,
        "action": "SELECT_CATEGORY",
        "id": 6519708,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 607.88,
        "action": "SELECT_CATEGORY",
        "id": 6519709,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 589.18,
        "action": "SELECT_CATEGORY",
        "id": 6519710,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 645.15,
        "action": "SELECT_CATEGORY",
        "id": 6519711,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 31.15,
        "action": "SELECT_CATEGORY",
        "id": 6519717,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 25.1,
        "action": "SELECT_CATEGORY",
        "id": 6519718,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 24.18,
        "action": "SELECT_CATEGORY",
        "id": 6519719,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 26.95,
        "action": "SELECT_CATEGORY",
        "id": 6519720,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 28.04,
        "action": "SELECT_CATEGORY",
        "id": 6519721,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 245.3,
        "action": "SELECT_CATEGORY",
        "id": 6519732,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 248.44,
        "action": "SELECT_CATEGORY",
        "id": 6519733,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 258.98,
        "action": "SELECT_CATEGORY",
        "id": 6519734,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 261.4,
        "action": "SELECT_CATEGORY",
        "id": 6519735,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 285.49,
        "action": "SELECT_CATEGORY",
        "id": 6519736,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 371.48,
        "action": "SELECT_CATEGORY",
        "id": 6519747,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 250.64,
        "action": "SELECT_CATEGORY",
        "id": 6519748,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 387.67,
        "action": "SELECT_CATEGORY",
        "id": 6519749,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 346.56,
        "action": "SELECT_CATEGORY",
        "id": 6519750,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 294.76,
        "action": "SELECT_CATEGORY",
        "id": 6519751,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 1389.1,
        "action": "BIND_TABLE_DATA",
        "id": 6519782,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 1446.82,
        "action": "BIND_TABLE_DATA",
        "id": 6519783,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 1437.46,
        "action": "BIND_TABLE_DATA",
        "id": 6519784,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 1408.19,
        "action": "BIND_TABLE_DATA",
        "id": 6519785,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 1425.38,
        "action": "BIND_TABLE_DATA",
        "id": 6519786,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 1294.79,
        "action": "BIND_TABLE_DATA",
        "id": 6519792,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 1330.04,
        "action": "BIND_TABLE_DATA",
        "id": 6519793,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 1415.04,
        "action": "BIND_TABLE_DATA",
        "id": 6519794,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 1345.67,
        "action": "BIND_TABLE_DATA",
        "id": 6519795,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 1551.75,
        "action": "BIND_TABLE_DATA",
        "id": 6519796,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 247.5,
        "action": "BIND_TABLE_DATA",
        "id": 6519807,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 251.23,
        "action": "BIND_TABLE_DATA",
        "id": 6519808,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 303.54,
        "action": "BIND_TABLE_DATA",
        "id": 6519809,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 328.09,
        "action": "BIND_TABLE_DATA",
        "id": 6519810,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 299.9,
        "action": "BIND_TABLE_DATA",
        "id": 6519811,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 124.56,
        "action": "BIND_TABLE_DATA",
        "id": 6519822,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 165.64,
        "action": "BIND_TABLE_DATA",
        "id": 6519823,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 38.68,
        "action": "BIND_TABLE_DATA",
        "id": 6519824,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 48.25,
        "action": "BIND_TABLE_DATA",
        "id": 6519825,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 2152.55,
        "action": "CLICK_ON_TABLE_ROW",
        "id": 6519851,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 2229.75,
        "action": "CLICK_ON_TABLE_ROW",
        "id": 6519852,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 1906.43,
        "action": "CLICK_ON_TABLE_ROW",
        "id": 6519853,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 2595.4,
        "action": "CLICK_ON_TABLE_ROW",
        "id": 6519854,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 2207.63,
        "action": "CLICK_ON_TABLE_ROW",
        "id": 6519855,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 640.5,
        "action": "CLICK_ON_TABLE_ROW",
        "id": 6519861,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 676.19,
        "action": "CLICK_ON_TABLE_ROW",
        "id": 6519862,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 655.08,
        "action": "CLICK_ON_TABLE_ROW",
        "id": 6519863,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 720.93,
        "action": "CLICK_ON_TABLE_ROW",
        "id": 6519864,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 709.37,
        "action": "CLICK_ON_TABLE_ROW",
        "id": 6519865,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 563.38,
        "action": "CLICK_ON_TABLE_ROW",
        "id": 6519876,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 687.35,
        "action": "CLICK_ON_TABLE_ROW",
        "id": 6519877,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 513.58,
        "action": "CLICK_ON_TABLE_ROW",
        "id": 6519878,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 724.39,
        "action": "CLICK_ON_TABLE_ROW",
        "id": 6519879,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 646.57,
        "action": "CLICK_ON_TABLE_ROW",
        "id": 6519880,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 396.73,
        "action": "CLICK_ON_TABLE_ROW",
        "id": 6519891,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 339.18,
        "action": "CLICK_ON_TABLE_ROW",
        "id": 6519892,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 286.48,
        "action": "CLICK_ON_TABLE_ROW",
        "id": 6519893,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 265.98,
        "action": "CLICK_ON_TABLE_ROW",
        "id": 6519894,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 294.09,
        "action": "CLICK_ON_TABLE_ROW",
        "id": 6519895,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 3975.52,
        "action": "UPDATE_POST_TITLE",
        "id": 6519926,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 3676.57,
        "action": "UPDATE_POST_TITLE",
        "id": 6519927,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 4213.02,
        "action": "UPDATE_POST_TITLE",
        "id": 6519928,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 4673.13,
        "action": "UPDATE_POST_TITLE",
        "id": 6519929,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 4192.33,
        "action": "UPDATE_POST_TITLE",
        "id": 6519930,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 1266.72,
        "action": "UPDATE_POST_TITLE",
        "id": 6519936,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 1309.35,
        "action": "UPDATE_POST_TITLE",
        "id": 6519937,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 1324.86,
        "action": "UPDATE_POST_TITLE",
        "id": 6519938,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 1363.34,
        "action": "UPDATE_POST_TITLE",
        "id": 6519939,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 1279.69,
        "action": "UPDATE_POST_TITLE",
        "id": 6519940,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 891.03,
        "action": "UPDATE_POST_TITLE",
        "id": 6519951,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 807.33,
        "action": "UPDATE_POST_TITLE",
        "id": 6519952,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 947.07,
        "action": "UPDATE_POST_TITLE",
        "id": 6519953,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 961.04,
        "action": "UPDATE_POST_TITLE",
        "id": 6519954,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 1040.76,
        "action": "UPDATE_POST_TITLE",
        "id": 6519955,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 321.72,
        "action": "UPDATE_POST_TITLE",
        "id": 6519966,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 367.38,
        "action": "UPDATE_POST_TITLE",
        "id": 6519967,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 282.08,
        "action": "UPDATE_POST_TITLE",
        "id": 6519968,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 316.8,
        "action": "UPDATE_POST_TITLE",
        "id": 6519969,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 203.09,
        "action": "UPDATE_POST_TITLE",
        "id": 6519970,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 581.48,
        "action": "OPEN_MODAL",
        "id": 6520001,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 585.25,
        "action": "OPEN_MODAL",
        "id": 6520002,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 627.21,
        "action": "OPEN_MODAL",
        "id": 6520003,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 677.88,
        "action": "OPEN_MODAL",
        "id": 6520004,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 762.64,
        "action": "OPEN_MODAL",
        "id": 6520005,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 602.64,
        "action": "OPEN_MODAL",
        "id": 6520011,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 580.48,
        "action": "OPEN_MODAL",
        "id": 6520012,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 596.83,
        "action": "OPEN_MODAL",
        "id": 6520013,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 639.32,
        "action": "OPEN_MODAL",
        "id": 6520014,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 633.47,
        "action": "OPEN_MODAL",
        "id": 6520015,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 236.54,
        "action": "OPEN_MODAL",
        "id": 6520026,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 213.61,
        "action": "OPEN_MODAL",
        "id": 6520027,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 207.63,
        "action": "OPEN_MODAL",
        "id": 6520028,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 178.08,
        "action": "OPEN_MODAL",
        "id": 6520029,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 293.44,
        "action": "OPEN_MODAL",
        "id": 6520030,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 80.92,
        "action": "OPEN_MODAL",
        "id": 6520041,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 261.23,
        "action": "OPEN_MODAL",
        "id": 6520042,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 285.28,
        "action": "OPEN_MODAL",
        "id": 6520043,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 71.65,
        "action": "OPEN_MODAL",
        "id": 6520044,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "lintWorker_scripting",
        "value": 50.19,
        "action": "OPEN_MODAL",
        "id": 6520045,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 556.99,
        "action": "CLOSE_MODAL",
        "id": 6520076,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 547.02,
        "action": "CLOSE_MODAL",
        "id": 6520077,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 665.4,
        "action": "CLOSE_MODAL",
        "id": 6520078,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 670.53,
        "action": "CLOSE_MODAL",
        "id": 6520079,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "scripting",
        "value": 621.41,
        "action": "CLOSE_MODAL",
        "id": 6520080,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 701.84,
        "action": "CLOSE_MODAL",
        "id": 6520086,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 664.39,
        "action": "CLOSE_MODAL",
        "id": 6520087,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 728.57,
        "action": "CLOSE_MODAL",
        "id": 6520088,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 658,
        "action": "CLOSE_MODAL",
        "id": 6520089,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "rendering",
        "value": 652.79,
        "action": "CLOSE_MODAL",
        "id": 6520090,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 201.86,
        "action": "CLOSE_MODAL",
        "id": 6520101,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 152.54,
        "action": "CLOSE_MODAL",
        "id": 6520102,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 186.83,
        "action": "CLOSE_MODAL",
        "id": 6520103,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 151.47,
        "action": "CLOSE_MODAL",
        "id": 6520104,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      },
      {
        "metric": "evalWorker_scripting",
        "value": 194.93,
        "action": "CLOSE_MODAL",
        "id": 6520105,
        "createdAt": "2023-03-09T15:06:23.466665+00:00"
      }
    ]
  }
]
}