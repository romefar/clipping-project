import Figure from './Figure';

export default class Draw { 

    // первый холст для отрисовки 
    _first_canvas = null;

    // второй холст для отрисовки
    _second_canvas = null;

    // первый контекст для отрисовки
    _first_context = null;

    // второй контекст для отрисовки
    _second_context = null;

    // фигура 
    _figure = null;
    _figure1 = null;

    // количество точек
    _points = 0;

    // количество шагов
    _steps = 120;

    // задержка отрисовки мс
    _delay = 10;

    // режим отрисовки
    _mode = '';

    // блок для перекрытия второго режима отображения
    _poly = null;

    // корневой элемент
    _root = null;

    constructor(canvas, canvas1, poly, root) { 
        this._first_canvas = canvas;
        this._second_canvas = canvas1;
        this._poly = poly;
        this._root = root;

        this._figure = new Figure(this._steps);
        this._figure1 = new Figure(this._steps, true);

        this._points = this._figure.getPointsCount();
        this._setUpCanvas();
    }

    // настройка холста
    _setUpCanvas = () => { 
        this._first_context = this._first_canvas.getContext('2d');
        this._first_context.fillStyle = 'red';

        this._second_context = this._second_canvas.getContext('2d');
        this._second_context.fillStyle = 'red';
    }

    // очистка холстов
    _clearCanvas = () => { 
        this._first_context.clearRect(0, 0, this._first_canvas.width, this._first_canvas.height);
        this._second_context.clearRect(0, 0, this._second_canvas.width, this._second_canvas.height);
    }

    // отрисовка внешнего отсечения
    _drawOutherMode = () => { 
        // перенос блока на передний план
        this._poly.classList.add('set-z-index');
        // перемещение холста 
        this._root.appendChild(this._first_canvas);
        this._first_canvas.classList.remove('canvas-mode-outher');
        this._clearCanvas();
        this._first_context.beginPath();
        this._second_context.beginPath();
        for (let i = 0; i < this._points; i++) {
            this._first_context.lineTo(...this._figure.increasePoints(i));
            this._second_context.lineTo(...this._figure1.increasePoints(i));
        }
         // stroke отображает только контур fill заполнение фигуры
        this._second_context.fill();
        this._first_context.fill();      
    }

    // отрисовка внутреннего отсечения
    _drawInnerMode = () => {
        // перенос блока на задний план
        this._poly.classList.remove('set-z-index');
        // перемещение холста 
        this._poly.appendChild(this._first_canvas);
        this._first_canvas.classList.add('canvas-mode-outher');
        this._clearCanvas();
        this._first_context.beginPath();
        for (let i = 0; i < this._points; i++){      
           this._first_context.lineTo(...this._figure.increasePoints(i));
        }
        // stroke отображает только контур fill заполнение фигуры
        this._first_context.fill();      
    }

    // установка режима внутренней отрисовки
    setInnerMode = (e) => {
        this._mode = 'inner';     
        this._startDrawing();
    }

    // установка режима внешенй отрисовки
    setOutherMode = (e) => {
        this._mode = 'outher';
        this._startDrawing();
    }

    // начать отрисовку
    _startDrawing = async () => {
        // выбор функции в зависимости от режима 
        const modeFunc = this._mode === 'inner' ? this._drawInnerMode : this._drawOutherMode;
        for (let i = 0; i < this._steps; i++) {
            modeFunc();
            await new Promise(r => setTimeout(r, this._delay));
        }
        // очистить точки
        this._figure.resetPoints();
        this._figure1.resetPoints();
    }

}