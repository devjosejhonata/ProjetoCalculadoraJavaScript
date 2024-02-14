/*
- Orientação a objetos MVC: Forma de otimizar o código e trabalhar mais organizado, MVC significa Model View Controller. Model manipula os 
dados, View interface que o usuário interage, Controller define a regra de negócio;
- Instancia : quando um objeto representa uma classe;
- Classe: Contém variaveis, funções, atributos e metodos; 
- Objeto: Representa alguma classe;
- o New cria uma instancia de uma classe/objeto;
- Dentro dos parenteses fica os parametros, em um metodo ou função, pode ter parametro ou nao.
- Atributo: Similar a uma variável, porém com mais recursos.
- this: faz referencia ao objeto que foi instanciado da classe, quer dizer esse objeto, esse classe.
- Encapsulamento: controla o acesso a um atributo ou método, a gente consegue registrar ou criar algumas ações.
- Os tipos comuns de encapsulamento são: public, protected, private... 
   public: todos acessam;
   protected: atributos e métodos da mesma classe e classe pai;
   private: somente atributos e métodos da própria classe;
- Atribuir ou recuperar: valores dos atributos;
- getters e setters: permitem definir como acessar os valores;
- DOM: Document Object Model; 
- Eventos: Ações disparadas na aplicação;
- window: tudo que tem haver com o navegaor; document: tudo que tem haver com aquela pagina;
- query selector: o querySelector, manipula as informações do DOM. Seleciona elementos por meio de seletores css3.
- Refatorar: expressão utilizada para melhorar ou refazer o código otimizando o mesmo.
- setInterval: Função executada em um intervalo de tempo, o tempo é marcado em milisegundos.
- Arrow Functions: Uma nova forma de criar funções. nao preciso escrever a palavra function, os parenteses sao para os parametros, tem que ter
em seguida o sinal de igual e maior, quer dizer, essa função vai fazer isso.
- switch: estrutura de controle que eu uso quando eu já sei quais as opções que podem acontecer, utilizo a palavra case para descrever as 
opçoes, e quando chegar na opção que eu quero e para parar, pra nao ficar passando por outras, eu uso a palavra break. E se passar pelas 
opçoes e nao cair em nenhuma delas eu uso a palavra default no final.
- isNaN: Função do window que, faz uma validação se não é um número e retorna um número.
- toString: Converte em string.
- indexOf: busca o valor dentro do array, se existe ai dentro, se achar vai trazer o index do elemento.
- try catch: recurso para tratar erros. Ex, tento fazer algo no try, se nao conseguir executa tal coisa no bloco catch. Vamos executar sempre
em areas sensíveis do código que podem ser passíveis de erros, ou se o usuário preencher com alguma informação inválida que pode se tornar um 
erro da nossa aplicação.
*/
class CalcController { //todos os metodos de controle de regras vao estar dentro dessa classe

    constructor(){
        //metodo construtor, chamado automaticamente quando existe uma instancia de uma classe.
        this._audio = new Audio('click.mp3');
        this._audioOnOff = false;
        this._lastOperator = '';
        this._lastNumber = '';
        this._operation = [];//guardar nossa operação
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        //o querySelector, manipula as informações do DOM. Seleciona elementos por meio de seletores css3. 
        //el uma convenção usada, significa que estou usando um elemento do html.
        this._currentDate;
        //atributos podem possuir encapsulamento, posso controlar quem conversa ou nao com eles
        //se for privado eu uso o underline, ou seja, só a classe CalcController podem conversar com esses atributos.
        this.initialize();
        this.initButtonsEvents();
        this.initKeyboard();
        /* o this se refere ao metodo que está nesse objeto, this: faz referencia ao objeto que foi instanciado da classe, quer dizer esse 
        objeto, esse classe.*/
    }
    pasteFromClipboard(){
        //colar da área de transferência

        document.addEventListener('paste', e=>{
            //adicionar ouvinte de evento

            let text = e.clipboardData.getData('Text');
            //Obter dados

            this.displayCalc = parseFloat(text);
            //analisar flutuador

        });

    }

