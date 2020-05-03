var movimento_fundo, movimento_cometa, movimento_letra; //Timers dos movimentos automáticos
var palavras_base = ["água", "maçã", "postura", "respirar", "limpeza", "dormir", "frio", "rouquidão", "gritar", "sussurrar", "chorar", "rir"]; //array que guarda todas as palavras
var palavra_array = ["água", "maçã", "postura", "respirar", "limpeza", "dormir", "frio", "rouquidão", "gritar", "sussurrar", "chorar", "rir"];//array com palavras
var palavra, letra;
var letras = new Array(), imagens = new Array();//arrays de letras para cada palavra
var vidas = 3;
var pontos;
var recorde;
var rdm_letra, rdm_palavra, rdm_imagem; //variaveis com os valores dados pelos Math.random()
var palavra_verificacao;//palavra completa para verificação
var par1 = 0, par2 = 0, par3 = 0, par4 = 0, par5 = 0, par6 = 0; //verificação se par foi recolhido
var pausa = false;
var velocidade;
var vel_cont;
var arrayTeclas = [];
var intteclas = setInterval(processaTecla, 1000 / 60);
var gameover = false;
var todasconq = false;
var nome;
var aniET = 0;
var anicometa = 1, Cometatimer;
var ETtimer;
var et;
var imagemconq = 1;
var dirseta;
var musica = true;
var mute = true;
var backgroundsom = new Audio();
backgroundsom.src = "assets/som/background/background.mp3";
backgroundsom.volume = 0.5;
backgroundsom.loop = true;
var perder_vidas = new Audio();
perder_vidas.src = "assets/som/perder_pontos/1.mp3";
perder_vidas.volume = 0.5;
var ganhar_pontos = new Audio();
ganhar_pontos.src = "assets/som/ganhar_pontos/5.wav";
ganhar_pontos.volume = 0.5;


window.onclick = function () {
    if (musica) {

        backgroundsom.play();
        musica = false;
    }
};
window.onload = function () {
    carrega_elementos();
    posiciona_elementos();
    atualizarconq();
    document.getElementById("intro_seta").onclick = function () {
        document.getElementById("intro").style.display = "none";
        document.getElementById("menu").style.display = "block";
    };
    document.getElementById("btn_menu_missao").onmouseover = function () {
        hoverplaneta("missao", "off");

    };
    document.getElementById("btn_menu_jogar").onmouseover = function () {
        hoverplaneta("jogar", "off");
    };
    document.getElementById("btn_menu_oficina").onmouseover = function () {
        hoverplaneta("oficina", "off");
    };
    document.getElementById("btn_menu_creditos").onmouseover = function () {
        hoverplaneta("creditos", "off");
    };
    document.getElementById("btn_menu_missao").onmouseout = function () {
        hoverplaneta("missao", "on");
    };
    document.getElementById("btn_menu_jogar").onmouseout = function () {
        hoverplaneta("jogar", "on");
    };
    document.getElementById("btn_menu_oficina").onmouseout = function () {
        hoverplaneta("oficina", "on");
    };
    document.getElementById("btn_menu_creditos").onmouseout = function () {
        hoverplaneta("creditos", "on");
    };
    document.getElementById("inst_cometa").onmouseover = function () {
        hoverinst(1, "off");
    };
    document.getElementById("inst_letra").onmouseover = function () {
        hoverinst(2, "off");
    };
    document.getElementById("inst_cometa").onmouseout = function () {

        hoverinst(1, "on");
    };
    document.getElementById("inst_letra").onmouseout = function () {
        hoverinst(2, "on");
    };
    document.getElementById("som_inst").onclick = function () {
        sommute();
    };
    document.getElementById("et1").onmouseover = function () {
        hoverET("1", "off");
    };
    document.getElementById("et2").onmouseover = function () {
        hoverET("2", "off");
    };
    document.getElementById("et1").onmouseout = function () {
        hoverET("1", "on");
    };
    document.getElementById("et2").onmouseout = function () {
        hoverET("2", "on");
    };
    document.getElementById("et1").onclick = function () {
        document.getElementById("jogador").src = "assets/imgs/img/naves/naveET1.png";
        document.getElementById("escolherET").style.display = "none";
        document.getElementById("inserirnome").style.display = "block";
        document.getElementById("erro_nome").style.visibility = "hidden";
        et = 1;
    };
    document.getElementById("et2").onclick = function () {
        document.getElementById("jogador").src = "assets/imgs/img/naves/naveET2.png";
        document.getElementById("escolherET").style.display = "none";
        document.getElementById("inserirnome").style.display = "block";
        document.getElementById("erro_nome").style.visibility = "hidden";
        et = 2

    };

    document.getElementById("btn_menu_jogar").onclick = function () {
        document.getElementById("menu").style.display = "none";
        document.getElementById("jogo").style.display = "none";
        document.getElementById("escolherET").style.display = "block";

    };
    document.getElementById("btn_menu_creditos").onclick = function () {
        document.getElementById("menu").style.display = "none";
        document.getElementById("jogo").style.display = "none";
        document.getElementById("escolherET").style.display = "none";
        document.getElementById("creditos").style.display = "block";

    };
    document.getElementById("btn_menu_oficina").onclick = function () {
        document.getElementById("menu").style.display = "none";
        document.getElementById("jogo").style.display = "none";
        document.getElementById("escolherET").style.display = "none";
        document.getElementById("creditos").style.display = "none";
        document.getElementById("oficina").style.display = "block";
    };
    document.getElementById("btn_menu_missao").onclick = function () {
        document.getElementById("menu").style.display = "none";
        document.getElementById("jogo").style.display = "none";
        document.getElementById("escolherET").style.display = "none";
        document.getElementById("creditos").style.display = "none";
        document.getElementById("oficina").style.display = "none";
        document.getElementById("instrucoes").style.display = "block";
    };

    document.getElementById("setainserir").onclick = function () {
        if (document.getElementById("nome").value == "" || document.getElementById("nome").value == " ") {
            document.getElementById("erro_nome").style.visibility = "visible";
        } else {
            nome = document.getElementById("nome").value;
            document.getElementById("inserirnome").style.display = "none";
            document.getElementById("erro_nome").style.visibility = "hidden";
            document.getElementById("jogo").style.display = "block";

            setTimeout(comecar_jogo, 50);
        }

    };

    document.getElementById("close_creditos").onclick = function () {
        document.getElementById("creditos").style.display = "none";
        document.getElementById("menu").style.display = "block";
    };
    document.getElementById("close_inst").onclick = function () {
        document.getElementById("instrucoes").style.display = "none";
        document.getElementById("menu").style.display = "block";
    };

    document.getElementById("setaesq").onclick = function () {
        imagemconq--;
        dirseta = false;
        atualizarconq();

    };
    document.getElementById("setadir").onclick = function () {
        imagemconq++;
        dirseta = true;
        atualizarconq();
    };
    document.getElementById("parte").onclick = function () {
        layer_conq();
    };
    document.getElementById("som_conq").onclick = function () {
        som_conq();
    };
    document.getElementById("back").onclick = function () {
        document.getElementById("menu").style.display = "block";
        document.getElementById("oficina").style.display = "none";

    }
};

