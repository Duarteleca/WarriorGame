// ultima alteração:28/12


// criando o  canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;


// imagem Background 
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "background.png";

// imagem player
var playerReady = false;
var playerImage = new Image();
playerImage.onload = function () {
	playerReady = true;
};
playerImage.src = "player.png";

// imagem enemy 
var enemyReady = false;
var enemyImage = new Image();
enemyImage.onload = function () {
	enemyReady = true;
};
enemyImage.src = "enemy.png";

// imagem do bonus(pistola)
var foodReady = false;
var foodImage = new Image();
foodImage.onload = function () {
	foodReady = true;
};
foodImage.src = "gun.png";

// 2º background (só aparece quando tiver 100 pontos)
var gameReady = false;
var gameImage = new Image();
gameImage.onload = function () {
	gameReady = true;
};
gameImage.src = "background_.png";

var game15Ready = false;
var game15Image = new Image();
game15Image.onload = function () {
	game15Ready = true;
};
game15Image.src = "background_2.png";




// objetos do jogo
var player = {
	speed: 128 // movimentos de pixels por segundo
};
var enemy = {
};
var food = {};
var eatFood = 0;
var lives = 0;
var name_player;
var seg = 0;

// Lidar com controlos do teclado
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
	e.preventDefault();
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// carrega os objetos todos no inicio do jogo(está função só é executada no inicio do jogo), são carregados aleatoriamente
var begingame = function () {
	player.x = canvas.width / 2;
	player.y = canvas.height / 2;

	enemy.x = (Math.random() * (canvas.width - 80));
	enemy.y = (Math.random() * (canvas.height - 120));

	food.x = (Math.random() * (canvas.width - 40));
	food.y = (Math.random() * (canvas.height - 40));
	console.log(canvas.width);
	console.log(canvas.height);
};

// sempre que "come" o bonus do jogo(pistola), ela muda de posição.
var eatfooder = function () {

	food.x = (Math.random() * (canvas.width - 40));
	food.y = (Math.random() * (canvas.height - 40));
	// o inimigo muda de posição, para dificultar o jogador
	enemy.x = (Math.random() * (canvas.width - 80));
	enemy.y = (Math.random() * (canvas.height - 120));
};


// sempre que "come" o inimigo , ele muda de posição.
var enemylife = function () {

	enemy.x = (Math.random() * (canvas.width - 80));
	enemy.y = (Math.random() * (canvas.height - 120));


};

// Faça a actualização do jogo(tudo o que acontece no jogo está dentro desta função)

var update = function (modifier) {
	// verifica qual é a tecla do teclado está a ser presionada  (keycode) e executa sua ação
	if (38 in keysDown) { // para cima
		player.y -= player.speed * modifier;
	}
	if (40 in keysDown) { // para baixo
		player.y += player.speed * modifier;
	}
	if (37 in keysDown) { // esquerda
		player.x -= player.speed * modifier;
	}
	if (39 in keysDown) { // direita
		player.x += player.speed * modifier;
	}

	// irá verificar se o jogador chegou as limites do jogo
	fundo();

	// sempre que o jogador tocar no inimigo executa seguinte codigo
	// aumenta o speed do jogador e retira um vida no jogo (aqui aumenta para trabalhar melhor a informação)
	if (
		player.x <= (enemy.x + 35)
		&& enemy.x <= (player.x + 35)
		&& player.y <= (enemy.y + 50)
		&& enemy.y <= (player.y + 50)
	) {
		var livedevil = new Audio('inimigo.mp3');
		livedevil.play();

		lives = lives + 1;
		player.speed += 128;

		

		console.log(player.speed);
		// verifica quantas vida tem e mostra no display do jogo as vidas, quando perder executa a função gameover(fim do codigo)

		if (lives == 1) {
			document.getElementById("image").style.visibility = "hidden";


		} else if (lives == 2) {
			document.getElementById("image").style.visibility = "hidden";
			document.getElementById("image1").style.visibility = "hidden";


		} else {
			
			document.getElementById("image").style.visibility = "hidden";
			document.getElementById("image1").style.visibility = "hidden";
			document.getElementById("image2").style.visibility = "hidden";
			// apresenta no formulario a imagem do inimigo, mostrado que perdeu
			document.getElementById("losegame").style.display = "block";

			// var devil = new Audio('perde.mp3');
			// devil.play();
			
			gameover();


		}

		// executa o random do inimigo (inimigo muda de posição)
		enemylife();



	}

	// limites para jogador no canvas
	function fundo() {
		var fundo = canvas.height - 60;
		if (player.y > fundo) {
			player.y = fundo;
			player.speed += 128;

		}
		var direita = canvas.height;
		if (player.x > direita) {
			player.x = direita;
			player.speed += 128;

		}
		var esquerda = 0;
		if (player.x < esquerda) {
			player.x = esquerda;
			player.speed += 128;

		}
		var topo = 0;
		if (player.y < topo) {
			player.y = topo;
			player.speed += 128;

		}





	}







	// quando come o "bonus" a pontuação aumenta quando atinge o limite termina(executa o gameover), aumenta o speed do jogador
	if (
		player.x <= (food.x + 35)
		&& food.x <= (player.x + 35)
		&& player.y <= (food.y + 35)
		&& food.y <= (player.y + 35)
	) {

		var gun = new Audio('gun.mp3');
		gun.play();
		eatFood = eatFood + 10;
		eatfooder();

		// speed 256
		player.speed += 256;
		console.log("bonus: " + player.speed);


		if (eatFood == 200) {
			// apresenta a imagem do jogador, mostrado que ganhou(não perdeu as vidas)
			document.getElementById("wingame").style.display = "block";

			// alert("Terminou, conseguiu atingir o limite de bonus " +  "\n Vidas: "+ (3 - lives)+ "\n Pontuação: " + eatFood + "\n no tempo:" + sec )
			gameover();

			// alert("terminou o jogo")
		}


	}







};