    copyToClipboard(){
        //copiar para área de transferência

        let input = document.createElement('input');
        //criar elemento

        input.value = this.displayCalc;

        document.body.appendChild(input);
        //anexar filho

        input.select();
        //selecione

        document.execCommand("Copy");
        //executar Comando

        input.remove();
        //remover

    }
    initialize(){//Tudo que eu quero que aconteça, quando a calculadora começar, vai ta dentro desse metodo
        //inicializar

        this.setDisplayDateTime()
        //definir data e hora de exibição

        setInterval(()=>{
            //definir intervalo

            this.setDisplayDateTime();
            //definir data e hora de exibição

        }, 1000);

        this.setLastNumberToDisplay();
        this.pasteFromClipboard();

        document.querySelectorAll('.btn-ac').forEach(btn=>{
            //seletor de consulta tudo

            btn.addEventListener('dblclick', e=>{

                this.toggleAudio();

            });

        });
        
    }
    toggleAudio(){
        //alternar áudio

        this._audioOnOff = !this._audioOnOff;

    }

    playAudio(){
        //reproduzir áudio

        if (this._audioOnOff) {

            this._audio.currentTime = 0;
            this._audio.play();

        }

    }
    initKeyboard() {
        //teclado de inicialização

        document.addEventListener('keyup', e=> {

            this.playAudio();

            switch (e.key) {
                /*
                estrutura de controle que eu uso quando eu já sei quais as opções que podem acontecer, utilizo a palavra case para descrever as 
                opçoes, e quando chegar na opção que eu quero e para parar, pra nao ficar passando por outras, eu uso a palavra break. E se 
                passar pelas opçoes e nao cair em nenhuma delas eu uso a palavra default no final.
                */

                case 'Escape':
                    this.clearAll();
                    //limpar tudo
                    break;
    
                case 'Backspace':
                    this.clearEntry();
                    //limpar entrada
                    break;
    
                case '+':    
                case '-':    
                case '*':    
                case '/':    
                case '%':
                    this.addOperation(e.key);
                    //adicionar operação
                    break;
    
                case 'Enter':
                case '=':
                    this.calc();
                    break;
    
                case '.':
                case ',':
                    this.addDot();
                    break;
    
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    this.addOperation(parseInt(e.key));
                    break;

                case 'c':
                    if (e.ctrlKey) this.copyToClipboard();
                    break;
    
            }

        })

    }
    addEventListenerAll(element, events, fn){
        //adicionar ouvinte de eventos a Todos

        events.split(' ').forEach(event => {

            element.addEventListener(event, fn, false);

        })
    
    }
    clearAll(){
        //limpar tudo

        this._operation = [];
        this._lastNumber = '';
        this._lastOperator = '';

        this.setLastNumberToDisplay();

    }

    clearEntry(){
        //limpar entrada

        this._operation.pop();
        //pop é um metodo nativo do javascript que elimina o ultimo

        this.setLastNumberToDisplay();

    }
    getLastOperation(){
        //obter a última operação

        return this._operation[this._operation.length-1];

    }
    setLastOperation(value){
        //definir a última operação

        this._operation[this._operation.length-1] = value;

    }
    isOperator(value){
        //é Operador

        return (['+', '-', '*', '%', '/'].indexOf(value) > -1);
        //indexOf: busca o valor dentro do array, se existe ai dentro, se achar vai trazer o index do elemento.

    }
    pushOperation(value){
        //operação push

        this._operation.push(value);

        if (this._operation.length > 3) {

            this.calc();

        }

    }
    getResult(){
        //obter resultado

        try{//vai tentar fazer isso aqui

            return eval(this._operation.join(""));

        }catch(e){//senao conseguir vai retornar uma mensagem de erro.

            setTimeout(()=>{

                this.setError();

            }, 1)

        }
      //recurso Try Catch
    }
    calc(){
        //calculo

        let last = '';
        
        this._lastOperator = this.getLastItem();

        if (this._operation.length < 3) {

            let firstItem = this._operation[0];

            this._operation = [firstItem, this._lastOperator, this._lastNumber];

        }

        if (this._operation.length > 3) {

            last = this._operation.pop();

            this._lastNumber = this.getResult();

        } else if (this._operation.length == 3) {

            this._lastNumber = this.getLastItem(false);

        }
        
        let result = this.getResult();

        if (last == '%') {

            result /= 100;

            this._operation = [result];

        } else {

            this._operation = [result];

            if (last) this._operation.push(last);

        }

        this.setLastNumberToDisplay();
        

    }
    getLastItem(isOperator = true){
        //obter o último item

        let lastItem;

        for (let i = this._operation.length-1; i >= 0; i--){

            if (this.isOperator(this._operation[i]) == isOperator) {
    
                lastItem = this._operation[i];
    
                break;
    
            }

        }

        if (!lastItem) {
            //a esclamação está negando a espressao

            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;

        }

        return lastItem;

    }
    setLastNumberToDisplay(){
        //definir o último número a ser exibido

        let lastNumber = this.getLastItem(false);

        if (!lastNumber) lastNumber = 0;

        this.displayCalc = lastNumber;

    }
    addOperation(value){
        //adicionar operação


        if (isNaN(this.getLastOperation())) {

            if (this.isOperator(value)) {

                this.setLastOperation(value);

            }  else {

                this.pushOperation(value);

                this.setLastNumberToDisplay();

            }

        } else {

            if (this.isOperator(value)){

                this.pushOperation(value);

            } else {

                let newValue = this.getLastOperation().toString() + value.toString();
                //novo valor

                this.setLastOperation(newValue);

                this.setLastNumberToDisplay();

            }

        }

    }

