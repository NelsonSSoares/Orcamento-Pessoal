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
        localStorage.setItem('id', id );

    }
    recuperarTodosRegistros(){
        //array de despesas
        let despesas = Array()

       let id = localStorage.getItem('id')
        //recupera todas as depesas cadastradas em localstorage
       for(let i = 1; i<= id; i++){
            //recuperar a despesaa
            let despesa = JSON.parse(localStorage.getItem(i))
            //se existir indices removidos null
            if(despesa == null){
                continue //avança/ignora indices null dentro de um laço
            }
            despesas.push(despesa)
            
            //passa as despesas para o array em forma de objeto literal
       }
       return despesas;
    }

    pesquisar(despesa){
        // metodo que pesquisa e filtra
        let despesasFiltradas = Array()
        // metodo filter nao altera o valor original do array, portanto é necessario atribuir ele a ele mesmo
        despesasFiltradas =  this.recuperarTodosRegistros()
        if(despesa.ano != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }

        if(despesa.mes != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }
        
        if(despesa.dia != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }

        
        if(despesa.tipo != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }
        
        if(despesa.descricao != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }
        
        if(despesa.valor != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }

        return despesasFiltradas;
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
        //recuperando variaveis e zerando valores apos gravar
        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''

    
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

function carregaListaDespesa(despesas = Array()){
    if(despesas.length == 0){
        despesas = bd.recuperarTodosRegistros();
    }
    //selecionando o elemento tbody da tabela
    let listaDespesas = document.getElementById('listaDespesas');
    listaDespesas.innerHTML = ''
    /*
             <tr>
                <td>Data</th>
                <td>Tipo</th>
                <td>Descrição</th>
                <td>Valor</th>
                <td></th>
              </tr>
        
    */
   //percorrer o array despesas, listando cada despesa de forma dinamica
    despesas.forEach(function(d) {
        //criando linha (tr)
        let linha = listaDespesas.insertRow()

        //criar coluna (td)
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
         // ajustar tipo
         switch(d.tipo){
            case '1' : d.tipo = 'Alimentação'
            break;
            case '2' : d.tipo = 'Educação'
            break;
            case '3' : d.tipo = 'Lazer'
            break;
            case '4' : d.tipo = 'Saude'
            break;
            case '5' : d.tipo = 'Transporte'
            break;
        }
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor
        
    })
}
// PESQUISA E FILTRO VIEW E DATABASE

function pesquisarDespesa(){
    let ano = document.getElementById('ano').value;
    let mes = document.getElementById('mes').value;
    let dia = document.getElementById('dia').value;
    let tipo = document.getElementById('tipo').value;
    let descricao = document.getElementById('descricao').value;
    let valor = document.getElementById('valor').value;

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    let despesas = bd.pesquisar(despesa)

    this.carregaListaDespesa(despesas)
}
