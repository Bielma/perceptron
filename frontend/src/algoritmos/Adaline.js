class Adaline {
    constructor(size, it, error, lr, cp) {
        this.estado = cp;
        this.w = [];
        this.learningRate = parseFloat(lr);
        this.iterations = parseFloat(it) || 100;
        this.ecm = parseFloat(error); //Error cuadratico medio
        this.errorAcumulado = [];
        this.senalCorregida = [] 
       
        for (var i = 0; i < size + 1; i++) {
            this.w[i] = Math.random() * (5 - (-5)) + (-5);
        }
    }

    fit = async (inputs, outputs) => {
        let epoca = 0;
        let x2 = [];
        let sumaError = 0;
        let errorLineal = 0;
        let errorCuadratico = 0;
        let y = 0;
        let errorCuadraticoMedio = 5;

        while (errorCuadraticoMedio >= this.ecm) {
            
            for (var j = 0; j < inputs.length; j++) {
                //const d = outputs[j]  >= 0 ? 0.5 : -0.5;    
                y = this.transferencia(inputs[j]);
                errorLineal = outputs[j] - this.f(y);
                errorCuadratico = Math.pow(errorLineal, 2);
                sumaError += errorCuadratico;
                for (let k = 0; k < inputs[j].length; k++) {
                    this.w[k + 1] += (this.learningRate * errorLineal * this.f(y) * (1 - this.f(y)) * inputs[j][k]);
                }
                
            }
           
        

            errorCuadraticoMedio = sumaError / inputs.length;

        
            // this.errorAcumulado.push({ epoca: "Ep " + parseFloat(epoca + 1), error: errorCuadraticoMedio });
            epoca += 1;
            sumaError = 0;

            if (epoca >= this.iterations) {
                break;
            }
        }

        
    }


   f = (y) =>{
    const ye = y * -1; 
    return  1/(1+(Math.pow(Math.E, ye)));
    // return y
   }

    transferencia = (inputs) => {
        let suma = -this.w[0];
        for (var i = 0; i < inputs.length; i++) {
            suma += this.w[i + 1] * inputs[i];
        }
        return suma;
        // const activation = suma  >= 0 ? 0.5 : -0.5;      
        // return activation;

    }
    
    predict = (inputs) => {
        let suma = -this.w[0];
        for (var i = 0; i < inputs.length; i++) {
            suma += this.w[i + 1] * inputs[i];
        }
        const activation = suma //  >= 0 ? 1 : 0;
        return activation;

    }



}

export default Adaline;