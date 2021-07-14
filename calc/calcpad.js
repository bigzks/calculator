const button = window.document.getElementsByClassName("number")
const sign = window.document.getElementsByClassName("sign")

const text = window.document.getElementById("display_text")
const previous_text = window.document.getElementById("previous_text")

var just_calculated = false
var broke = false

// new number
for (let i = 0; i < button.length; i++){

   
    button[i].addEventListener('click', function(){   

        if ((text.innerText == "0") || (text.innerText == 'error') || (just_calculated == true) || (text.innerText[text.innerText.length - 1] == "'")){

            text.innerText = this.value

            just_calculated = false
        }

        else {
            text.innerText += this.value
        }
    })    
}

// clean e
window.document.getElementById("ce").addEventListener('click', function(){
    text.innerText = text.innerText.slice(0, -1)

    if ((text.innerText == '') || (text.innerText == "erro") || (text.innerText == "I said error '^") || (just_calculated == true)){
        text.innerText = '0'
    }

    // this makes possible cleaning previous number
    else if ((text.innerText == '0') && (previous_text.innerText.length >= 2)){
        text.innerText = previous_text.innerText.slice(0, -1)
        previous_text.innerText = '0'
    }
})

// new sign
for (var i = 0; i < sign.length; i++){

    sign[i].addEventListener('click', function(){

        // if (operator isn't defined yet){ define it }
        if ((previous_text.innerText == '0') && ((text.innerText == 'error') == false)){

            // it makes impossible to put an operator infront of a .
            if (text.innerText[text.innerText.length - 1] == '.' ){
                text.innerText = text.innerText.slice(0, -1)
            }

            previous_text.innerText = text.innerText + this.value
            text.innerText = '0'

            just_calculated = false

        }

        // if (operator is already defined){ change it }
        else if (text.innerText == '0') {
            previous_text.innerText = previous_text.innerText.slice(0, -1) + this.value

            just_calculated = false

        }

        // if (operator is defined and second number is also defined){ calculate }
        else if ((text.innerText == 'error') == false){
            previous_text.innerText = calculate(previous_text.innerText, text.innerText) + this.value
            text.innerText = '0'

            just_calculated = true
        }

        // it makes impossible to calculate error
        if (text.innerText == 'error') {
            text.innerText = "I said error '^'"
            previous_text.innerText = "0"

            just_calculated = false
        }
    })
}

// dot
window.document.getElementById('dot').addEventListener('click', function(){

    // impossible to convert to a decimal, or it's already done
    if (text.innerText.indexOf('.') > 0){
        console.log('error(decimals)')
    }

    else if (text.innerText.indexOf('.') == -1){
        text.innerText += '.'

        just_calculated = false
    }
    
    else if (text.innerText == 'error' || text.innerText[text.innerText.length - 1] == "'"){
        text.innerText = '0.'
    }
})

// equals
window.document.getElementById('equals').addEventListener('click', function(){

    // birthday easter egg
    if ((previous_text.innerText == '26/') && (text.innerText == '9')){

        // adding the div
        let html = document.createElement('div')
        html.id = "birthday"
        html.innerText = 'This is my birthday :3 (september 26)'

        document.body.appendChild(html)
        
        // adding the style sheet
        let css = 'div#birthday{background-color: rgb(66, 66, 66); width: 200px; height: 90px; position: absolute; left: 50px; top: 27%;padding: 90px;text-align: center;border-radius: 12px;font: 28px normal Arial;',
        head = document.head,
        style = document.createElement('style');

        head.appendChild(style);

        style.type = 'text/css';
        if (style.styleSheet){
        style.styleSheet.cssText = css;
        } else {
        style.appendChild(document.createTextNode(css));
        }
    }

    // calculate()
    text.innerText = calculate(previous_text.innerText, text.innerText)
    previous_text.innerText = '0'

    just_calculated = true

    // broke calculator easter egg (infinity)
    if ((text.innerText == "Infinity")){
        previous_text.innerText = '0'
        text.innerText = 'I feel weird...'
        for (let i = 1; i < button.length; i++){
            
            button[i].value += Math.floor((button[i].value + 1)/2)
            broke = false
        }
    }

   
})