function carrega_elementos() {
    document.getElementById("intro").style.display = "block";
    document.getElementById("jogo").style.display = "none";
    document.getElementById("menu").style.display = "none";
    document.getElementById("instrucoes").style.display = "none";
    document.getElementById("escolherET").style.display = "none";
    document.getElementById("inserirnome").style.display = "none";
    document.getElementById("perdeu").style.display = "none";
    document.getElementById("creditos").style.display = "none";
    document.getElementById("oficina").style.display = "none";
    document.getElementById("pause").style.display = "none";

}

function posiciona_elementos() {
    //Posicionamento dos elementos principais
    document.getElementById("fundo-proximo1").style.left = 0;
    document.getElementById("fundo-proximo2").style.left = window.innerWidth + "px";
    document.getElementById("fundo-medio1").style.left = 0;
    document.getElementById("fundo-medio2").style.left = window.innerWidth + "px";
    document.getElementById("jogador").style.top = window.innerHeight * 0.5 + "px";
    document.getElementById("jogador").style.left = window.innerWidth * 0.05 + "px";
    document.getElementById("cometa").style.top = parseInt(Math.random() * (window.innerHeight - parseInt(document.getElementById("cometa").height) - 100)) + 100 + "px";
    document.getElementById("cometa").style.left = window.innerWidth + "px";
    document.getElementById("cometa2").style.top = parseInt(Math.random() * (window.innerHeight - parseInt(document.getElementById("cometa2").height)) - 100) + 100 + "px";
    document.getElementById("cometa2").style.left = window.innerWidth + "px";
    document.getElementById("letra").style.top = parseInt(Math.random() * (window.innerHeight - parseInt(document.getElementById("letra").height) - 100)) + 100 + "px";
    document.getElementById("letra").style.left = window.innerWidth + "px";
    document.getElementById("vidas").style.left = window.innerWidth * 0.85 + "px";
    document.getElementById("vidas").style.top = window.innerHeight * 0.02 + "px";
    document.getElementById("conquista").style.left = window.innerWidth + "px";
    document.getElementById("conquista").style.top = window.innerHeight * 0.15 + "px";
}

function comecar_jogo() {
    ETtimer = setInterval("animacaoET(et)", 1000 / 20);
    Cometatimer = setInterval(animacao_cometa, 1000 / 10);
    velocidade = window.innerWidth * 0.005;
    if (palavra_array != palavras_base) {
        palavra_array = palavras_base.slice();
    }
    vidas = 3;
    vel_cont = 0;
    pontos = 0;
    set_recorde();
    document.getElementById("recorde").innerHTML = "recorde: " + localStorage.getItem("recorde");
    document.getElementById("pontos").innerHTML = pontos;
    movimento_fundo = setInterval(mexer_fundo, 1000 / 60);
    movimento_cometa = setInterval(mexer_cometa, 1000 / 60);
    movimento_letra = setInterval(mexer_letra, 1000 / 60);
    posiciona_elementos();
    seleciona_palavra();
    selecionar_letra();
    atualizar_vidas();
    gameover = false;
}

