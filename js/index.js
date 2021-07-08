class Despesa{
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }
    // validação de dados
    validarDados(){
        //for in - percorre arrays e objetos
        // somente this referencia a este proprio objeto
        for(let i in this){
            //console.log(i, this[i]) // consulta o indice eo valor deste objeto ou array
            if(this[i] == undefined || this[i] == null || this[i] == '' ){
                return false;
            }
        }
            return true;;
    }
}

class Bd{

    constructor(){
        let id = localStorage.getItem('id');
        if(id === null){
            localStorage.setItem('id', 0)
        }
    }

    getProximoId(){
        // recupera dados dentro do localStorge
        let proximoId = localStorage.getItem('id'); //null
        return parseInt(proximoId) + 1;

    }
    gravar(d){
        //localstorage salva as informações no navegador
        //JSON.stringfy() converte objetos para anotaçoes JSON
        //localStorage.setItem('despesa', JSON.stringify(d))
        let id = this.getProximoId()
        localStorage.setItem(id, JSON.stringify(d))
        localStorage.setItem('id', id )
    }
}

let bd = new Bd()


function cadastrarDespesa(){
    let ano = document.getElementById('ano').value;
    let mes = document.getElementById('mes').value;
    let dia = document.getElementById('dia').value;
    let tipo = document.getElementById('tipo').value;
    let descricao = document.getElementById('descricao').value;
    let valor = document.getElementById('valor').value;

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor);
    
    if(despesa.validarDados() === true ){
       bd.gravar(despesa)
        //dialog sucess
        //console.log('Dados válidos');


        //innerHTML inclui texto ou parametros dentro daa tag com ID ou entre

        document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso';
        document.getElementById('modal_titulo_div').className = 'modal-header text-success';
        document.getElementById('modal_conteudo').innerHTML = 'Despesa foi cadastrada com sucesso';
        document.getElementById('modal_btn').innerHTML = 'Voltar';
        document.getElementById('modal_btn').className = 'btn btn-success';
        //JQUERY
        $('#modalRegistraDespesa').modal('show');
    }else{

        document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro';
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger';
        document.getElementById('modal_conteudo').innerHTML = 'Erro na Gravação, verifique se todos os campos foram preenchidos corretamente';
        document.getElementById('modal_btn').innerHTML = 'Voltar e Corrigir';
        document.getElementById('modal_btn').className = 'btn btn-danger';

      //JQUERY
        $('#modalRegistraDespesa').modal('show');
    }
    
}

