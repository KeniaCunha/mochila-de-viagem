const form = (document.getElementById("adicionarItem"));
const lista = document.getElementById("lista");

//para juntar o grupo de objetos em um lugar eu crio um array, com esses grupos
// qdo recebe esses dados é preciso transformar eles em valores javascript, usa-se o metodo JSON.parse 
const itens =  JSON.parse(localStorage.getItem("itens")) || []

//no array qdo preciso fazer um loop com o forEach, neste caso eu preciso iterar neste array para criar esses elementos
//forEach() para manter os itens criados na página, mesmo após atualizá-la;
itens.forEach((elemento) => {
    criarElemento(elemento)
})

form.addEventListener("submit", (evento) => {

    //os dados estão sendo enviados p/ a mesma pagina com isso é necessário interromper o comportamento, isto é prevenir o comportamento padrão de tal evento
    evento.preventDefault();

    const nome = evento.target.elements["nome"];

    const quantidade = evento.target.elements["quantidade"]

    //para que uma informação não sobreponha no LocalStorage e possamos griar um grupo de elementos criaremos um objeto:
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    //verificar se tem o item na lista, se o nome do elemento informado é igual ao nome na lista
    const existe = itens.find(elemento => elemento.nome === nome.value)

    console.log(existe)
    //se o nome é encontrado atualizamos o elemento
    if (existe) {
        itemAtual.id = existe.id
        
        atualizarElemento(itemAtual);

        //troca o conteudo do array e passa o localStorage
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
        
    } else {
        //caso contrario, criamos o elemento
        itemAtual.id = itens[itens.length-1] ? (itens[itens.length-1]).id + 1 : 0;

        criarElemento(itemAtual)

        // Insira a variável itemAtual no array itens
        itens.push(itemAtual)

    }


    //como o localStorage só salva um texto precisamos transformar o objeto em texto
    //JSON.stringify transforma em uma string
    localStorage.setItem('itens', JSON.stringify(itens));

    nome.value = ""
    quantidade.value = ""
})



//Função que recebe esses os dados de item e quantidade
function criarElemento(item){

    //criando um elemento lista
    const novoItem = document.createElement('li')

    //criando a classe do elemento criado
    novoItem.classList.add("item")

    //criando um elemento strong
    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade

    //modificamos para adicionar o dataset id dentro do strong
    numeroItem.dataset.id = item.id


    //a interação dos elementos criados como jasvascript, eles são objetos e precisam ser manipulados como objetos atraves do appendchild
    //inserindo um elemento criado dentro do outro
    novoItem.appendChild(numeroItem)

    novoItem.innerHTML += item.nome

    novoItem.appendChild(buttonDeletar(item.id))

    lista.appendChild(novoItem)
    
}

//buscamos o data para atualizar a quantidade
function atualizarElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function buttonDeletar(id){
    const elementoButton = document.createElement('button')

    elementoButton.innerText = "X"

    elementoButton.addEventListener('click', function(){
        deletarElemento(this.parentNode, id)
    })

    return elementoButton
}

function deletarElemento(tag,id){
    tag.remove()
    //remover o item do array
    itens.splice(itens.findIndex(elemento => elemento.id === id),1)

    //JSON.stringify transforma em uma string
    localStorage.setItem('itens', JSON.stringify(itens));
}
    