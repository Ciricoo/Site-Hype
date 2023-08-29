if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready()
}

var valorTotal = ''

function ready(){
    const cartRemove = document.getElementsByClassName("cart-remover")
    for(var i=0;i<cartRemove.length;i++){
        cartRemove[i].addEventListener("click", removeProducts)
    }

    const quanittyinputs = document.getElementsByClassName("qtd")
    for (var i=0;i<quanittyinputs.length;i++){
        quanittyinputs[i].addEventListener("change", chackInputQauntidade)
    }

    const buttonAddCart = document.getElementsByClassName("addCart")
    for (var i=0;i<buttonAddCart.length;i++) {
        buttonAddCart[i].addEventListener("click", addProduct)
    }

    const purshasebutton = document.querySelector("body > main > div.finish > button")
    purshasebutton.addEventListener("click", makePurchase)
}

function makePurchase(){
    if(valorTotal == ""){
        alert('Seu carrinho esta vazio!!')
    }else{
        alert(`
            Obrigado pela sua  compra!
            Valor do pedido: R$${valorTotal}
            Volte sempre :)
        `)
    }

    document.querySelector("body > main > main > div.list").innerHTML = ""
    atualiza()
}

function removeProducts(event){
    event.target.parentElement.parentElement.remove()
    atualiza()
}

function atualiza(){
    const precos = document.getElementsByClassName("cart-price")
    const qtd = document.getElementsByClassName("qtd")
    valorTotal = 0;
    for(var i=0;i<precos.length;i++){
        var pegaValor = parseFloat(precos[i].innerHTML.replace("R$", "").replace(",","."));
        console.log(pegaValor)
        if(qtd[i].value < 1){
            qtd[i].addEventListener("change", removeProducts)
        }
        else{
        valorTotal += pegaValor*qtd[i].value
        }

    }
    document.querySelector("body > main > div.finish > div > h3").innerHTML = `Valor total: R$${valorTotal.toFixed(2)}`
}

function addProduct(event){
    const button = event.target
    const productInfo = button.parentElement.parentElement.parentElement
    const productInfoElementImage = productInfo.getElementsByClassName("image-Product")[0].src
    const productInfoElementName = productInfo.getElementsByClassName("name-product")[0].innerHTML
    const  productInfoElementPrice = productInfo.getElementsByClassName("price-product")[0].innerHTML
    
    const productInfoElementsNames = productInfo.parentElement.parentElement.getElementsByClassName("cart-name")
    for (var i=0;i<productInfoElementsNames.length;i++){
       if(productInfoElementsNames[i].innerHTML === productInfoElementName){
            productInfoElementsNames[i].parentElement.parentElement.getElementsByClassName("qtd")[0].value++
            atualiza()
            alert(`
                Produto já existe no carrinho
                Acrescentado mais 1 a quantidade do Produto
                Quantidade atual do produto: ${document.getElementsByClassName("qtd")[0].value++}
                
            `)
            document.getElementsByClassName("qtd")[0].value -=1

            return
        }
    }
    
    let newProductAdd = document.createElement("div")
    newProductAdd.classList.add("list")

    newProductAdd.innerHTML = 
    `
        <div class="cart-image"><img src="${productInfoElementImage}" class="image-cart" alt="" width="150px" height="auto"></div>
        <div><h1 class="cart-name">${productInfoElementName}</h1></div>
        <div><h1 class="cart-price">${productInfoElementPrice}</h1></div>
        <div><input type="number" class="qtd" value="1" min="0"></div>
        <button class="cart-remover"><H3>REMOVER</H3></button>
    `

    alert('Produto adicionado')

    const body = document.querySelector("body > main > main > div.list")

    body.append(newProductAdd)



    newProductAdd.getElementsByClassName("qtd")[0].addEventListener("change", chackInputQauntidade)
    newProductAdd.getElementsByClassName("cart-remover")[0].addEventListener("click", removeProducts)
    
    atualiza()
}

function chackInputQauntidade(event) {
    if(event.target.value == "0"){
        event.target.parentElement.parentElement.remove()
    }

    
    atualiza()
}