window.onkeydown = function (event) {
    processaTecla(event);
    addTecla(event);
    processa_tecla(event);

};
document.onkeyup = function (event) {
    removeTecla(event);
};

var intteclas = setInterval(processaTecla, 1000 / 60);

function processaTecla(evt) {
    for (var i = 0; i < arrayTeclas.length; i++) {
        switch (arrayTeclas[i]) {

            case "s": //mexer nave para baixo dentro do limite do ecrã
                if (!gameover) {
                    if (parseInt(document.getElementById("jogador").style.top) < (window.innerHeight - parseInt(document.getElementById("jogador").height) - 10)) {
                        document.getElementById("jogador").style.top = parseInt(document.getElementById("jogador").style.top) + (window.innerHeight * 0.013) + "px";
                    }
                }
                break;

            case "w": //mexer nave para cima dentro do limite do ecrã
                if (!gameover) {
                    if (parseInt(document.getElementById("jogador").style.top) > 100)
                        document.getElementById("jogador").style.top = parseInt(document.getElementById("jogador").style.top) - (window.innerHeight * 0.013) + "px";
                }
                break;
            case"a":
                if (!gameover) {
                    if (parseInt(document.getElementById("jogador").style.left) > 50)
                        document.getElementById("jogador").style.left = parseInt(document.getElementById("jogador").style.left) - (window.innerWidth * 0.007) + "px";
                }
                break;
            case"d":
                if (!gameover) {
                    if (parseInt(document.getElementById("jogador").style.left) < window.innerWidth - document.getElementById("jogador").width)
                        document.getElementById("jogador").style.left = parseInt(document.getElementById("jogador").style.left) + (window.innerWidth * 0.007) + "px";
                }

        }
    }
}


function addTecla(evt) {
    var tecla = evt.key;
    var presente = false;

    for (var i = 0; i < arrayTeclas.length; i++) {
        if (arrayTeclas[i] == tecla) {
            presente = true;
        }
        if (arrayTeclas[i] == "w" && tecla == "s")
            arrayTeclas.splice(i, 1);
        else if (arrayTeclas[i] == "s" && tecla == "w")
            arrayTeclas.splice(i, 1);
    }
    if (presente == false) {
        arrayTeclas.push(tecla);
    }
}

function removeTecla(evt) {
    var tecla = evt.key;
    for (var i = 0; i < arrayTeclas.length; i++) {
        if (arrayTeclas[i] == tecla) {
            arrayTeclas.splice(i, 1);
        }
    }
}


function processa_tecla(evt) {
    switch (evt.key) {

        case "p":
            clearInterval(movimento_cometa);
            clearInterval(movimento_fundo);
            clearInterval(movimento_letra);
            clearInterval(ETtimer);
            clearInterval(Cometatimer);
            document.getElementById("pause").style.display = "block";
            document.getElementById("pause_sound").onclick = sommute;
            document.getElementById("pause_cont").onclick = function () {
                movimento_fundo = setInterval(mexer_fundo, 1000 / 60);
                movimento_cometa = setInterval(mexer_cometa, 1000 / 60);
                movimento_letra = setInterval(mexer_letra, 1000 / 60);
                ETtimer = setInterval("animacaoET(et)", 1000 / 20);
                Cometatimer = setInterval(animacao_cometa, 1000 / 10);
                document.getElementById("pause").style.display = "none";
            };
            document.getElementById("pause_end").onclick = function () {
                document.getElementById("pause").style.display = "none";
                game_over();
            }

    }
}

function mexer_fundo() { //função para o movimento do fundo

    if (parseInt(document.getElementById("fundo-proximo1").style.left) > -(parseInt(document.getElementById("fundo-proximo1").width))) {
        document.getElementById("fundo-proximo1").style.left = parseInt(document.getElementById("fundo-proximo1").style.left) - 3 + "px";
    } else {
        document.getElementById("fundo-proximo1").style.left = window.innerWidth + "px";

    }
    if (parseInt(document.getElementById("fundo-proximo2").style.left) > -(parseInt(document.getElementById("fundo-proximo2").width))) {
        document.getElementById("fundo-proximo2").style.left = parseInt(document.getElementById("fundo-proximo2").style.left) - 3 + "px";
    } else {
        document.getElementById("fundo-proximo2").style.left = window.innerWidth + "px";

    }
    if (parseInt(document.getElementById("fundo-medio1").style.left) > -(parseInt(document.getElementById("fundo-medio1").width))) {
        document.getElementById("fundo-medio1").style.left = parseInt(document.getElementById("fundo-medio1").style.left) - 1 + "px";
    } else {
        document.getElementById("fundo-medio1").style.left = window.innerWidth + "px";
    }

    if (parseInt(document.getElementById("fundo-medio2").style.left) > -(parseInt(document.getElementById("fundo-medio2").width))) {
        document.getElementById("fundo-medio2").style.left = parseInt(document.getElementById("fundo-medio2").style.left) - 1 + "px";
    } else {
        document.getElementById("fundo-medio2").style.left = window.innerWidth + "px";
    }


}

