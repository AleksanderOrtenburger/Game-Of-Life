document.addEventListener('DOMContentLoaded', function (event) {
    function GameOfLife(boardWidth,boardHeight){
        this.width=boardWidth;
        this.height=boardHeight;
        this.board= document.querySelector('#board');
        this.cells=[];
        var nextGenArr=[];
        var neighboursArr=[];
        var self=this;
        this.createBoard = function() {
            this.board.style.width=this.width*10+'px';
            this.board.style.height=this.height*10+'px';
            var nrOfCells= this.width * this.height;
            for( i=0 ; i < nrOfCells; i++){
                this.board.innerHTML+='<div></div>';

            }

            this.cells= document.querySelectorAll('#board div');
            this.cells.forEach(function (val) {
                val.addEventListener('click',function(event){
                    if(val.classList == ''){
                        val.classList.add('live');
                    }else{
                        val.classList.remove('live');
                    }

                })

            })


        };
        this.index = function (x,y) {
            return x+(y*this.width)

        };
        this.setCellState = function (x,y,state) {
            if(state==='live'){
                this.cells[this.index(x,y)].classList.add('live');
            }else if(state==='dead'){
                this.cells[this.index(x,y)].classList.remove('live');
            }

        };
        this.firstGlider = function () {
            this.setCellState(0,0,'live');
            this.setCellState(1,0,'live');
            this.setCellState(4,1,'live');
            this.setCellState(1,1,'live');
            this.setCellState(2,1,'live');
            this.setCellState(6,1,'live');
            this.setCellState(6,2,'live');
            this.setCellState(7,6,'live');

        };
        this.computeCellNextState= function(x,y){
            neighbourArr=[];
            neighbourArr.push(this.cells[this.index(x-1,y-1)]);
            neighbourArr.push(this.cells[this.index(x-1,y)]);
            neighbourArr.push(this.cells[this.index(x-1,y+1)]);
            neighbourArr.push(this.cells[this.index(x,y-1)]);
            neighbourArr.push(this.cells[this.index(x,y+1)]);
            neighbourArr.push(this.cells[this.index(x+1,y-1)]);
            neighbourArr.push(this.cells[this.index(x+1,y)]);
            neighbourArr.push(this.cells[this.index(x+1,y+1)]);
            // console.log(neighbourArr);
            var count=0;
            neighbourArr.forEach(function (el) {
                if(el !== undefined){
                    if(el.className === 'live'){
                        count ++;
                    }

                }

            });
            var presentCell = this.cells[this.index(x,y)];
            if(presentCell.className === 'live'){
                if(count<2 || count>3){
                    return 0
                }else{
                    return 1
                }

            }else if(count=3 && presentCell.className ==='live'){
                return 1
            }else {
                return 0
            }

        };
        this.nextGenCell = function () {
            nextGenArr = [];
            for (var i = 0; i < this.height; i++) {
                for (var j = 0; j < this.width; j++) {
                    nextGenArr.push(this.computeCellNextState(j,i));
                }
            }
        }
        this.nextGenBoard = function () {
            for (var i = 0; i < nextGenArr.length; i++) {
                if (nextGenArr[i] == 1) {
                    this.cells[i].className = 'live';
                }
                else if(nextGenArr[i] == 0) {
                    this.cells[i].className = '';
                }
            }
        }
        this.printNewGeneration = function (event) {
            self.nextGenCell();
            self.nextGenBoard();
        }
        this.startGame = function(event) {
            this.SetInterval = setInterval(this.printNewGeneration, 250);
        }
        this.pauseGame = function(event) {
            clearInterval(this.SetInterval);
        }


    };

    var inHeight = document.querySelector('.inHeight');
    var inWidth = document.querySelector('.inWidth');
    var newBoardBtn = document.querySelector('#makeBoard');
    var Game = {};
    newBoardBtn.addEventListener('click', function(event){
        Game = {};
        Game = new GameOfLife(inHeight.value, inWidth.value);
        Game.createBoard();
        Game.firstGlider();
    });
    var playBtn = document.querySelector('#play');
    var pauseBtn = document.querySelector('#pause');
    var refreshBtn = document.querySelector('#refresh');
    playBtn.addEventListener('click', function(event){
        Game.startGame();
    });
    pauseBtn.addEventListener('click', function(event){
        Game.pauseGame();
    });
    refreshBtn.addEventListener('click', function(event){
        window.location.reload();
    });







});