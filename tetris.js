function tetris() {

    var table = {};

    for (var i = 0; i < 19; i++) {
        table[i] = [];
        for (var j = 0; j < 10; j++) {
            table[i].push(' ');
        }
    }

    var level = 1;
    var score = 0;
    var speed = 500;
    var nextForm = randomFigure();
    var currentRow = 3;
    var currentCol = 4;
    var currentStatus = 0;
    var movePos = 'down';
    var currentForm = nextForm;

    (function () {
        var i = 0;

        function stop() {
            clearTimeout(i);
        }

        function start() {
            i = setInterval(function () {
                if (currentRow != 18 && canMove(currentForm, currentRow, currentCol, currentStatus, movePos)) {
                    moveCurrent(currentForm, currentRow, currentCol, currentStatus, movePos);
                    draw();
                    currentRow++;
                }
                else {
                    if (isOver(currentForm, currentRow, currentCol, currentStatus)) {
                        document.getElementById("over").style.display = "block";
                        document.getElementById("finalScore").innerText = "Your score is : " + score;
                        document.getElementById("finalLevel").innerText = "Your level is : " + level;
                        tetris().stop();
                    }
                    else {
                        freezeCurrent(currentForm, currentRow, currentCol, currentStatus);
                        rowIsFull(currentRow);
                        nextForm = randomFigure();
                        placeNext(nextForm);
                        currentForm = nextForm;
                        currentRow = 3;
                        currentCol = 4;
                        currentStatus = 0;
                        movePos = 'down';
                        moveCurrent(currentForm, currentRow, currentCol, currentStatus, movePos);
                        draw();
                        updateScore();
                        updateLevel();
                    }
                }
            }, speed);
        }

        function timed() {
            document.getElementById("input").value++;
            start();
        }

        window.stop = stop;
        window.start = start;
    })();

    document.onkeydown = function (e) {
        switch (e.keyCode) {
            case 37:
                if (canMove(currentForm, currentRow, currentCol, currentStatus, 'left')) {
                    moveCurrent(currentForm, currentRow, currentCol, currentStatus, 'left');
                    draw();
                    currentCol--;
                }
                break;
            case 38:
                if (canTurn(currentForm, currentRow, currentCol, currentStatus)) {
                    figureTurn(currentForm, currentRow, currentCol, currentStatus);
                    draw();
                    if (currentStatus == 3) {
                        currentStatus = 0;
                    }
                    else {
                        currentStatus++;
                    }
                }
                break;
            case 39:
                if (canMove(currentForm, currentRow, currentCol, currentStatus, 'right')) {
                    moveCurrent(currentForm, currentRow, currentCol, currentStatus, 'right');
                    draw();
                    currentCol++;
                }
                break;
            case 40:
                if (canMove(currentForm, currentRow, currentCol, currentStatus, 'down')) {
                    moveCurrent(currentForm, currentRow, currentCol, currentStatus, 'down');
                    draw();
                    currentRow++;
                }
                break;
        }
    };

    function randomFigure() {
        var figures = ['I', 'S', 'Z', 'O', 'L', 'J', 'T'];
        return figures[Math.round(Math.random() * 6)];
    }

    function placeNext(nextForm) {
        switch (nextForm) {
            case 'I':
                for (var i = 0; i < 4; i++) {
                    table[3 - i][4] = 'I';
                }
                ;
                break;
            case 'S':
                table[3][4] = 'S';
                table[3][3] = 'S';
                table[4][3] = 'S';
                table[4][2] = 'S';
                break;
            case 'Z':
                table[3][4] = 'Z';
                table[3][3] = 'Z';
                table[2][3] = 'Z';
                table[2][2] = 'Z';
                break;
            case 'L':
                table[3][4] = 'L';
                table[3][3] = 'L';
                table[2][3] = 'L';
                table[1][3] = 'L';
                break;
            case 'J':
                table[3][4] = 'J';
                table[2][4] = 'J';
                table[1][4] = 'J';
                table[3][3] = 'J';
                break;
            case 'O':
                table[3][4] = 'O';
                table[3][3] = 'O';
                table[2][4] = 'O';
                table[2][3] = 'O';
                break;
            case 'T':
                table[2][4] = 'T';
                table[3][3] = 'T';
                table[2][3] = 'T';
                table[2][2] = 'T';
                break;
            default:
                ;
                break;
        }
    }

    function isOver(form, row, col, status, pos) {
        switch (form) {
            case 'I':
                if (status == 0 || status == 2) {
                    if (row < 7) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else if (status == 1 || status == 3) {
                    if (row < 4) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                ;
                break;
            case 'S':
                if (status == 0 || status == 2) {
                    if (row < 5) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else if (status == 1 || status == 3) {
                    if (row < 6) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                ;
                break;
            case 'Z':
                if (status == 0 || status == 2) {
                    if (row < 5) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else if (status == 1 || status == 3) {
                    if (row < 6) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                ;
                break;
            case 'L':
                if (status == 0 || status == 2) {
                    if (row < 6) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else if (status == 1 || status == 3) {
                    if (row < 5) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                ;
                break;
            case 'J':
                if (status == 0 || status == 2) {
                    if (row < 6) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else if (status == 1 || status == 3) {
                    if (row < 5) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                ;
                break;
            case 'O':
                if (row < 5) {
                    return true;
                }
                else {
                    return false;
                }
                break;
            case 'T':
                if (status == 0 || status == 2) {
                    if (row < 5) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else if (status == 1 || status == 3) {
                    if (row < 6) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                ;
                break;
            default:
                ;
                break;
        }
    }

    function freezeCurrent(form, row, col, status) {
        switch (form) {
            case 'I':
                if (status == 0 || status == 2) {
                    table[row][col] = 'B';
                    table[row - 1][col] = 'B';
                    table[row - 2][col] = 'B';
                    table[row - 3][col] = 'B';
                }
                else if (status == 1 || status == 3) {
                    table[row][col] = 'B';
                    table[row][col - 1] = 'B';
                    table[row][col - 2] = 'B';
                    table[row][col - 3] = 'B';
                }
                ;
                break;
            case 'S':
                if (status == 0 || status == 2) {
                    table[row - 1][col] = 'B';
                    table[row - 1][col - 1] = 'B';
                    table[row][col - 1] = 'B';
                    table[row][col - 2] = 'B';
                }
                else if (status == 1 || status == 3) {
                    table[row][col] = 'B';
                    table[row - 1][col] = 'B';
                    table[row - 1][col - 1] = 'B';
                    table[row - 2][col - 1] = 'B';
                }
                ;
                break;
            case 'Z':
                if (status == 0 || status == 2) {
                    table[row - 1][col - 2] = 'B';
                    table[row - 1][col - 1] = 'B';
                    table[row][col - 1] = 'B';
                    table[row][col] = 'B';
                }
                else if (status == 1 || status == 3) {
                    table[row - 1][col] = 'B';
                    table[row - 2][col] = 'B';
                    table[row][col - 1] = 'B';
                    table[row - 1][col - 1] = 'B';
                }
                ;
                break;
            case 'L':
                if (status == 0) {
                    table[row][col] = 'B';
                    table[row][col - 1] = 'B';
                    table[row - 1][col - 1] = 'B';
                    table[row - 2][col - 1] = 'B';
                }
                else if (status == 1) {
                    table[row][col] = 'B';
                    table[row][col - 1] = 'B';
                    table[row][col - 2] = 'B';
                    table[row - 1][col] = 'B';
                }
                else if (status == 2) {
                    table[row - 2][col - 1] = 'B';
                    table[row][col] = 'B';
                    table[row - 1][col] = 'B';
                    table[row - 2][col] = 'B';
                }
                else if (status == 3) {
                    table[row - 1][col] = 'B';
                    table[row - 1][col - 1] = 'B';
                    table[row - 1][col - 2] = 'B';
                    table[row][col - 2] = 'B';
                }
                ;
                break;
            case 'J':
                if (status == 0) {
                    table[row][col] = 'B';
                    table[row][col - 1] = 'B';
                    table[row - 1][col] = 'B';
                    table[row - 2][col] = 'B';
                }
                else if (status == 1) {
                    table[row][col] = 'B';
                    table[row][col - 1] = 'B';
                    table[row][col - 2] = 'B';
                    table[row - 1][col - 2] = 'B';
                }
                else if (status == 2) {
                    table[row - 2][col] = 'B';
                    table[row][col - 1] = 'B';
                    table[row - 1][col - 1] = 'B';
                    table[row - 2][col - 1] = 'B';
                }
                else if (status == 3) {
                    table[row - 1][col] = 'B';
                    table[row - 1][col - 1] = 'B';
                    table[row - 1][col - 2] = 'B';
                    table[row][col] = 'B';
                }
                ;
                break;
            case 'O':
                table[row][col] = 'B';
                table[row][col - 1] = 'B';
                table[row - 1][col] = 'B';
                table[row - 1][col - 1] = 'B';
                break;
            case 'T':
                if (status == 0) {
                    table[row - 1][col] = 'B';
                    table[row][col - 1] = 'B';
                    table[row - 1][col - 1] = 'B';
                    table[row - 1][col - 2] = 'B';
                }
                else if (status == 1) {
                    table[row][col] = 'B';
                    table[row - 1][col] = 'B';
                    table[row - 2][col] = 'B';
                    table[row - 1][col - 1] = 'B';
                }
                else if (status == 2) {
                    table[row][col] = 'B';
                    table[row][col - 1] = 'B';
                    table[row][col - 2] = 'B';
                    table[row - 1][col - 1] = 'B';
                }
                else if (status == 3) {
                    table[row][col - 1] = 'B';
                    table[row - 1][col - 1] = 'B';
                    table[row - 2][col - 1] = 'B';
                    table[row - 1][col] = 'B';
                }
                ;
                break;
            default:
                ;
                break;
        }
    }

    function draw() {
        for (var row = 4; row < 19; row++) {
            for (var col = 0; col < 10; col++) {
                var rowPos = "row" + (row - 3);
                document.getElementById(rowPos.toString()).children[col].style.backgroundColor = "white";
            }
        }
        for (var row = 4; row < 19; row++) {
            for (var col = 0; col < 10; col++) {
                var rowPos = "row" + (row - 3);
                console.log(1);
                switch (table[row][col]) {
                    case 'I':
                        document.getElementById(rowPos.toString()).children[col].style.backgroundColor = "red";
                        break;
                    case 'S':
                        document.getElementById(rowPos.toString()).children[col].style.backgroundColor = "blue";
                        break;
                    case 'Z':
                        document.getElementById(rowPos.toString()).children[col].style.backgroundColor = "green";
                        break;
                    case 'O':
                        document.getElementById(rowPos.toString()).children[col].style.backgroundColor = "yellow";
                        break;
                    case 'L':
                        document.getElementById(rowPos.toString()).children[col].style.backgroundColor = "purple";
                        break;
                    case 'J':
                        document.getElementById(rowPos.toString()).children[col].style.backgroundColor = "cyan";
                        break;
                    case 'T':
                        document.getElementById(rowPos.toString()).children[col].style.backgroundColor = "brown";
                        break;
                    case 'B':
                        document.getElementById(rowPos.toString()).children[col].style.backgroundColor = "black";
                        break;
                    default:
                        ;
                        break;
                }
            }
        }
    }

    function canMove(form, row, col, status, pos) {
        switch (form) {
            case 'I':
                if (pos == 'down' && currentRow < 18) {
                    if ((status == 0 || status == 2)) {
                        if (table[row + 1][col] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else if (status == 1 || status == 3) {
                        if (table[row + 1][col] != 'B' && table[row + 1][col - 1] != 'B' && table[row + 1][col - 2] != 'B' && table[row + 1][col - 3] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                }
                else if (pos == 'left') {
                    if ((status == 0 || status == 2) && currentRow < 18) {
                        if (table[row][col - 1] != 'B' && table[row - 1][col - 1] != 'B' && table[row - 2][col - 1] != 'B' && table[row - 3][col - 1] != 'B' && currentCol > 0) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else if (status == 1 || status == 3) {
                        if (table[row - 4][col] != 'B' && currentCol > 3) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                }
                else if (pos == 'right' && currentCol < 9) {
                    if (status == 0 || status == 2) {
                        if (table[row][col + 1] != 'B' && table[row - 1][col + 1] != 'B' && table[row - 2][col + 1] != 'B' && table[row - 3][col + 1] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else if (status == 1 || status == 3) {
                        if (table[row - 4][col] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                }
                ;
                break;
            case 'S':
                if (pos == 'down' && currentRow < 18) {
                    if ((status == 0 || status == 2) && currentRow < 18) {
                        if (table[row][col] != 'B' && table[row + 1][col - 1] != 'B' && table[row + 1][col - 2] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else if ((status == 1 || status == 3) && currentRow < 18) {
                        if (table[row + 1][col] != 'B' && table[row][col - 1] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                }
                else if (pos == 'left') {
                    if ((status == 0 || status == 2) && currentCol > 2) {
                        if (table[row][col - 3] != 'B' && table[row - 1][col - 2] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else if ((status == 1 || status == 3) && currentCol > 1) {
                        if (table[row - 1][col - 2] != 'B' && table[row - 2][col - 2] != 'B' && table[row][col - 1] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                }
                else if (pos == 'right' && currentCol < 9) {
                    if ((status == 0 || status == 2)) {
                        if (table[row][col] != 'B' && table[row - 1][col + 1] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else if ((status == 1 || status == 3)) {
                        if (table[row][col + 1] != 'B' && table[row - 1][col + 1] != 'B' && table[row - 2][col] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                }
                ;
                break;
            case 'Z':
                if (pos == 'down' && currentRow < 18) {
                    if (status == 0 || status == 2) {
                        if (table[row][col - 2] != 'B' && table[row + 1][col - 1] != 'B' && table[row + 1][col] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else if (status == 1 || status == 3) {
                        if (table[row + 1][col - 1] != 'B' && table[row][col] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                }
                else if (pos == 'left') {
                    if ((status == 0 || status == 2) && currentCol > 2) {
                        if (table[row - 1][col - 3] != 'B' && table[row][col - 2] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else if ((status == 1 || status == 3) && currentCol > 1) {
                        if (table[row - 1][col - 2] != 'B' && table[row][col - 2] != 'B' && table[row - 2][col - 1] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                }
                else if (pos == 'right' && currentCol < 9) {
                    if ((status == 0 || status == 2)) {
                        if (table[row][col + 1] != 'B' && table[row - 1][col] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else if ((status == 1 || status == 3)) {
                        if (table[row][col] != 'B' && table[row - 1][col + 1] != 'B' && table[row - 2][col + 1] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                }
                ;
                break;
            case 'L':
                if (pos == 'down' && currentRow < 18) {
                    if (status == 0) {
                        if (table[row + 1][col] != 'B' && table[row + 1][col - 1] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else if (status == 1) {
                        if (table[row + 1][col] != 'B' && table[row + 1][col - 1] != 'B' && table[row + 1][col - 2] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else if (status == 2) {
                        if (table[row + 1][col] != 'B' && table[row - 1][col - 1] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else if (status == 3) {
                        if (table[row + 1][col - 2] != 'B' && table[row][col - 1] != 'B' && table[row][col] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                }
                else if (pos == 'left') {
                    if (status == 0 && currentCol > 1) {
                        if (table[row][col - 2] != 'B' && table[row - 1][col - 2] != 'B' && table[row - 2][col - 2] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else if (status == 1 && currentCol > 2) {
                        if (table[row][col - 3] != 'B' && table[row - 1][col - 1] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else if (status == 2 && currentCol > 1) {
                        if (table[row][col - 1] != 'B' && table[row - 1][col - 1] != 'B' && table[row - 2][col - 2] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else if (status == 3 && currentCol > 2) {
                        if (table[row][col - 3] != 'B' && table[row - 1][col - 3] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                }
                else if (pos == 'right' && currentCol < 9) {
                    if (status == 0) {
                        if (table[row][col + 1] != 'B' && table[row - 1][col] != 'B' && table[row - 2][col] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else if (status == 1) {
                        if (table[row][col + 1] != 'B' && table[row - 1][col + 1] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else if (status == 2) {
                        if (table[row][col + 1] != 'B' && table[row - 1][col + 1] != 'B' && table[row - 2][col + 1] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else if (status == 3) {
                        if (table[row][col - 1] != 'B' && table[row - 1][col + 1] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                }
                ;
                break;
            case 'J':
                if (pos == 'down' && currentRow < 18) {
                    if (status == 0) {
                        if (table[row + 1][col] != 'B' && table[row + 1][col - 1] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else if (status == 1) {
                        if (table[row + 1][col] != 'B' && table[row + 1][col - 1] != 'B' && table[row + 1][col - 2] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else if (status == 2) {
                        if (table[row + 1][col - 1] != 'B' && table[row - 1][col] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else if (status == 3) {
                        if (table[row + 1][col] != 'B' && table[row][col - 1] != 'B' && table[row][col - 2] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                }
                else if (pos == 'left') {
                    if (status == 0 && currentCol > 1) {
                        if (table[row][col - 2] != 'B' && table[row - 1][col - 1] != 'B' && table[row - 2][col - 1] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else if (status == 1 && currentCol > 2) {
                        if (table[row][col - 3] != 'B' && table[row - 1][col - 3] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else if (status == 2 && currentCol > 1) {
                        if (table[row][col - 2] != 'B' && table[row - 1][col - 2] != 'B' && table[row - 1][col - 3] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else if (status == 3 && currentCol > 2) {
                        if (table[row][col - 1] != 'B' && table[row - 1][col - 3] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                }
                else if (pos == 'right' && currentCol < 9) {
                    if (status == 0) {
                        if (table[row][col + 1] != 'B' && table[row - 1][col + 1] != 'B' && table[row - 2][col + 1] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else if (status == 1) {
                        if (table[row][col + 1] != 'B' && table[row - 1][col - 1] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else if (status == 2) {
                        if (table[row][col] != 'B' && table[row - 1][col] != 'B' && table[row - 2][col + 1] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else if (status == 3) {
                        if (table[row][col + 1] != 'B' && table[row - 1][col + 1] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                }
                ;
                break;
            case 'O':
                if (pos == 'down' && currentRow < 18) {
                    if (table[row + 1][col] != 'B' && table[row + 1][col - 1] != 'B') {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else if (pos == 'left') {
                    if (table[row][col - 2] != 'B' && table[row - 1][col - 2] != 'B' && col > 1) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else if (pos == 'right' && currentCol < 9) {
                    if (table[row][col + 1] != 'B' && table[row - 1][col + 1] != 'B') {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                ;
                break;
            case 'T':
                if (pos == 'down' && currentRow < 18) {
                    if (status == 0) {
                        if (table[row + 1][col - 1] != 'B' && table[row][col] != 'B' && table[row][col - 2] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else if (status == 1) {
                        if (table[row + 1][col] != 'B' && table[row][col - 1] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else if (status == 2) {
                        if (table[row + 1][col - 1] != 'B' && table[row + 1][col] != 'B' && table[row + 1][col - 2] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else if (status == 3) {
                        if (table[row + 1][col - 1] != 'B' && table[row][col] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                }
                else if (pos == 'left') {
                    if (status == 0 && currentCol > 2) {
                        if (table[row][col - 2] != 'B' && table[row - 1][col - 3] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else if (status == 1 && currentCol > 1) {
                        if (table[row][col - 1] != 'B' && table[row - 1][col - 2] != 'B' && table[row - 2][col - 1] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    if (status == 2 && currentCol > 2) {
                        if (table[row][col - 3] != 'B' && table[row - 1][col - 2] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else if (status == 3 && currentCol > 1) {
                        if (table[row][col - 2] != 'B' && table[row - 1][col - 2] != 'B' && table[row - 2][col - 2] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                }
                else if (pos == 'right' && currentCol < 9) {
                    if (status == 0) {
                        if (table[row][col] != 'B' && table[row - 1][col + 1] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else if (status == 1) {
                        if (table[row][col + 1] != 'B' && table[row - 1][col + 1] != 'B' && table[row - 2][col + 1] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    if (status == 2) {
                        if (table[row][col + 1] != 'B' && table[row - 1][col] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                    else if (status == 3) {
                        if (table[row][col] != 'B' && table[row - 1][col + 1] != 'B' && table[row - 2][col] != 'B') {
                            return true;
                        }
                        else {
                            return false;
                        }
                    }
                }
                ;
                break;
            default:
                ;
                break;
        }
    }

    function moveCurrent(form, row, col, status, pos) {
        switch (form) {
            case 'I':
                if (pos == 'down') {
                    if (status == 0 || status == 2) {
                        table[row + 1][col] = 'I';
                        table[row - 3][col] = ' ';
                    }
                    else if (status == 1 || status == 3) {
                        table[row + 1][col] = 'I';
                        table[row + 1][col - 1] = 'I';
                        table[row + 1][col - 2] = 'I';
                        table[row + 1][col - 3] = 'I';
                        table[row][col] = '';
                        table[row][col - 1] = '';
                        table[row][col - 2] = '';
                        table[row][col - 3] = '';
                    }
                }
                else if (pos == 'left') {
                    if (status == 0 || status == 2) {
                        table[row][col - 1] = 'I';
                        table[row - 1][col - 1] = 'I';
                        table[row - 2][col - 1] = 'I';
                        table[row - 3][col - 1] = 'I';
                        table[row][col] = ' ';
                        table[row - 1][col] = ' ';
                        table[row - 2][col] = ' ';
                        table[row - 3][col] = ' ';
                    }
                    else if (status == 1 || status == 3) {
                        table[row][col - 4] = 'I';
                        table[row][col] = ' ';
                    }
                }
                else if (pos == 'right') {
                    if (status == 0 || status == 2) {
                        table[row][col + 1] = 'I';
                        table[row - 1][col + 1] = 'I';
                        table[row - 2][col + 1] = 'I';
                        table[row - 3][col + 1] = 'I';
                        table[row][col] = ' ';
                        table[row - 1][col] = ' ';
                        table[row - 2][col] = ' ';
                        table[row - 3][col] = ' ';
                    }
                    else if (status == 1 || status == 3) {
                        table[row][col + 1] = 'I';
                        table[row][col - 3] = ' ';
                    }
                }
                ;
                break;
            case 'S':
                if (pos == 'down') {
                    if (status == 0 || status == 2) {
                        table[row - 1][col] = ' ';
                        table[row][col - 2] = ' ';
                        table[row - 1][col - 1] = ' ';
                        table[row + 1][col - 1] = 'S';
                        table[row + 1][col - 2] = 'S';
                        table[row][col] = 'S';
                    }
                    else if (status == 1 || status == 3) {
                        table[row + 1][col] = 'S';
                        table[row][col - 1] = 'S';
                        table[row - 1][col] = ' ';
                        table[row - 2][col - 1] = ' ';
                    }
                }
                else if (pos == 'left') {
                    if (status == 0 || status == 2) {
                        table[row][col - 3] = 'S';
                        table[row - 1][col - 2] = 'S';
                        table[row][col - 1] = ' ';
                        table[row - 1][col] = ' ';
                    }
                    else if (status == 1 || status == 3) {
                        table[row][col - 1] = 'S';
                        table[row - 1][col - 2] = 'S';
                        table[row - 2][col - 2] = 'S';
                        table[row][col] = ' ';
                        table[row - 1][col] = ' ';
                        table[row - 2][col - 1] = ' ';
                    }
                }
                else if (pos == 'right') {
                    if (status == 0 || status == 2) {
                        table[row][col] = 'S';
                        table[row - 1][col + 1] = 'S';
                        table[row][col - 2] = ' ';
                        table[row - 1][col - 1] = ' ';
                    }
                    else if (status == 1 || status == 3) {
                        table[row - 2][col] = 'S';
                        table[row - 1][col + 1] = 'S';
                        table[row][col + 1] = 'S';
                        table[row][col] = ' ';
                        table[row - 1][col - 1] = ' ';
                        table[row - 2][col - 1] = ' ';
                    }
                }
                ;
                break;
            case 'Z':
                if (pos == 'down') {
                    if (status == 0 || status == 2) {
                        table[row + 1][col] = 'Z';
                        table[row + 1][col - 1] = 'Z';
                        table[row][col - 2] = 'Z';
                        table[row][col] = ' ';
                        table[row - 1][col - 1] = ' ';
                        table[row - 1][col - 2] = ' ';
                    }
                    else if (status == 1 || status == 3) {
                        table[row + 1][col - 1] = 'Z';
                        table[row][col] = 'Z';
                        table[row - 1][col - 1] = ' ';
                        table[row - 2][col] = ' ';
                    }
                }
                else if (pos == 'left') {
                    if (status == 0 || status == 2) {
                        table[row][col - 2] = 'Z';
                        table[row - 1][col - 3] = 'Z';
                        table[row][col] = ' ';
                        table[row - 1][col - 1] = ' ';
                    }
                    else if (status == 1 || status == 3) {
                        table[row][col - 2] = 'Z';
                        table[row - 1][col - 2] = 'Z';
                        table[row - 2][col - 1] = 'Z';
                        table[row][col - 1] = ' ';
                        table[row - 1][col] = ' ';
                        table[row - 2][col] = ' ';
                    }
                }
                else if (pos == 'right') {
                    if (status == 0 || status == 2) {
                        table[row][col + 1] = 'Z';
                        table[row - 1][col] = 'Z';
                        table[row][col - 1] = ' ';
                        table[row - 1][col - 2] = ' ';
                    }
                    else if (status == 1 || status == 3) {
                        table[row][col] = 'Z';
                        table[row - 1][col + 1] = 'Z';
                        table[row - 2][col + 1] = 'Z';
                        table[row][col - 1] = ' ';
                        table[row - 1][col - 1] = ' ';
                        table[row - 2][col] = ' ';
                    }
                }
                ;
                break;
            case 'L':
                if (pos == 'down') {
                    if (status == 0) {
                        table[row + 1][col] = 'L';
                        table[row + 1][col - 1] = 'L';
                        table[row][col] = ' ';
                        table[row - 2][col - 1] = ' ';
                    }
                    else if (status == 1) {
                        table[row + 1][col] = 'L';
                        table[row + 1][col - 1] = 'L';
                        table[row + 1][col - 2] = 'L';
                        table[row][col - 1] = ' ';
                        table[row][col - 2] = ' ';
                        table[row - 1][col] = ' ';
                    }
                    else if (status == 2) {
                        table[row + 1][col] = 'L';
                        table[row - 1][col - 1] = 'L';
                        table[row - 2][col - 1] = ' ';
                        table[row - 2][col] = ' ';
                    }
                    else if (status == 3) {
                        table[row][col] = 'L';
                        table[row][col - 1] = 'L';
                        table[row + 1][col - 2] = 'L';
                        table[row - 1][col - 1] = ' ';
                        table[row - 1][col - 2] = ' ';
                        table[row - 1][col] = ' ';
                    }
                }
                else if (pos == 'left') {
                    if (status == 0) {
                        table[row][col - 2] = 'L';
                        table[row - 1][col - 2] = 'L';
                        table[row - 2][col - 2] = 'L';
                        table[row][col] = ' ';
                        table[row - 1][col - 1] = ' ';
                        table[row - 2][col - 1] = ' ';
                    }
                    else if (status == 1) {
                        table[row][col - 3] = 'L';
                        table[row - 1][col - 1] = 'L';
                        table[row][col] = ' ';
                        table[row - 1][col] = ' ';
                    }
                    else if (status == 2) {
                        table[row][col - 1] = 'L';
                        table[row - 1][col - 1] = 'L';
                        table[row - 2][col - 2] = 'L';
                        table[row][col] = ' ';
                        table[row - 1][col] = ' ';
                        table[row - 2][col] = ' ';
                    }
                    else if (status == 3) {
                        table[row][col - 3] = 'L';
                        table[row - 1][col - 3] = 'L';
                        table[row][col - 2] = ' ';
                        table[row - 1][col] = ' ';
                    }
                }
                else if (pos == 'right') {
                    if (status == 0) {
                        table[row][col + 1] = 'L';
                        table[row - 1][col] = 'L';
                        table[row - 2][col] = 'L';
                        table[row][col - 1] = ' ';
                        table[row - 1][col - 1] = ' ';
                        table[row - 2][col - 1] = ' ';
                    }
                    else if (status == 1) {
                        table[row][col - 2] = ' ';
                        table[row - 1][col] = ' ';
                        table[row][col + 1] = 'L';
                        table[row - 1][col + 1] = 'L';
                    }
                    else if (status == 2) {
                        table[row][col + 1] = 'L';
                        table[row - 1][col + 1] = 'L';
                        table[row - 2][col + 1] = 'L';
                        table[row][col] = ' ';
                        table[row - 1][col] = ' ';
                        table[row - 2][col - 1] = ' ';
                    }
                    else if (status == 3) {
                        table[row][col - 1] = 'L';
                        table[row - 1][col + 1] = 'L';
                        table[row][col - 2] = ' ';
                        table[row - 1][col - 2] = ' ';
                    }
                }
                ;
                break;
            case 'J':
                if (pos == 'down') {
                    if (status == 0) {
                        table[row + 1][col] = 'J';
                        table[row + 1][col - 1] = 'J';
                        table[row][col - 1] = ' ';
                        table[row - 2][col] = ' ';
                    }
                    else if (status == 1) {
                        table[row + 1][col] = 'J';
                        table[row + 1][col - 1] = 'J';
                        table[row + 1][col - 2] = 'J';
                        table[row][col - 1] = ' ';
                        table[row][col] = ' ';
                        table[row - 1][col - 2] = ' ';
                    }
                    else if (status == 2) {
                        table[row + 1][col - 1] = 'J';
                        table[row - 1][col] = 'J';
                        table[row - 2][col - 1] = ' ';
                        table[row - 2][col] = ' ';
                    }
                    else if (status == 3) {
                        table[row + 1][col] = 'J';
                        table[row][col - 1] = 'J';
                        table[row][col - 2] = 'J';
                        table[row - 1][col - 1] = ' ';
                        table[row - 1][col] = ' ';
                        table[row - 1][col - 2] = ' ';
                    }
                }
                else if (pos == 'left') {
                    if (status == 0) {
                        table[row][col - 2] = 'J';
                        table[row - 1][col - 1] = 'J';
                        table[row - 2][col - 1] = 'J';
                        table[row][col] = ' ';
                        table[row - 1][col] = ' ';
                        table[row - 2][col] = ' ';
                    }
                    else if (status == 1) {
                        table[row][col - 3] = 'J';
                        table[row - 1][col - 3] = 'J';
                        table[row][col] = ' ';
                        table[row - 1][col - 2] = ' ';
                    }
                    else if (status == 2) {
                        table[row][col - 2] = 'J';
                        table[row - 1][col - 2] = 'J';
                        table[row - 2][col - 2] = 'J';
                        table[row][col - 1] = ' ';
                        table[row - 1][col - 1] = ' ';
                        table[row - 2][col] = ' ';
                    }
                    else if (status == 3) {
                        table[row][col - 1] = 'J';
                        table[row - 1][col - 3] = 'J';
                        table[row][col] = ' ';
                        table[row - 1][col] = ' ';
                    }
                }
                else if (pos == 'right') {
                    if (status == 0) {
                        table[row][col + 1] = 'J';
                        table[row - 1][col + 1] = 'J';
                        table[row - 2][col + 1] = 'J';
                        table[row - 1][col] = ' ';
                        table[row - 2][col] = ' ';
                        table[row][col - 1] = ' ';
                    }
                    else if (status == 1) {
                        table[row][col + 1] = 'J';
                        table[row - 1][col - 1] = 'J';
                        table[row][col - 2] = ' ';
                        table[row - 1][col - 2] = ' ';
                    }
                    else if (status == 2) {
                        table[row][col] = 'J';
                        table[row - 1][col] = 'J';
                        table[row - 2][col + 1] = 'J';
                        table[row][col - 1] = ' ';
                        table[row - 1][col - 1] = ' ';
                        table[row - 2][col - 1] = ' ';
                    }
                    else if (status == 3) {
                        table[row][col + 1] = 'J';
                        table[row - 1][col + 1] = 'J';
                        table[row][col] = ' ';
                        table[row - 1][col - 2] = ' ';
                    }
                }
                ;
                break;
            case 'O':
                if (pos == 'down') {
                    table[row + 1][col] = 'O';
                    table[row + 1][col - 1] = 'O';
                    table[row - 1][col] = ' ';
                    table[row - 1][col - 1] = ' ';
                }
                else if (pos == 'left') {
                    table[row][col - 2] = 'O';
                    table[row - 1][col - 2] = 'O';
                    table[row][col] = ' ';
                    table[row - 1][col] = ' ';
                }
                else if (pos == 'right') {
                    table[row][col + 1] = 'O';
                    table[row - 1][col + 1] = 'O';
                    table[row][col - 1] = ' ';
                    table[row - 1][col - 1] = ' ';
                }
                ;
                break;
            case 'T':
                if (pos == 'down') {
                    if (status == 0) {
                        table[row + 1][col - 1] = 'T';
                        table[row][col] = 'T';
                        table[row][col - 2] = 'T';
                        table[row - 1][col] = ' ';
                        table[row - 1][col - 1] = ' ';
                        table[row - 1][col - 2] = ' ';
                    }
                    else if (status == 1) {
                        table[row + 1][col] = 'T';
                        table[row][col - 1] = 'T';
                        table[row - 1][col - 1] = ' ';
                        table[row - 2][col] = ' ';
                    }
                    else if (status == 2) {
                        table[row + 1][col - 1] = 'T';
                        table[row + 1][col] = 'T';
                        table[row + 1][col - 2] = 'T';
                        table[row - 1][col - 1] = ' ';
                        table[row][col] = ' ';
                        table[row][col - 2] = ' ';
                    }
                    else if (status == 3) {
                        table[row + 1][col - 1] = 'T';
                        table[row][col] = 'T';
                        table[row - 1][col] = ' ';
                        table[row - 2][col - 1] = ' ';
                    }
                }
                else if (pos == 'left') {
                    if (status == 0) {
                        table[row][col - 2] = 'T';
                        table[row - 1][col - 3] = 'T';
                        table[row][col - 1] = ' ';
                        table[row - 1][col] = ' ';
                    }
                    else if (status == 1) {
                        table[row][col - 1] = 'T';
                        table[row - 1][col - 2] = 'T';
                        table[row - 2][col - 1] = 'T';
                        table[row][col] = ' ';
                        table[row - 1][col] = ' ';
                        table[row - 2][col] = ' ';
                    }
                    else if (status == 2) {
                        table[row][col - 3] = 'T';
                        table[row - 1][col - 2] = 'T';
                        table[row][col] = ' ';
                        table[row - 1][col - 1] = ' ';
                    }
                    else if (status == 3) {
                        table[row][col - 2] = 'T';
                        table[row - 1][col - 2] = 'T';
                        table[row - 2][col - 2] = 'T';
                        table[row][col - 1] = ' ';
                        table[row - 1][col] = ' ';
                        table[row - 2][col - 1] = ' ';
                    }
                }
                else if (pos == 'right') {
                    if (status == 0) {
                        table[row][col] = 'T';
                        table[row - 1][col + 1] = 'T';
                        table[row][col - 1] = ' ';
                        table[row - 1][col - 2] = ' ';
                    }
                    else if (status == 1) {
                        table[row][col + 1] = 'T';
                        table[row - 1][col + 1] = 'T';
                        table[row - 2][col + 1] = 'T';
                        table[row][col] = ' ';
                        table[row - 1][col - 1] = ' ';
                        table[row - 2][col] = ' ';
                    }
                    else if (status == 2) {
                        table[row][col + 1] = 'T';
                        table[row - 1][col] = 'T';
                        table[row][col - 2] = ' ';
                        table[row - 1][col - 1] = ' ';
                    }
                    else if (status == 3) {
                        table[row][col] = 'T';
                        table[row - 1][col + 1] = 'T';
                        table[row - 2][col] = 'T';
                        table[row][col - 1] = ' ';
                        table[row - 1][col - 1] = ' ';
                        table[row - 2][col - 1] = ' ';
                    }
                }
                ;
                break;
            default:
                ;
                break;
        }
    }

    function figureTurn(form, row, col, status) {
        switch (form) {
            case 'I':
                if (status == 0 || status == 2) {
                    table[row][col - 1] = 'I';
                    table[row][col - 2] = 'I';
                    table[row][col - 3] = 'I';
                    table[row - 1][col] = ' ';
                    table[row - 2][col] = ' ';
                    table[row - 3][col] = ' ';
                }
                else if (status == 1 || status == 3) {
                    table[row][col - 1] = ' ';
                    table[row][col - 2] = ' ';
                    table[row][col - 3] = ' ';
                    table[row - 1][col] = 'I';
                    table[row - 2][col] = 'I';
                    table[row - 3][col] = 'I';
                }
                ;
                break;
            case 'S':
                if (status == 0 || status == 2) {
                    table[row][col] = 'S';
                    table[row - 2][col - 1] = 'S';
                    table[row][col - 1] = ' ';
                    table[row][col - 2] = ' ';
                }
                else if (status == 1 || status == 3) {
                    table[row][col] = ' ';
                    table[row - 2][col - 1] = ' ';
                    table[row][col - 1] = 'S';
                    table[row][col - 2] = 'S';
                }
                ;
                break;
            case 'Z':
                if (status == 0 || status == 2) {
                    table[row - 1][col] = 'Z';
                    table[row - 2][col] = 'Z';
                    table[row - 1][col - 2] = ' ';
                    table[row][col] = ' ';
                }
                else if (status == 1 || status == 3) {
                    table[row - 1][col] = ' ';
                    table[row - 2][col] = ' ';
                    table[row - 1][col - 2] = 'Z';
                    table[row][col] = 'Z';
                }
                ;
                break;
            case 'L':
                if (status == 0) {
                    table[row][col - 2] = 'L';
                    table[row - 1][col] = 'L';
                    table[row - 1][col - 1] = ' ';
                    table[row - 2][col - 1] = ' ';
                }
                else if (status == 1) {
                    table[row - 2][col - 1] = 'L';
                    table[row - 2][col] = 'L';
                    table[row][col - 1] = ' ';
                    table[row][col - 2] = ' ';
                }
                else if (status == 2) {
                    table[row][col - 2] = 'L';
                    table[row - 1][col - 2] = 'L';
                    table[row - 1][col - 1] = 'L';
                    table[row][col] = ' ';
                    table[row - 2][col - 1] = ' ';
                    table[row - 2][col] = ' ';
                }
                else if (status == 3) {
                    table[row][col] = 'L';
                    table[row][col - 1] = 'L';
                    table[row - 2][col - 1] = 'L';
                    table[row - 1][col] = ' ';
                    table[row - 1][col - 2] = ' ';
                    table[row][col - 2] = ' ';
                }
                ;
                break;
            case 'J':
                if (status == 0) {
                    table[row][col - 2] = 'J';
                    table[row - 1][col - 2] = 'J';
                    table[row - 1][col] = ' ';
                    table[row - 2][col] = ' ';
                }
                else if (status == 1) {
                    table[row - 1][col - 1] = 'J';
                    table[row - 2][col - 1] = 'J';
                    table[row - 2][col] = 'J';
                    table[row][col] = ' ';
                    table[row - 1][col - 2] = ' ';
                    table[row][col - 2] = ' ';
                }
                else if (status == 2) {
                    table[row][col] = 'J';
                    table[row - 1][col] = 'J';
                    table[row - 1][col - 2] = 'J';
                    table[row][col - 1] = ' ';
                    table[row - 2][col - 1] = ' ';
                    table[row - 2][col] = ' ';
                }
                else if (status == 3) {
                    table[row][col - 1] = 'J';
                    table[row - 2][col] = 'J';
                    table[row - 1][col - 1] = ' ';
                    table[row - 1][col - 2] = ' ';
                }
                ;
                break;
                break;
            case 'O':
                break;
            case 'T':
                if (status == 0) {
                    table[row][col] = 'T';
                    table[row - 2][col] = 'T';
                    table[row][col - 1] = ' ';
                    table[row - 1][col - 2] = ' ';
                }
                else if (status == 1) {
                    table[row][col - 1] = 'T';
                    table[row][col - 2] = 'T';
                    table[row - 1][col] = ' ';
                    table[row - 2][col] = ' ';
                }
                else if (status == 2) {
                    table[row - 1][col] = 'T';
                    table[row - 2][col - 1] = 'T';
                    table[row][col] = ' ';
                    table[row][col - 2] = ' ';
                }
                else if (status == 3) {
                    table[row - 2][col - 1] = ' ';
                    table[row - 1][col - 2] = 'T';
                }
                ;
                break;
            default:
                ;
                break;
        }
    }

    function canTurn(form, row, col, status) {
        switch (form) {
            case 'I':
                if ((status == 0 || status == 2) && currentCol > 2) {
                    if (table[row][col - 1] != 'B' && table[row][col - 2] != 'B' && table[row][col - 3] != 'B') {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else if (status == 1 || status == 3) {
                    if (table[row - 1][col] != 'B' && table[row - 2][col] != 'B' && table[row - 3][col] != 'B') {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                ;
                break;
            case 'S':
                if (status == 0 || status == 2) {
                    if (table[row][col] != 'B' && table[row - 2][col - 1] != 'B') {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else if ((status == 1 || status == 3) && currentCol > 1) {
                    if (table[row][col - 1] != 'B' && table[row][col - 2] != 'B') {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                ;
                break;
            case 'Z':
                if (status == 0 || status == 2) {
                    if (table[row][col - 1] != 'B' && table[row - 2][col] != 'B') {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else if ((status == 1 || status == 3) && currentCol > 1) {
                    if (table[row][col] != 'B' && table[row - 1][col - 2] != 'B') {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                ;
                break;
            case 'L':
                if (status == 0 && currentCol > 1) {
                    if (table[row][col - 2] != 'B' && table[row - 1][col] != 'B') {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else if (status == 1) {
                    if (table[row - 2][col] != 'B' && table[row - 2][col - 1] != 'B') {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else if (status == 2 && currentCol > 1) {
                    if (table[row][col - 2] != 'B' && table[row - 1][col - 2] != 'B' && table[row - 1][col - 1] != 'B') {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else if (status == 3) {
                    if (table[row][col] != 'B' && table[row][col - 1] != 'B' && table[row - 2][col - 1] != 'B') {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                ;
                break;
            case 'J':
                if (status == 0 && currentCol > 1) {
                    if (table[row][col - 2] != 'B' && table[row - 1][col - 2] != 'B') {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else if (status == 1) {
                    if (table[row - 1][col - 1] != 'B' && table[row - 2][col - 1] != 'B' && table[row - 2][col] != 'B') {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else if (status == 2 && currentCol > 1) {
                    if (table[row][col] != 'B' && table[row - 1][col] != 'B' && table[row - 1][col - 2] != 'B') {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else if (status == 3) {
                    if (table[row][col - 1] != 'B' && table[row - 2][col] != 'B') {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                ;
                break;
            case 'O':
                return true;
                break;
            case 'T':
                if (status == 0) {
                    if (table[row][col] != 'B' && table[row - 2][col] != 'B') {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else if (status == 1 && currentCol > 1) {
                    if (table[row][col - 1] != 'B' && table[row][col - 2] != 'B') {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else if (status == 2) {
                    if (table[row - 1][col] != 'B' && table[row - 2][col - 1] != 'B') {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else if (status == 3 && currentCol > 1) {
                    if (table[row][col - 1] != 'B' && table[row - 1][col - 2] != 'B') {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                ;
                break;
            default:
                ;
                break;
        }
    }

    function rowIsFull(row) {
        var affectedRows = [];
        var row1 = table[row - 3].join('');
        var row2 = table[row - 2].join('');
        var row3 = table[row - 1].join('');
        var row4 = table[row].join('');
        if (row1 === 'BBBBBBBBBB') {
            affectedRows.push(row - 3);
        }
        if (row2 === 'BBBBBBBBBB') {
            affectedRows.push(row - 2);
        }
        if (row3 === 'BBBBBBBBBB') {
            affectedRows.push(row - 1);
        }
        if (row4 === 'BBBBBBBBBB') {
            affectedRows.push(row);
        }
        switch (affectedRows.length) {
            case 1:
                score += 10;
                break;
            case 2:
                score += 20;
                break;
            case 3:
                score += 35;
                break;
            case 4:
                score += 50;
                break;
            default :
                break;
        }
        deleteRows(affectedRows);
        affectedRows = [];
    }

    function deleteRows(arr) {
        if (arr.length != 0) {
            for (var rowsAff = 0; rowsAff < arr.length; rowsAff++) {
                table[arr[rowsAff]] = [];
                for (var row = arr[rowsAff]; row > 4; row--) {
                    table[row] = table[row - 1].concat();
                    ;
                }
            }
            for (var i = 0; i < 4; i++) {
                table[i] = [];
                for (var j = 0; j < 10; j++) {
                    table[i].push(' ');
                }
            }
        }
        currentRow = currentRow = arr.length;
    }

    function updateLevel() {
        if (score > 100 && level == 1) {
            level = 2;
            speed = 450;
        }
        if (score > 200 && level == 2) {
            level = 3;
            speed = 400;
        }
        if (score > 300 && level == 3) {
            level = 4;
            speed = 350;
        }
        if (score > 400 && level == 4) {
            level = 5;
            speed = 300;
        }
        if (score > 500 && level == 5) {
            level = 6;
            speed = 250;
        }
        if (score > 600 && level == 6) {
            level = 7;
            speed = 200;
        }
        document.getElementById('level').innerText = "Level: " + level;
    }

    function updateScore() {
        document.getElementById('score').innerText = "Score: " + score;
    }
}
tetris();