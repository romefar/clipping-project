import PointF from './PointF';

export default class Figure { 
    
    // начальные координаты
    _initPoints = [];
    
    // конечные координаты
    _endPoints = [];

    // количество точек + 1
    _points = 6;

    // массив приращений
    _diffPoints = [];

    // количество фреймов (шагов) для отрисовки
    _steps = 0;

    // корректировка отрисовки по X(px)
    _shiftX = 0;

    // корректировка отрисовки по Y (px)
    _shiftY = 0;

    // необходима ли корректировка
    _adjustment = false;

    constructor(_steps, adj = false) {
        this._adjustment = adj;
        this._setAdjustment(this._adjustment);
        this._initializePoints();
        this._steps = _steps;
        this._calculateDiffPoints();
    }

    // установка корректировки
    _setAdjustment = (adjustment) => { 
        if(adjustment) { 
            this._shiftX = -9;
            this._shiftY = -2;
        } else { 
            this._shiftX = 0;
            this._shiftY = 0;
        }
    }

    // расчёт приращений
    _calculateDiffPoints = () => { 
        for (let i = 0; i < this._points; i++) {
            this._diffPoints[i] = new PointF((this._endPoints[i].x - this._initPoints[i].x) / this._steps, (this._endPoints[i].y - this._initPoints[i].y) / this._steps);      
        }
    }

    // изменяет текущие координаты фигуры и возвращает их значения
    increasePoints = (index) => { 
        this._initPoints[index] = new PointF(this._initPoints[index].x + this._diffPoints[index].x, this._initPoints[index].y + this._diffPoints[index].y);
        return Object.values(this._initPoints[index]);
    }

    // геттер для получения количества точек
    getPointsCount = () => this._points;

    // инициализация координат и расчет приращений
    _initializePoints = () => {
        this._initPoints.push(
            new PointF(100, 25),  // a
            new PointF(15, 100),  // b
            new PointF(50, 180),  // c
            new PointF(150, 180), // d
            new PointF(185, 100), // e
            new PointF(100, 25),   // a
        );

        this._endPoints.push(
            new PointF(1735, 870),  // a
            new PointF(1735, 870),  // bc
            new PointF(1835, 950), // ed
            new PointF(1835, 950),
            new PointF(1870, 870),
            new PointF(1735, 870)
        );

        // корректировки
        if (this._adjustment) {
            for (let i = 0; i < this._points; i++) {
                this._initPoints[i].x += this._shiftX;
                this._initPoints[i].y += this._shiftY;

                this._endPoints[i].x += this._shiftX;
                this._endPoints[i].y += this._shiftY;
            }
        }
    }

    // сброс координат до начальных значений и перерасчет приращений
    resetPoints = () => {
        this._initPoints = [];
        this._endPoints = [];
        this._initializePoints();
        this._calculateDiffPoints();
        console.log("CALLED");
    }
}