function mexer_cometa() { //função para movimento dos cometas

    if (detecta_colisao("jogador", "cometa")) {
        vidas--;

        perder_vidas.play();
        atualizar_vidas();
        document.getElementById("cometa").style.left = window.innerWidth + "px";
        document.getElementById("cometa").style.top = parseInt(Math.random() * (window.innerHeight - parseInt(document.getElementById("cometa").height) - 100)) + 100 + "px";
    }
    if (parseInt(document.getElementById("cometa").style.left) > -300) {
        document.getElementById("cometa").style.left = parseInt(document.getElementById("cometa").style.left) - velocidade - 3 + "px";
    } else {
        document.getElementById("cometa").style.left = window.innerWidth + "px";
        document.getElementById("cometa").style.top = parseInt(Math.random() * (window.innerHeight - parseInt(document.getElementById("cometa").height) - 100)) + 100 + "px";

    }

    if (vel_cont >= 4) {
        if (detecta_colisao("jogador", "cometa2")) {
            vidas--;
            atualizar_vidas();
            document.getElementById("cometa2").style.left = window.innerWidth + "px";
            document.getElementById("cometa2").style.top = parseInt(Math.random() * (window.innerHeight - parseInt(document.getElementById("cometa2").height) - 100)) + 100 + "px";
        }
        if (parseInt(document.getElementById("cometa2").style.left) > -300) {
            document.getElementById("cometa2").style.left = parseInt(document.getElementById("cometa2").style.left) - velocidade - 3 + "px";
        } else {
            document.getElementById("cometa2").style.left = window.innerWidth + "px";
            document.getElementById("cometa2").style.top = parseInt(Math.random() * (window.innerHeight - parseInt(document.getElementById("cometa2").height) - 100)) + 100 + "px";

        }

    }
    if (detecta_colisao("cometa", "cometa2"))
        document.getElementById("cometa2").style.top = parseInt(Math.random() * (window.innerHeight - parseInt(document.getElementById("cometa2").height) - 100)) + 100 + "px";

}

function mexer_letra() {
    if (detecta_colisao("jogador", "letra")) {
        pontos++;
        document.getElementById("pontos").innerHTML = pontos;
        ganhar_pontos.play();
        document.getElementById("letra").style.left = window.innerWidth + "px";
        document.getElementById("letra").style.top = parseInt(Math.random() * (window.innerHeight - parseInt(document.getElementById("letra").height) - 100)) + 100 + "px";
        document.getElementById("completo" + rdm_imagem).src = "assets/imgs/img/letras/" + imagens[rdm_imagem] + ".png";
        letras.splice(rdm_letra, 1);
        imagens[rdm_imagem] = "";

        if (letras.length == 0) {
            pontos = pontos + 5;
            vel_cont++;
            atualizar_velocidade();
            document.getElementById("pontos").innerHTML = pontos;
            palavra_verificacao = palavra_array[rdm_palavra];
            verificar_conquistas();
            atualizarconq();
            palavra_array.splice(rdm_palavra, 1);
            seleciona_palavra();
            vidas++;
            atualizar_vidas();

        }


        selecionar_letra();
    }
    else {
        if (parseInt(document.getElementById("letra").style.left) > -10) {
            document.getElementById("letra").style.left = parseInt(document.getElementById("letra").style.left) - velocidade + "px";
        } else {
            document.getElementById("letra").style.left = window.innerWidth + "px";
            document.getElementById("letra").style.top = parseInt(Math.random() * ((window.innerHeight - 50) - 150) + 150) + "px";
            vidas--;
            atualizar_vidas();
            selecionar_letra();
        }
    }

}

function seleciona_palavra() {
    if (palavra_array.length == 0) {
        palavra_array = palavras_base.slice();

    }
    document.getElementById("imagem_letras").innerHTML = "";
    rdm_palavra = parseInt(Math.random() * palavra_array.length);
    palavra = palavra_array[rdm_palavra];
    for (i = 0; i < palavra.length; i++) {
        letras[i] = palavra.substr(i, 1);
        imagens[i] = palavra.substr(i, 1);
        document.getElementById("imagem_letras").innerHTML += "<img src='assets/imgs/img/letras_opacidade/" + letras[i] + ".png' id='completo" + i + "' style='width:70px;'>";
    }

    selecionar_letra();


}

function selecionar_letra() {
    rdm_imagem = -1;
    rdm_letra = parseInt(Math.random() * letras.length);
    do {
        rdm_imagem++;


    } while (!(letras[rdm_letra] == imagens[rdm_imagem]));
    document.getElementById("letra").src = "assets/imgs/img/letras/" + letras[rdm_letra] + ".png";

}

