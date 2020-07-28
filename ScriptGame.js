//declarando los elementos, botoens en este caso
const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_LVL = 10;
const panel = document.getElementById("lvlboard")



//esto se llama al m0omento de crear un juego nuevo 
class Juego {
  constructor() {
    this.inicializar = this.inicializar.bind(this)
    this.inicializar()
    this.generarSecuencia()
    setTimeout(this.siguienteNivel, 500 )
    
    
    
  }
//remueve el boton al inciar el juego
  inicializar() {
    this.siguienteNivel = this.siguienteNivel.bind(this) 
    this.elegircolor = this.elegircolor.bind(this) //bindea el This de elegircolor a la class juego por que normalmente estaria en el DOM .
    // btnEmpezar.classList.add('hide') //agrega una class al CSS, luego en el CSS esta el hide.
    this.startCountLevel()
    this.togglebtnEmpezar()
    this.level = 1;
    this.colores = {
      celeste,
      violeta,
      naranja,
      verde
    }
  }
//

startCountLevel(){
  lvlboard.value = `Nivel: 1`;
}

uptadecountlvl() {
  lvlboard.value = `Nivel: ${this.level}`
}

togglebtnEmpezar() {
  if (btnEmpezar.classList.contains("hide")) {
    btnEmpezar.classList.remove("hide")
  } else {
    btnEmpezar.classList.add("hide")
  }
}

  generarSecuencia() {
    this.secuencia =  new Array(ULTIMO_LVL).fill(0).map(n => Math.floor(Math.random()*4))  //esto crea un array lo llena de 0 para luego Mapearlo con nuevor random entre 0 y 4 y la varia floor lo redondea.
  }
//comenzar cada vez que se sube de nivel
  siguienteNivel() {
    this.subnivel = 0;
    this.iluminarSecuencia()
    this.agregarEventosClick()
  }
  
  //secuencia para iluminar los botones
  iluminarSecuencia() {
    for (let i = 0; i < this.level; i++){
      const color = this.numerosAcolor(this.secuencia[i])
      setTimeout(() => this.iluminarColor(color), 1000 * i )
    }
  }
  //relacionar los colores a los numeros
    numerosAcolor(numero) {
      switch(numero) {
        case 0: 
        return "celeste"
        case 1: 
        return "violeta"
        case 2: 
        return "naranja"
        case 3:
        return "verde"
      }
    }
//ilumina y apaga el color
  iluminarColor(color){
      this.colores[color].classList.add("light")
      setTimeout(()=> this.apagarColor(color), 350)
    }
//apaga el color
  apagarColor(color) {
    this.colores[color].classList.remove("light")
  }
  
  agregarEventosClick() {
    this.colores.celeste.addEventListener('click', this.elegircolor)
    this.colores.violeta.addEventListener('click', this.elegircolor)
    this.colores.verde.addEventListener('click', this.elegircolor)
    this.colores.naranja.addEventListener('click', this.elegircolor)
   }
  
   eliminarEventosClick() {
    this.colores.celeste.removeEventListener('click', this.elegircolor)
    this.colores.violeta.removeEventListener('click', this.elegircolor)
    this.colores.verde.removeEventListener('click', this.elegircolor)
    this.colores.naranja.removeEventListener('click', this.elegircolor)
   }


  //esto es practicamente condicionales para cuando gana o pierde el juego

  elegircolor(ev){
    const nameColor = ev.target.dataset.color;
    const numberColor = this.colorAnumeros(nameColor)
    this.iluminarColor(nameColor)
    if(numberColor === this.secuencia[this.subnivel]){
        this.subnivel ++
        if (this.subnivel === this.level) {
            this.level ++
            this.eliminarEventosClick;
            if(this.level === (ULTIMO_LVL + 1)){
                this.ganoEljuego();
            } else {
                setTimeout(this.siguienteNivel, 1500)
                this.uptadecountlvl()
            }
        }
    } else {
       this.perdioEljuego();
    }
}


  ganoEljuego() {
    swal("Simon Dice", "Felicitaciones, Ganastes", "success")
      .then(this.inicializar)
  }


  perdioEljuego(){
    swal("Simon Dice", "Lo lamentamos, Perdiste. :(", "error") 
      .then(()=> {
        this.eliminarEventosClick();
        this.inicializar();
      })
    

  }


  //relacionar los colores a numeros ahora
colorAnumeros(color) {
  switch(color) {
    case "celeste": 
    return 0
    case "violeta": 
    return 1
    case "naranja": 
    return 2
    case "verde":
    return 3
  }
}



}

//funcion que inicia el juego 
function empezarJuego() {
  window.juego = new Juego() //crear un nuevo juego en este caso crea una neuva clase, el prototypo juego
}

