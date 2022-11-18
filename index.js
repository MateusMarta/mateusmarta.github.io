var r_a = 1;
	var r_b = 1;
	var i_a = 1;
	var i_b = 1;
	var table =$('#table1').DataTable();
	function changeparagraph(fa, b=0) {
		$(document).ready(function() {
			table.destroy()
			table = $('#table1').DataTable( {
				"ajax": 'json/'+fa+'.json',
				"deferRender": true,
				"lengthMenu": [ 10, 25, 50, 100 ],
				scrollX: true,
				columnDefs: [
					{ orderable: false, targets: [3,4]},
					{ sorting: false, targets: [3,4]},
					{"searchable": false, "targets": [2,5] },
					{
						targets: 4,
						data: null,
						defaultContent: '<button class="j2">Selecionar</button>',
					},
					{
						targets: 3,
						data: null,
						defaultContent: '<button class="j1">Selecionar</button>',
					},
				],
			} );
		} );
		
		$('#table1 tbody').on('click', 'button', function () {
			if (this.className == "j1"){
			var data = table.row($(this).parents('tr')).data();
			r_a = data[2];
			i_a = data[5];
			document.getElementById('jogador_1').innerHTML = "<b>Jogador 1: </b>" + data[1];
			}
			else {
			var data = table.row($(this).parents('tr')).data();
			r_b = data[2];
			i_b = data[5];   
			document.getElementById('jogador_2').innerHTML = "<b>Jogador 2: </b>" + data[1];
			} 
		});
		
		fetch("json/ets/"+fa+".json").then(
			function(u){ return u.json();}
	      		).then(
			function(json){
		  	  var xValues = [];
			  var yValues = [];
			  for(let i = 0; i<15; i++){xValues.push(json["bins"][i]);}
			  for(let i = 0; i<15; i++){yValues.push(json["histo"][i]);}
			  document.getElementById("chart-container-3").innerHTML = '&nbsp;';
			  document.getElementById("chart-container-3").innerHTML = '<canvas id="myChart-3"></canvas>';
			  new Chart("myChart-3", {
		type: "bar",
					data: {
						labels: xValues,
						datasets: [{
						data: yValues
						}]
					},
					options: {
						scales: {
					y: {
					    beginAtZero: true,

					}
				    },
			plugins: {
							legend: false,
							title: {display: true, text: "Distribuição de ratings (número de jogadores)" }
						}
					}
					});
			}
	      	)
		
		document.getElementById('modalidade').innerHTML = "Estatísticas " + fa;
		document.getElementById('modalidade2').innerHTML = "<b>Modalidade: </b>" + fa;
	};
	
	changeparagraph("poolPT");

  	function factorial(num)
	{
		var rval=1;
		for (var i = 2; i <= num; i++)
			rval = rval * i;
		return rval;
	}
	function combs(a, b){
		return factorial(a)/(factorial(b)*factorial(a-b));
	}
	function prob_ganhar() {
	var xValues = [];
	var yValues = [];
	var barColors = [];
	var k = document.getElementById('k').value;
	var p = 1/(1+Math.exp((r_b-r_a)/Math.sqrt(i_a**2+i_b**2)));
	var p_perder = 0;
	for(var r=0; r<k; r++){
		var prob = (p)**k * (1-p)**r * combs(parseFloat(k)+parseFloat(r)-1, r);
		xValues.push(k+"-"+r);
		yValues.push(Math.round((prob)*1000)/10);
		barColors.push("green");
	}
	for(var r=k-1; r>-1; r--){
		var prob = (1-p)**k * p**r * combs(parseFloat(k)+parseFloat(r)-1, r);
		xValues.push(r+"-"+k);
		yValues.push(Math.round((prob)*1000)/10);
		barColors.push("red");
		p_perder = p_perder + prob;
	}
	  document.getElementById("chart-container").innerHTML = '&nbsp;';
	  document.getElementById("chart-container").innerHTML = '<canvas id="myChart"></canvas>';
	  new Chart("myChart", {
		type: "bar",
		data: {
			labels: xValues,
			datasets: [{
			backgroundColor: barColors,
			data: yValues
			}]
		},
		options: {
			scales: {
                y: {
                    beginAtZero: true,

                }
            },
			plugins: {
				legend: false,
				title: {display: true, text: "Probabilidade de cada resultado (%)" }
			}
		}
		});
	  document.getElementById("chart-container-2").innerHTML = '&nbsp;';
	  document.getElementById("chart-container-2").innerHTML = '<canvas id="myChart-2"></canvas>';
	  new Chart("myChart-2", {
		type: "bar",
		data: {
			labels: ["Jogador 1", "Jogador 2"],
			datasets: [{
			backgroundColor: ["green", "red"],
			data: [Math.round((1-p_perder)*1000)/10, Math.round((p_perder)*1000)/10]
			}]
		},
		options: {
			scales: {
                y: {
                    beginAtZero: true,

                }
            },
			plugins: {
				legend: false,
				title: {display: true, text: "Probabilidade total de ganhar (%)" }
			}
		}
		});
          }