function detecta_colisao(obj1_id, obj2_id) {
    var obj1 = document.getElementById(obj1_id);
    var obj2 = document.getElementById(obj2_id);

    var obj1_left = parseInt(obj1.style.left);
    var obj1_right = obj1_left + obj1.width;
    var obj1_top = (parseInt(obj1.style.top));
    var obj1_bottom = obj1_top + obj1.height;

    var obj2_left = (parseInt(obj2.style.left));
    var obj2_right = obj2_left + obj2.width;
    var obj2_top = (parseInt(obj2.style.top));
    var obj2_bottom = obj2_top + obj2.height;

    if (((obj1_left >= obj2_left && obj1_left <= obj2_right) || (obj1_right <= obj2_right && obj1_right >= obj2_left))
        && ((obj1_top >= obj2_top && obj1_top <= obj2_bottom) || (obj1_bottom <= obj2_bottom && obj1_bottom >= obj2_top))
        || ((obj2_left >= obj1_left && obj2_left <= obj1_right) || (obj2_right <= obj1_right && obj2_right >= obj1_left))
        && ((obj2_top >= obj1_top && obj2_top <= obj1_bottom) || (obj2_bottom <= obj1_bottom && obj2_bottom >= obj1_top))) {
        return true
    } else {
        return false;
    }
}


function verificar_conquistas() {

    switch (palavra_verificacao) {
        case "água":
            par1++;

            if (par1 == 2) {
                document.getElementById("conquista").src = "assets/imgs/img/conquistas/conquista1.png";
                animacao_conquistas();
                document.getElementById("par1").style.visibility = "visible";
            }
            break;
        case "maçã":
            par1++;
            if (par1 == 2) {
                document.getElementById("conquista").src = "assets/imgs/img/conquistas/conquista1.png";
                animacao_conquistas();
                document.getElementById("par1").style.visibility = "visible";
            }
            break;
        case "postura":
            par2++;
            if (par2 == 2) {
                document.getElementById("conquista").src = "assets/imgs/img/conquistas/conquista2.png";
                animacao_conquistas();
                document.getElementById("par2").style.visibility = "visible";
            }
            break;
        case "respirar":
            par2++;
            if (par2 == 2) {
                document.getElementById("conquista").src = "assets/imgs/img/conquistas/conquista2.png";
                animacao_conquistas();
                document.getElementById("par2").style.visibility = "visible";
            }
            break;
        case "limpeza":
            par3++;
            if (par3 == 2) {
                document.getElementById("conquista").src = "assets/imgs/img/conquistas/conquista3.png";
                animacao_conquistas();
                document.getElementById("par3").style.visibility = "visible";
            }
            break;
        case "dormir":
            par3++;
            if (par3 == 2) {
                document.getElementById("conquista").src = "assets/imgs/img/conquistas/conquista3.png";
                animacao_conquistas();
                document.getElementById("par3").style.visibility = "visible";
            }
            break;
        case "frio":
            par4++;
            if (par4 == 2) {
                document.getElementById("conquista").src = "assets/imgs/img/conquistas/conquista4.png";
                animacao_conquistas();
                document.getElementById("par4").style.visibility = "visible";
            }
            break;
        case "rouquidão":
            par4++;
            if (par4 == 2) {
                document.getElementById("conquista").src = "assets/imgs/img/conquistas/conquista4.png";
                animacao_conquistas();
                document.getElementById("par4").style.visibility = "visible";

            }
            break;
        case "gritar":
            par5++;
            if (par5 == 2) {
                document.getElementById("conquista").src = "assets/imgs/img/conquistas/conquista5.png";
                animacao_conquistas();
                document.getElementById("par5").style.visibility = "visible";
            }
            break;
        case "sussurrar":
            par5++;
            if (par5 == 2) {
                document.getElementById("conquista").src = "assets/imgs/img/conquistas/conquista5.png";
                animacao_conquistas();
                document.getElementById("par5").style.visibility = "visible";

            }
            break;
        case "chorar":
            par6++;
            if (par6 == 2) {
                document.getElementById("conquista").src = "assets/imgs/img/conquistas/conquista6.png";
                animacao_conquistas();
                document.getElementById("par6").style.visibility = "visible";

            }
            break;
        case "rir":
            par6++;
            if (par6 == 2) {
                document.getElementById("conquista").src = "assets/imgs/img/conquistas/conquista6.png";
                animacao_conquistas();
                document.getElementById("par6").style.visibility = "visible";

            }
            break;
    }
    if (!todasconq && par1 == 2 && par2 == 2 && par3 == 2 && par4 == 2 && par5 == 2 && par6 == 2) {
        setTimeout(document.getElementById("conquista").src = "assets/imgs/img/conquistas/conquistaTotal.png", 6000);
        setTimeout(animacao_conquistas(), 6000);
        todasconq = true;
    }


}

