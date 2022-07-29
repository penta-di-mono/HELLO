$(document).ready(function(){
	//페이지 리사이즈시
	$(window).on('resize',function(){
		var winH = $(window).height();
		$('article').height(winH);
		console.log(winH)
	});

	// 마우스휠 제어
	$('article').on('mousewheel', function(event, delta){
		var winH = $(window).height();

		if(delta>0){
		   var prev = $(this).prev().offset().top;
			$('html').stop().animate({'scrollTop':prev}, 1200);
	    }else if(delta<0){
			var next = $(this).next().offset().top;
			$('html').stop().animate({'scrollTop':next}, 1200);
	    }
	});

	$('p.colorBg').animate({'bottom':0}, 2000);

	//스크롤 높이에 따라 이벤트 제어
	$(window).on('scroll', function(){
		var winH = $(this).scrollTop();
		var articleH = $('article').height();
		var sec2 = articleH * 2;
		var sec3 = articleH * 3;

		if(winH == sec2){
			myGraphy();
		}else if(winH == sec3){
			$('div.pf_background').html('<img src="img/pf_bg.jpg">').children('img').animate({'top':0, 'right':0, opacity:"1"},1800);
		}
	})

	// 스펙그래프 함수
	function myGraphy(){
		var $charts = $('ul.spec_list>li');

		$charts.each(function(){
			var $chart = $(this),
				$circleLeft = $chart.find('.left .circle_inner').css({transform:'rotate(0)'}),
				$circleRight = $chart.find('.right .circle_inner').css({transform:'rotate(0)'});

			var $percentNumber = $chart.find('.percent_data'),
				percentData = $percentNumber.text();
				
				$percentNumber.text(0);
			$({percent:0}).animate(
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
	$('ul.pf_list li div.pf_list_wrap').click(function(event){
		event.preventDefault();
		$('ul.pf_list li').removeClass('on');
		$(this).parent().addClass('on');
	});

	//포폴 누를때마다 배경바뀌기
	$('ul.pf_list li div.pf_list_wrap').on('click', function(){
		var pfName = $(this).find('a').text();
		console.log(pfName);

		$('div.pf_background').html('<img src="img/pf_bg_' + pfName + '.jpg">');
		$('div.pf_background').children('img').stop().animate({'top':0, 'right':0, opacity:"1"},1500);
	});

});
