var r_a=1,r_a=-50,i_a=-50,r_b=-50,i_b=-50,table=$("#table1").DataTable();function changeparagraph(a){$(document).ready(function(){table.destroy(),table=$("#table1").DataTable({ajax:"json/"+a+".json",deferRender:!0,lengthMenu:[10,25,50,100],scrollX:!0,columnDefs:[{orderable:!1,targets:[3,4]},{sorting:!1,targets:[3,4]},{searchable:!1,targets:[2,5]},{targets:4,data:null,defaultContent:'<button class="j2">Selecionar</button>'},{targets:3,data:null,defaultContent:'<button class="j1">Selecionar</button>'},]})}),$("#table1 tbody").on("click","button",function(){if("j1"==this.className){var a=table.row($(this).parents("tr")).data();r_a=a[2],i_a=a[5],document.getElementById("jogador_1").innerHTML="<b>Jogador 1: </b>"+a[1]}else{var a=table.row($(this).parents("tr")).data();r_b=a[2],i_b=a[5],document.getElementById("jogador_2").innerHTML="<b>Jogador 2: </b>"+a[1]}}),fetch("json/ets/"+a+".json").then(function(a){return a.json()}).then(function(a){var e=[],t=[];for(let n=0;n<15;n++)e.push(a.bins[n]);for(let r=0;r<15;r++)t.push(a.histo[r]);document.getElementById("chart-container-3").innerHTML="&nbsp;",document.getElementById("chart-container-3").innerHTML='<canvas id="myChart-3"></canvas>',new Chart("myChart-3",{type:"bar",data:{labels:e,datasets:[{data:t}]},options:{scales:{y:{beginAtZero:!0}},plugins:{legend:!1,title:{display:!0,text:"Distribui\xe7\xe3o de ratings (n\xfamero de jogadores)"}}}})}),document.getElementById("modalidade").innerHTML="Estat\xedsticas "+a,document.getElementById("modalidade2").innerHTML="<b>Modalidade: </b>"+a}function factorial(a){for(var e=1,t=2;t<=a;t++)e*=t;return e}function combs(a,e){return factorial(a)/(factorial(e)*factorial(a-e))}function prob_ganhar(){var a=document.getElementById("k").value;if(-50==r_a||-50==i_a)document.getElementById("aviso").innerHTML="<i>Selecionar Jogador 1 na tabela</i>";else if(-50==r_b||-50==i_b)document.getElementById("aviso").innerHTML="<i>Selecionar Jogador 2 na tabela</i>";else if(""==a)document.getElementById("aviso").innerHTML="<i>Introduzir valor na caixa de texto acima</i>";else{document.getElementById("aviso").innerHTML="";for(var e=[],t=[],n=[],r=1/(1+Math.exp((r_b-r_a)/Math.sqrt(i_a**2+i_b**2))),o=0,i=0;i<a;i++){var l=r**a*(1-r)**i*combs(parseFloat(a)+parseFloat(i)-1,i);e.push(a+"-"+i),t.push(Math.round(1e3*l)/10),n.push("green")}for(var i=a-1;i>-1;i--){var l=(1-r)**a*r**i*combs(parseFloat(a)+parseFloat(i)-1,i);e.push(i+"-"+a),t.push(Math.round(1e3*l)/10),n.push("red"),o+=l}document.getElementById("chart-container").innerHTML="&nbsp;",document.getElementById("chart-container").innerHTML='<canvas id="myChart"></canvas>',new Chart("myChart",{type:"bar",data:{labels:e,datasets:[{backgroundColor:n,data:t}]},options:{scales:{y:{beginAtZero:!0}},plugins:{legend:!1,title:{display:!0,text:"Probabilidade de cada resultado (%)"}}}}),document.getElementById("chart-container-2").innerHTML="&nbsp;",document.getElementById("chart-container-2").innerHTML='<canvas id="myChart-2"></canvas>',new Chart("myChart-2",{type:"bar",data:{labels:["Jogador 1","Jogador 2"],datasets:[{backgroundColor:["green","red"],data:[Math.round((1-o)*1e3)/10,Math.round(1e3*o)/10]}]},options:{scales:{y:{beginAtZero:!0}},plugins:{legend:!1,title:{display:!0,text:"Probabilidade total de ganhar (%)"}}}})}}changeparagraph("poolPT");