function atualizar_vidas() {
    switch (vidas) {
        case 3:
            document.getElementById("vidas").src = "assets/imgs/img/estrelas/estrela4.png";
            break;
        case 2:
            document.getElementById("vidas").src = "assets/imgs/img/estrelas/estrela3.png";
            break;
        case 1:
            document.getElementById("vidas").src = "assets/imgs/img/estrelas/estrela2.png";
            break;


    }
    if (vidas > 3)
        vidas = 3;
    if (vidas <= 0) {
        game_over();
    }
}

function animacao_cometa() {

    if (anicometa == 6) {
        anicometa = 1;
    }
    document.getElementById("cometa").src = "assets/imgs/img/Animacoes/cometa1/cometa1-" + anicometa + ".png";
    document.getElementById("cometa2").src = "assets/imgs/img/Animacoes/cometa1/cometa1-" + anicometa + ".png";
    anicometa++;
}

function game_over() {
    clearInterval(movimento_letra);
    clearInterval(movimento_fundo);
    clearInterval(movimento_cometa);
    clearInterval(ETtimer);
    if (pontos > localStorage.getItem("recorde")) {
        document.getElementById("perdeu_pontos").innerHTML = "Pontuação: " + pontos + "  <span style='border:solid white 4px;padding:1vmin;border-radius: 2vmin'>Novo recorde</span>";
    } else
        document.getElementById("perdeu_pontos").innerHTML = "Pontuação: " + pontos;
    set_recorde();
    document.getElementById("recorde").innerHTML = "recorde: " + localStorage.getItem("recorde");
    document.getElementById("perdeu").style.display = "block";
    document.getElementById("letra").style.left = window.innerWidth + "px";
    document.getElementById("cometa").style.left = window.innerWidth + "px";
    document.getElementById("cometa2").style.left = window.innerWidth + "px";
    document.getElementById("perdeu_nome").innerHTML = "Nome: " + nome;

    document.getElementById("sair").onclick = function () {
        document.getElementById("perdeu").style.display = "none";
        document.getElementById("menu").style.display = "block";
        document.getElementById("jogo").style.display = "none";
    };
    document.getElementById("reiniciar").onclick = function () {
        document.getElementById("perdeu").style.display = "none";
        comecar_jogo();
    };
    gameover = true;
}


function animacao_conquistas() {

    var vel = 10;
    var aniconq;
    var i = false;
    var goback;
    aniconq = setInterval(function () {
        if ((parseInt(document.getElementById("conquista").style.left) >= parseInt(window.innerWidth) - parseInt(document.getElementById("conquista").width))) {
            document.getElementById("conquista").style.left = parseInt(document.getElementById("conquista").style.left) - vel + "px";

        } else {

            i = true;
            setTimeout(function () {
                goback = setInterval(function () {
                    if (i && parseInt(document.getElementById("conquista").style.left) <= parseInt(window.innerWidth) + parseInt(document.getElementById("conquista").width)) {
                        document.getElementById("conquista").style.left = parseInt(document.getElementById("conquista").style.left) + vel + "px";
                    } else {
                        i = false;
                        clearInterval(goback)
                    }
                }, 1000 / 60);

            }, 2000);
            clearInterval(aniconq);
        }
    }, 1000 / 60);


}


function hoverplaneta(planeta, estado) {
    if (estado == "off") {
        document.getElementById("btn_menu_" + planeta).src = "assets/imgs/img/pagprincipal/planeta-" + planeta + "brilho.png";
        document.getElementById("menu_titulo").src = "assets/imgs/img/pagprincipal/ecra-" + planeta + ".png";
    } else {
        if (estado == "on") {
            document.getElementById("btn_menu_" + planeta).src = "assets/imgs/img/pagprincipal/planeta-" + planeta + ".png";
            document.getElementById("menu_titulo").src = "assets/imgs/img/pagprincipal/ecra-nome.png";

        }
    }

}

function hoverET(et, estado) {
    if (estado == "off") {
        document.getElementById("et" + et).src = "assets/imgs/img/escolherET/et" + et + ".png";
    } else {
        if (estado == "on") {
            document.getElementById("et" + et).src = "assets/imgs/img/escolherET/et" + et + "_1.png";
        }
    }
}

function hoverinst(estrela, estado) {
    if (estado == "off") {
        if (estrela == 1) {

            document.getElementById("inst_cometa").src = "assets/imgs/img/instrucoes/hover.png";
        } else {
            if (estrela == 2) {
                document.getElementById("inst_letra").src = "assets/imgs/img/instrucoes/hover.png";
            }
        }
    } else {
        if (estado == "on") {
            if (estrela == 1) {
                document.getElementById("inst_cometa").src = "assets/imgs/img/instrucoes/cometa.png";
            } else {
                if (estrela == 2) {
                    document.getElementById("inst_letra").src = "assets/imgs/img/instrucoes/letra.png";
                }
            }
        }
    }
}

