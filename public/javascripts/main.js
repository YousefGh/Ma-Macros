$( document ).ready(function() {

	PROTEIN = 200;
	CARBS = 70;
	FAT = 80;

	$('.cont_protein').attr('data-pct', -PROTEIN);	
	$('.cont_carbs').attr('data-pct', -CARBS);	
	$('.cont_fat').attr('data-pct', -FAT);	

	$('#goal_cals').text('Goal: ' +( (CARBS * 4) + (FAT * 9) + (PROTEIN * 4)));

	// Changing the maximum intake
	$('#protein_max, #carbs_max, #fat_max').on('keyup change', function(){
		// If changed
		PROTEIN = $('#protein_max').val();
		CARBS = $('#carbs_max').val();
		FAT = $('#fat_max').val();

		// Default
		if (PROTEIN == 0 || isNaN(PROTEIN)) {
			PROTEIN = 200;
			$('#protein_max').attr('placeholder', PROTEIN);
		} 
		if (FAT == 0 || isNaN(FAT)) {
			FAT = 80;
			$('#fat_max').attr('placeholder', FAT);
		}
		if (CARBS == 0 || isNaN(CARBS)) {
			CARBS = 70;
			$('#carbs_max').attr('placeholder', CARBS);
		}
		$('#goal_cals').text('Goal: ' +( (CARBS * 4) + (FAT * 9) + (PROTEIN * 4)));

		$('.cont_protein').attr('data-pct', -PROTEIN);	
		$('.cont_carbs').attr('data-pct', -CARBS);	
		$('.cont_fat').attr('data-pct', -FAT);	

	});

	// carbs
	$('#carbs_in').on('keyup change', function(){
		var val = parseInt($(this).val());
		var $circle = $('#svg_carbs #bar_carbs');
		$circle.css('stroke','#00FFFF');
		edit(val, $circle, '.cont_carbs',CARBS );
	});

	$('#protein_in').on('keyup change', function(){
		var val = parseInt($(this).val());
		var $circle = $('#svg_protein #bar_protein');
		$circle.css('stroke','#00FFFF');
		edit(val, $circle, '.cont_protein', PROTEIN);
	});

	$('#fat_in').on('keyup change', function(){
		var val = parseInt($(this).val());
		var $circle = $('#svg_fat #bar_fat');
		$circle.css('stroke','#00FFFF');
		edit(val, $circle, '.cont_fat', FAT);
	});
});

function edit(val, $circle, cont, macros) {
	macros = parseInt(macros);	
	if (isNaN(val)) {
		val = 0;
		realValue = 0;
		$circle.css('stroke','#666');
	} else {
		var r = $circle.attr('r');
		var c = Math.PI*(r*2);
		var cx = $circle.attr('cx');

		realValue =  val;
		if (val < 0) {
			val = 0;
			realValue = 0;
		} else if (val > macros + 25) {
			val = macros;
			$circle.css('stroke','red');
		} else if(val > macros + 10) {
			val = macros;
			$circle.css('stroke','orange');
		} else if(val >= macros){
			val = macros;
			$circle.css('stroke','#7CFC00');
		}

		percent = (val / macros) * 100
		var pct = ((cx-percent)/cx)*c;
		$circle.css({ strokeDashoffset: pct});
		updateCal();
	}
	$(cont).attr('data-pct', realValue - macros);	
}

function updateCal() {
	current_carbs = $('#carbs_in').val();
	current_protein = $('#protein_in').val();
	current_fat = $('#fat_in').val();
	$('#cals').text('Calories: ' + ( (current_carbs * 4) + (current_fat * 9) + (current_protein * 4)) );
}