    setError(){
        //definir erro

        this.displayCalc = "Error";
        
    }
    addDot(){
        //adicionar ponto

        let lastOperation = this.getLastOperation();

        if (typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return;

        if (this.isOperator(lastOperation) || !lastOperation) {

            this.pushOperation('0.');

        } else {

            this.setLastOperation(lastOperation.toString() + '.');

        }

        this.setLastNumberToDisplay();
        
    }
    execBtn(value){
        //executar ação do botão

        this.playAudio();

        switch (value) {
            /*
                estrutura de controle que eu uso quando eu já sei quais as opções que podem acontecer, utilizo a palavra case para descrever as 
                opçoes, e quando chegar na opção que eu quero e para parar, pra nao ficar passando por outras, eu uso a palavra break. E se 
                passar pelas opçoes e nao cair em nenhuma delas eu uso a palavra default no final.
            */

            case 'ac':
                this.clearAll();
                break;

            case 'ce':
                this.clearEntry();
                break;

            case 'soma':
                this.addOperation('+');
                break;

            case 'subtracao':
                this.addOperation('-');
                break;

            case 'divisao':
                this.addOperation('/');
                break;

            case 'multiplicacao':
                this.addOperation('*');
                break;

            case 'porcento':
                this.addOperation('%');
                break;
                
            case 'igual':
                this.calc();
                break;

            case 'ponto':
                this.addDot();
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;

            default:
                this.setError();
                break;

        }

    }
    initButtonsEvents(){
        //Eventos de botões de inicialização

        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index)=>{
            //para cada, percorre cada um dos botoes
            //a partir de dois argumentos, coloca entre parenteses

            this.addEventListenerAll(btn, "click drag", e => {
            //evento click e evento drag, ambos os eventos vao executar a mesma função


                let textBtn = btn.className.baseVal.replace("btn-","");
                                                  //substituir

                this.execBtn(textBtn);

            })

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
            //passe o mouse, passe o mouse para cima, passe o mouse para baixo

                btn.style.cursor = "pointer";

            })

        })

    }
    setDisplayDateTime(){
        //definir data e hora de exibição

        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);

    }
    get displayTime(){ //get, quero que me devolva algo;
        //tempo de exibição

        return this._timeEl.innerHTML;//estou retornando algo.

    }
    set displayTime(value){//set, muda o valor do atributo.
        //tempo de exibição

        return this._timeEl.innerHTML = value;//estou retornando algo.

    }

    get displayDate(){//get, quero que me devolva algo;
        //data de exibição

        return this._dateEl.innerHTML;//estou retornando algo.

    }

    set displayDate(value){//set, muda o valor do atributo.
        //data de exibição

        return this._dateEl.innerHTML = value;//estou retornando algo.

    }

    get displayCalc(){//get, quero que me devolva algo;
        //exibir calculo

        return this._displayCalcEl.innerHTML;//estou retornando algo.

    }

    set displayCalc(value){//set, muda o valor do atributo.
        //exibir calculo

        if (value.toString().length > 10) {

            this.setError();//vai executar somente 10 numeros na tela, se passar de 10 vai dar a mensagem de erro

            return false;//estou retornando algo.

        }

        this._displayCalcEl.innerHTML = value;

    }
    /*o innerHTML é uma propriedade que quando trabalhamos com o dom temos acesso a ela, ela diz pega 
        esse objeto e coloca uma informação la dentro no formato html*/

    get currentDate(){//get, quero que me devolva algo;
        //data atual

        return new Date();//estou retornando algo.
        //Date, classe nativa do javascript para datas.

    }

    set currentDate(value){//set, muda o valor do atributo.
        //data atual

        this._currentDate = value;

    }

}