function atualizar_velocidade() {
    if (vel_cont % 2 == 0) {
        velocidade += parseInt(window.innerWidth * 0.001);
    }

}

function animacaoET(et) {
    if (aniET == 15) {
        aniET = 1;

    }
    document.getElementById("jogador").src = "assets/imgs/img/Animacoes/animacaoet" + et + "/1." + aniET + ".png";


    aniET++;
}

function atualizarconq() {
    if (par1 < 2 && par2 < 2 && par3 < 2 && par4 < 2 && par5 < 2 && par6 < 2) {
        document.getElementById("parte").src = "assets/imgs/img/oficina/cadeado.png";
        document.getElementById("parte").disabled = true;
    } else {
        document.getElementById("parte").disabled = false;
        if (imagemconq == 0)
            imagemconq = 6;
        if (imagemconq == 7)
            imagemconq = 1;
        switch (imagemconq) {
            case 1:
                if (par1 >= 2) {
                    document.getElementById("parte").src = "assets/imgs/img/oficina/amarelo.png";
                    document.getElementById("parte").style.left = "10vw";
                    document.getElementById("parte").style.top = "12vh";
                }
                else {
                    if (dirseta) {
                        imagemconq++;
                        atualizarconq();
                    } else {
                        imagemconq--;
                        atualizarconq();
                    }
                }

                break;
            case 2:
                if (par2 >= 2) {
                    document.getElementById("parte").src = "assets/imgs/img/oficina/base.png";
                    document.getElementById("parte").style.left = "9.5vw";
                    document.getElementById("parte").style.top = "30vh";
                }
                else {
                    if (dirseta) {
                        imagemconq++;
                        atualizarconq();
                    } else {
                        imagemconq--;
                        atualizarconq();
                    }
                }
                break;
            case 3:
                if (par3 >= 2) {
                    document.getElementById("parte").src = "assets/imgs/img/oficina/top1.png";
                    document.getElementById("parte").style.left = "11vw";
                    document.getElementById("parte").style.top = "25vh";
                }
                else {
                    if (dirseta) {
                        imagemconq++;
                        atualizarconq();
                    } else {
                        imagemconq--;
                        atualizarconq();
                    }
                }
                break;
            case 4:
                if (par4 >= 2) {
                    document.getElementById("parte").src = "assets/imgs/img/oficina/top2.png";
                    document.getElementById("parte").style.left = "11vw";
                    document.getElementById("parte").style.top = "25vh";
                }
                else {
                    if (dirseta) {
                        imagemconq++;
                        atualizarconq();
                    } else {
                        imagemconq--;
                        atualizarconq();
                    }
                }
                break;
            case 5:
                if (par5 >= 2) {
                    document.getElementById("parte").src = "assets/imgs/img/oficina/janelas1.png";
                    document.getElementById("parte").style.left = "10.5vw";
                    document.getElementById("parte").style.top = "24vh";
                }
                else {
                    if (dirseta) {
                        imagemconq++;
                        atualizarconq();
                    } else {
                        imagemconq--;
                        atualizarconq();
                    }
                }
                break;
            case 6:
                if (par6 >= 2) {
                    document.getElementById("parte").src = "assets/imgs/img/oficina/janela2.png";
                    document.getElementById("parte").style.left = "12vw";
                    document.getElementById("parte").style.top = "15vh";
                }
                else {
                    if (dirseta) {
                        imagemconq++;
                        atualizarconq();
                    } else {
                        imagemconq--;
                        atualizarconq();
                    }
                }
                break;
        }
    }
}