// faça a renderização do jogo, para não criar o rasto dos objetos no jogo (está a constante execução)
var render = function () {

	if (eatFood < 100) {
		if (bgReady) {
			ctx.drawImage(bgImage, 0, 0);
		}
	} else if(eatFood < 150) {
		if (gameReady) {
			ctx.drawImage(gameImage, 0, 0);
		} 
	}else {
			if (game15Ready) {
				ctx.drawImage(game15Image, 0, 0);
			}
	}



	if (playerReady) {
		ctx.drawImage(playerImage, player.x, player.y);
	}


	if (enemyReady) {
		ctx.drawImage(enemyImage, enemy.x, enemy.y);
	}

	if (foodReady) {
		ctx.drawImage(foodImage, food.x, food.y);
	}


	document.getElementById("score").innerHTML = eatFood;


};



// loop do jogo (executa 1000 vezes por segundo)
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// usamos para criar a "animação" no jogo, ele chama constatemente o main (loop) 
	requestAnimationFrame(main);
};

//  compatabilidade com os varios browsers para o requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;


var then = Date.now();




// função que executa o jogo (play do jogo no html)
function myFunction() {
	// chama o carregamento das personagens e atualização do jogo
	begingame();
	main();
// audios do jogo
	var audio = new Audio('war.mp3');
		audio.loop = true;
			audio.play();

	var win = new Audio('win.mp3');		


	// contador de segundos
	var seg = 0;
	var min = 0;


	var time = setInterval(function () {
		document.getElementById("ex").innerHTML = min + " min " + " : " + seg + " sec";
		seg++;
		// quando atingir os 60 segundo termina o jogo e apresenta varias informações e para o contador.
		if (seg % 60 == 0) {
			
			console.log("parar relogio")

			// apresenta a imagem do jogador, mostrado que ganhou (não perdeu as vidas)
			document.getElementById("wingame").style.display = "block";

			alert("Terminou o tempo " + "\n  Com  " + (3 - lives) + " Vidas" + "\n Pontuação: " + eatFood)
			clearInterval(time);
			audio.pause();
			
			win.play();

			gameover();

		}

		// quando atingir 3 vidas perdidas, para o contador, para musica do fundo e apresenta varias informações sobre o jogo
		if (lives == 3) {
			clearInterval(time);
			audio.pause();
			var devil = new Audio('perde.mp3');
			devil.play();
			alert("Terminou, perdeu as vidas " + "\n Pontuação: " + eatFood + "\n No tempo: " + (seg - 1) + " segundos");
		}

		// quando atingir 200 pontos, para o contador, para musica do fundo e apresenta varias informações sobre o jogo
		if (eatFood == 200) {
			clearInterval(time);
			audio.pause();
			win.play();
			alert("Terminou, conseguiu atingir o limite de bonus " + "\n Vidas: " + (3 - lives) + "\n Pontuação: " + eatFood + "\n no tempo: " + (seg - 1) + " segundos");
		}
		
	}, 1000);

	


}

// faz reset a pagina
function myreset() {
	location.reload();
}

// para todo jogo, incluive o contador
function myPause() {
	alert("O jogo está em pausa, para continuar clique em 'OK'")
	
}

// função de quando termina o jogo, pede informação ao jogador e apresenta informação que é necessaria, e "desaparece" como os objetos do canvas 
function gameover() {


	var name_player = prompt("seu nome?");
	
	// document.getElementById("jogador").innerHTML = name_player;

	document.getElementById("submit").style.visibility = "visible";
	document.getElementById("pontua_final").innerHTML = eatFood;
	document.getElementById("nome_player").innerHTML = name_player;
	// player.y == canvas.width;
	// player.x == canvas.height;



	playerReady = false;

	enemyReady = false;

	foodReady = false;

	// if (gameReady) {
	// 	ctx.drawImage(gameImage, 0, 0);
	// }

	// stopPropagation();


}




// função submit depois de ter terminado o jogo
function mysubmit() {


	// console.log(player);
	alert("Obrigada por jogar ")
}






