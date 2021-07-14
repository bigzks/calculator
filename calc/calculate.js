function calculate(a, b){
    const symbol = a[a.length - 1]
    const anum = parseFloat(a.slice(0, -1))
    const bnum = parseFloat(b)
    var res
    if (a == '0')
        return b

    switch(symbol){
        case '-':
            res = anum - bnum;
            break;
        
        case '+':
            res = anum + bnum;
            break;

        case '/':
            res = anum / bnum;
            break;
        
        case '*':
            res = anum * bnum;
            break;

        default:
            res = 'error'
    }
    return res
}