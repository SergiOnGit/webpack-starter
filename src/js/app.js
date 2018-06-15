import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/dropdown';
import 'slick-carousel/slick/slick';

export default function main() {

	$(document).ready(function($) {
		
		$(".slider").slick({
		  	infinite: false,
		  	responsive: [{
		      	breakpoint: 1024,
		      	settings: {
			        slidesToShow: 3,
			        infinite: true
		      	}
		    }, {
		      	breakpoint: 600,
		      	settings: {
			        slidesToShow: 2,
			        dots: true
		      	}
		    }, {
		      	breakpoint: 300,
		      	settings: "unslick"
		    }]
		});

	});

}