//inicializando los valores importantes
let numeroSecreto = 0;
let contadorIntentos = 0;
let listaSorteados = [];
let numeroMaximo = 10;
let intentoMaximo = 4;
let intentosRestantes = 4;

//funciones
//edita los elementos de la pagina
function editarHTML(elemento, texto){
    let tituloHTML = document.querySelector(elemento);
    tituloHTML.innerHTML = texto;
    return;
}

//boton intentar
function verificaIntento(){

    let numeroUsuario = parseInt(document.getElementById('valorUsuario').value);
    console.log(contadorIntentos);
    if(contadorIntentos <= intentoMaximo){
        if(numeroUsuario === numeroSecreto){
            /*Operador ternario es un if else en la siguiente linea de codigo: 
            condicion ? (cumple) primera opcion : (sino) la otra opcion*/
            editarHTML('p', `Acertaste el numero en ${contadorIntentos} ${(contadorIntentos == 1) ? 'vez' : 'veces'}`);
            document.getElementById('reiniciar').removeAttribute('disabled');
            document.querySelector('#intentar').setAttribute('disabled', 'true');
        }else{ 
            if(intentosRestantes == 1){ 
                editarHTML('p', `Fallaste, intentalo nuevamente`);
                document.getElementById('reiniciar').removeAttribute('disabled');
                document.querySelector('#intentar').setAttribute('disabled', 'true');
            }else{
                //El usuario fallo
                    if (numeroUsuario > numeroSecreto){
                        editarHTML('p', `El numero secreto es menor, te ${(intentosRestantes == 1) ? 'queda' : 'quedan'} ${intentosRestantes} ${(intentosRestantes == 1) ? 'intento' : 'intentos'}`);
                    }else{
                        editarHTML('p', `El numero secreto es mayor, te ${(intentosRestantes == 1) ? 'queda' : 'quedan'} ${intentosRestantes} ${(intentosRestantes == 1) ? 'intento' : 'intentos'}`);
                    }
                    contadorIntentos++;
                    intentosRestantes--;
                    limpiarCampo();
            }
        }
        return;
    }
}

//boton reinicia juego
function reiniciarJuego(){
    limpiarCampo();
    editarHTML('p', `Adivina el numero del 1 al ${numeroMaximo}`);
    condicionesIniciales();
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
    document.getElementById('intentar').removeAttribute('disabled');
    return;
}

//provee las condiciones al inciar y reiniciar el juego
function condicionesIniciales() {
    editarHTML('h1', "Adivina el numero v1.0");
    editarHTML('p', `Adivina el numero del 1 al ${numeroMaximo}`);
    numeroSecreto = numeroRandom();
    contadorIntentos = 1;
    intentosRestantes = 4;
    return;
}

//genera el numero aleatorio
function numeroRandom() {
    let numeroGenerado =  Math.floor(Math.random()*numeroMaximo)+1;
    console.log(numeroGenerado);
    console.log(listaSorteados);
    //si ya se sortearon los numeros
    if (listaSorteados.length == numeroMaximo){
        editarHTML('p', 'Ya adivinaste todos los numeros!');
        document.querySelector('#intentar').setAttribute('disabled', 'true');
        document.querySelector('#valorUsuario').setAttribute('disabled', 'true');
    }else{
        //Si el numero ya esta en la lista
        if (listaSorteados.includes(numeroGenerado)) {
            return numeroRandom();
        }else{
            listaSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }

}

//cada intento nuevo limpia el numero ingresado
function limpiarCampo() {
    document.querySelector('#valorUsuario').value = '';
}

//codigo del juego y la pagina
condicionesIniciales();
