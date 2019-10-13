function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    
        // Разбор str_exp на элементы массива:
        // ["знак", уровень]
        // уровень =  0 - операнд, 1 - +/-, 2 - *//, 10... - уровень вложенности скобок -1 - ошибка
        expr=String(expr)+"~";
        var calc_arr = [];
        var dig_is = false;
        var dig_val = 0;
        var bracket_level = 10;
        for (var i=0; i<expr.length; i++) {
            if (expr[i]>="0" && expr[i]<="9") {   // это цифра?
                dig_is = true;
                dig_val = dig_val*10+Number(expr[i])
            } else {
                if (dig_is) {
                    calc_arr.push([dig_val, 0]);
                    dig_val = 0;
                    dig_is = false
                }
            }
            switch (expr[i]) {
                case "+":
                    calc_arr.push(["+", 1])
                    break;
                case "-":
                    calc_arr.push(["-", 1])
                    break;
                case "*":
                    calc_arr.push(["*", 2])
                    break;
                case "/":
                    calc_arr.push(["/", 2])
                    break;
                case "(":
                    calc_arr.push(["(", bracket_level]);
                    bracket_level++;
                    break;
                case ")":
                    bracket_level--;
                    calc_arr.push([")", bracket_level]);
                    break;
                default:
                    break;
            }
        }
        if (bracket_level!=10) throw ("ExpressionError: Brackets must be paired")
        return(calc1(calc_arr)[0])
        }
        
        function calc1(calc_arr) {
        for (var i=0; i<calc_arr.length; i++) {    //ищем открывающую скобку
            if (calc_arr[i][0]==="(") {
                top:
                for (var j=i+1; j<calc_arr.length; j++) {    // и соответствующую ей закрывающую
                    if (calc_arr[j][1]==calc_arr[i][1]) {
                        calc_arr[i]=calc1(calc_arr.slice(i+1, j));
                        if (calc_arr[i][1]==-1) return (calc_arr[i]);
                        calc_arr.splice(i+1, j-i);
                        break top
                    } 
                }
            }
        }
        // скобок больше нет, выполняем арифметические действия
        // сначала - * и /
        for (i=0; i<calc_arr.length; i++) {
            if (calc_arr[i][0]=="*") {
                calc_arr[i-1][0] = calc_arr[i-1][0]*calc_arr[i+1][0];
                calc_arr.splice(i, 2);
                i--;
            } else if (calc_arr[i][0]=="/") {
                if (calc_arr[i+1][0]==0) throw("TypeError: Division by zero.");
                calc_arr[i-1][0] = calc_arr[i-1][0]/calc_arr[i+1][0];
                calc_arr.splice(i, 2);
                i--;
            }
        }
        // потом - + и -
        for (i=0; i<calc_arr.length; i++) {
            if (calc_arr[i][0]=="+") {
                calc_arr[i-1][0] = calc_arr[i-1][0]+calc_arr[i+1][0];
                calc_arr.splice(i, 2);
                i--;
            } else if (calc_arr[i][0]=="-") {
                calc_arr[i-1][0] = calc_arr[i-1][0]-calc_arr[i+1][0];
                calc_arr.splice(i, 2);
                i--;
            }
        }
        return(calc_arr[0])
        
        }



module.exports = {
    expressionCalculator
}