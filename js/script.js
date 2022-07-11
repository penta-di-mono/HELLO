$(document).ready(function(){
	// 마우스휠 제어
	$('article').on('mousewheel', function(event, delta){
		if(delta>0){
		   var prev = $(this).prev().offset().top;
			$('html').stop().animate({'scrollTop':prev},1200);
	    }else if(delta<0){
			var next = $(this).next().offset().top;
			$('html').stop().animate({'scrollTop':next},1200);
	    }
	});

	$('p.colorBg').animate({'bottom':0},4000);

	// 스펙그래프
	myGraphy();

	function myGraphy(){
		var $charts = $('ul.spec_list>li');

		$charts.each(function(){
			var $chart = $(this),
				$circleLeft = $chart.find('.left .circle_inner').css({transform:'rotate(0)'}),
				$circleRight = $chart.find('.right .circle_inner').css({transform:'rotate(0)'});
				// console.log($chart);
				// console.log($circleLeft);

			var $percentNumber = $chart.find('.percent_data'),
				percentData = $percentNumber.text();
				
				$percentNumber.text(0);
			$({percent:0}).delay(500).animate(
				{percent:percentData},
				{
					duration : 2000,
					progress : function(){
						var now = this.percent;
						// console.log(now);
						$percentNumber.text(Math.floor(now));

						var deg = 360 * now / 100 ;
						// console.log(deg);
						var degLeft = Math.max(deg-180, 0);
						var degRight = Math.min(Math.max(deg, 0),180);
						// console.log(degLeft);

						$circleLeft.css({transform:'rotate(' + degLeft + 'deg)'});
						$circleRight.css({transform:'rotate(' + degRight + 'deg)'});
					}
				}
			);
		});
	}

	// 포폴리스트 목록
	$('ul.pf_list li div.pf_list_wrap').click(function(){
		event.preventDefault();
		$('ul.pf_list li').removeClass('on');
		$(this).parent().addClass('on');
	});

	// $('div.pf_background').html('<img src="img/pf_bg_aesop.jpg" alt="이솝">');

	$('ul.pf_list li div.pf_list_wrap').on('click', function(){
		var pfName = $(this).find('a').text();
		console.log(pfName);

		$('div.pf_background').html('<img src="img/pf_bg_' + pfName + '.jpg">');
		$('div.pf_background').children('img').animate({'top':0, 'left':160, opacity:"1"},1500);
	});

});