function layer_conq() {
    if (par1 >= 2 || par2 >= 2 || par3 >= 2 || par4 >= 2 || par5 >= 2 || par6 >= 2) {
        switch (imagemconq) {
            case 1:
                document.getElementById("layer_par1").style.visibility = "visible";
                document.getElementById("close_conq_layer").style.visibility = "visible";
                document.getElementById("som_conq").style.visibility = "visible";

                document.getElementById("close_conq_layer").onclick = function () {
                    document.getElementById("layer_par1").style.visibility = "hidden";
                    document.getElementById("close_conq_layer").style.visibility = "hidden";
                    document.getElementById("som_conq").style.visibility = "hidden";
                };
                break;
            case 2:
                document.getElementById("layer_par2").style.visibility = "visible";
                document.getElementById("close_conq_layer").style.visibility = "visible";
                document.getElementById("som_conq").style.visibility = "visible";

                document.getElementById("close_conq_layer").onclick = function () {
                    document.getElementById("layer_par2").style.visibility = "hidden";
                    document.getElementById("close_conq_layer").style.visibility = "hidden";
                    document.getElementById("som_conq").style.visibility = "hidden";
                };
                break;
            case 3:
                document.getElementById("layer_par3").style.visibility = "visible";
                document.getElementById("close_conq_layer").style.visibility = "visible";
                document.getElementById("som_conq").style.visibility = "visible";
                document.getElementById("close_conq_layer").onclick = function () {
                    document.getElementById("layer_par3").style.visibility = "hidden";
                    document.getElementById("close_conq_layer").style.visibility = "hidden";
                    document.getElementById("som_conq").style.visibility = "hidden";
                };
                break;
            case 4:
                document.getElementById("layer_par4").style.visibility = "visible";
                document.getElementById("close_conq_layer").style.visibility = "visible";
                document.getElementById("som_conq").style.visibility = "visible";
                document.getElementById("close_conq_layer").onclick = function () {
                    document.getElementById("layer_par4").style.visibility = "hidden";
                    document.getElementById("close_conq_layer").style.visibility = "hidden";
                    document.getElementById("som_conq").style.visibility = "hidden";
                };
                break;
            case 5:
                document.getElementById("layer_par5").style.visibility = "visible";
                document.getElementById("close_conq_layer").style.visibility = "visible";
                document.getElementById("som_conq").style.visibility = "visible";
                document.getElementById("close_conq_layer").onclick = function () {
                    document.getElementById("layer_par5").style.visibility = "hidden";
                    document.getElementById("close_conq_layer").style.visibility = "hidden";
                    document.getElementById("som_conq").style.visibility = "hidden";
                };
                break;
            case 6:
                document.getElementById("layer_par6").style.visibility = "visible";
                document.getElementById("close_conq_layer").style.visibility = "visible";
                document.getElementById("som_conq").style.visibility = "visible";
                document.getElementById("close_conq_layer").onclick = function () {
                    document.getElementById("layer_par6").style.visibility = "hidden";
                    document.getElementById("close_conq_layer").style.visibility = "hidden";
                    document.getElementById("som_conq").style.visibility = "hidden";
                };
                break;
        }
    }
}

function som_conq() {
    switch (imagemconq) {
        case 1:
            fala("A água e a maçã ajudam-te a hidratar e a limpar o lixo das tuas cordas vocais! São elas que te fazem falar… Cuida bem delas!", "PT-pt");

            break;
        case 2:
            fala("Sabias que tens de ter alguns cuidados com a tua voz? Não podes falar numa posição incorreta. Por exemplo, é melhor respirares pelo nariz do que pela boca!");
            fala("Assim tratas bem do ar que vai para os teus pulmões!");
            break;
        case 3:
            fala("Tal como sentes os teus olhos  pesados quando tens sono, também a tua voz se sente cansada! Precisas de dormir 8 horas por dia para seres saudável.");
            fala(" E não te esqueças de lavar bem os dentes a seguir às refeições!");
            break;
        case 4:
            fala("Sabias que o frio faz com que a tua voz fique doente? Para que isso não aconteça, tens de beber muita água! ");
            fala("E se sentires que ficas rouco ou rouca por mais de 15 dias, pede para ir ao médico!");
            break;
        case 5:
            fala("Nem muito alto nem muito baixo! Se gritares, irritas a laringe. Se sussurrares causas tensão nos músculos da tua cara e nas tuas cordas vocais.");
            fala(" É como se fizesses uma ferida na garganta!Não grites, nem sussurres. Fala!");
            break;
        case 6:
            fala("Sabias que as tuas birras também não são tuas amigas? É verdade... Se chorares muito, vais irritar as tuas cordas vocais, e isso não é bom para elas!");
            fala("Mas atenção! Também não te podes rir muito alto, porque o efeito é o mesmo... Só te queremos feliz!");
            break;
    }
}

function sommute() {
    if (mute) {
        document.getElementById("som_inst").src = "assets/imgs/img/instrucoes/som2.png";
        document.getElementById("pause_sound").src = "assets/imgs/img/pausa/som2.png";
        backgroundsom.muted = true;
        perder_vidas.muted = true;
        ganhar_pontos.muted = true;
        mute = false;
    } else {
        document.getElementById("som_inst").src = "assets/imgs/img/instrucoes/som1.png";
        document.getElementById("pause_sound").src = "assets/imgs/img/pausa/som1.png";
        backgroundsom.muted = false;
        perder_vidas.muted = false;
        ganhar_pontos.muted = false;
        mute = true;
    }
}


function fala(m) {
    var msg = new SpeechSynthesisUtterance();

    msg.voiceURI = "native";
    msg.volume = 1;
    msg.rate = .9;
    msg.pitch = 0.8;
    msg.text = m;
    msg.lang = "PT-pt";
    speechSynthesis.speak(msg);
}

function set_recorde() {
    if (localStorage.getItem("recorde") == null) {
        localStorage.setItem("recorde", pontos);
    } else {
        if (pontos > localStorage.getItem("recorde")) {
            localStorage.setItem("recorde", pontos);
        }
    }
}

/*function animacao_estado(cor, mensagem){
    document.getElementById("palavra-estado").style.backgroundColor=cor;
    document.getElementById("palavra-estado").style.left=document.getElementById("imagem_letras").width + "px";
    document.getElementById("palavra-estado").innerText=mensagem;
    var opacidade=setInterval(function(){
        if (document.getElementById("palavra-estado")){}
        }
    )*/

