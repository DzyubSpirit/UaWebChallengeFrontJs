window.onload = function() {
	var MILLISEC_IN_DAY = 1000*60*60*24;
	var DAYS_IN_WEEK = 7;
	var WEEK_WIDTH_ENOUGH_TO_LINE_BREAK = 70;
	var leftDate = new Date(2016,2,15);
	var rightDate = new Date(2016, 3,15);
	var globalWidth = document.body.getBoundingClientRect().width;

	updateDateView();
	
	function updateDateView() {
		var day_diff = (rightDate-leftDate)/MILLISEC_IN_DAY;
		var toWeekBegin = leftDate.getDay()-1;
		var toWeekEnd = rightDate.getDay()?(DAYS_IN_WEEK+1)-rightDate.getDay():0;
		var weekCount = (day_diff+toWeekBegin+toWeekEnd)/DAYS_IN_WEEK;

		var works = document.querySelectorAll(".day-table > div");
		[].forEach.call(works, function(el) {
			var neededTds = weekCount+1-el.children.length;
			for (var i = 0; i < neededTds; i++) {
				el.appendChild(document.createElement('div'));
			}
		});

		var weekHeader = document.querySelector(".day-table > div > div");
		var weekHeaderWidth = weekHeader.getBoundingClientRect().width;
		var weekTds = document.querySelectorAll(".day-table > div > div:nth-of-type(n+2)");

		var widthForDays = (globalWidth - weekHeaderWidth)/day_diff; 
		var widthForWeeks = Math.floor((globalWidth - weekHeaderWidth)/weekCount);
		console.log(widthForWeeks);
		[].forEach.call(weekTds, function(el) {
			el.style.width = widthForWeeks+'px';
		});

		var weekLabelsRaw = document.querySelectorAll(".day-table-footer > div");
		[].forEach.call(weekLabelsRaw, function(el, i, arr) {
			var time;
			if (i == 0) {
				time = leftDate.getTime();
			} else if (i < weekCount) {
				time = leftDate.getTime()
					   +(i*DAYS_IN_WEEK-toWeekBegin)*MILLISEC_IN_DAY;
			} else {
				time = rightDate.getTime()+MILLISEC_IN_DAY;
			}

			el.innerHTML = makeShortDate(new Date(time), 
				widthForWeeks < WEEK_WIDTH_ENOUGH_TO_LINE_BREAK);
		});
	}

	function makeShortDate(date, lineBreak) {
		var MONTHES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
		return res = (1+date.getDate())
					+(lineBreak?"<br />":" ")
					+ MONTHES[date.getMonth()];
	}


}
