import Figure from './Figure';

export default class Draw { 

    // первый холст для отрисовки 
    _canvas = null;

    // первый контекст для отрисовки
    _first_context = null;

    // второй контекст для отрисовки
    _second_context = null;

    // фигура 
    _figure = null;

    // количество точек
    _points = 0;

    // количество шагов
    _steps = 120;

    // задержка отрисовки мс
    _delay = 30;

    constructor(canvas) { 
        this._canvas = canvas;
        this._figure = new Figure(this._steps);
        this._points = this._figure.getPointsCount();
        this._setUpCanvas();
    }

    // настройка холста
    _setUpCanvas = () => { 
        this._first_context = this._canvas.getContext('2d');
        this._first_context.fillStyle = '#f00';
    }

    _clearCanvas = () => { 
        this._first_context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    // отрисовка фигуры
    _drawFigure = () => { 
        this._clearCanvas();
        this._first_context.beginPath();
        for (let i = 0; i < this._points; i++) {
            this._first_context.lineTo(...this._figure.increasePoints(i));
        }
        // stroke отображает только контур fill заполнение фигуры
        this._first_context.stroke();
    }

    // точка входа
    startDrawing = async () => {
        for (let i = 0; i < this._steps; i++) {
            this._drawFigure();
            console.log("startDrawing.");
            await new Promise(r => setTimeout(r, this._delay));
        }
    }

}