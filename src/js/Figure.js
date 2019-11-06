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

    constructor(_steps) { 
        this.initializePoints();
        this._steps = _steps;
    }

    // расчёт приращений
    _calculateDiffPoints = () => { 
        for (let i = 0; i < this._points; i++) {
            _diffPoints[i] = new PointF((this._endPoints[i].x - this._initPoints[i].x) / this._steps, (this._endPoints[i].y - this._initPoints[i].y) / this._steps);      
        }
    }

    // изменяет текущие координаты фигуры и возвращает их значения
    increasePoints = (index) => { 
        this._initPoints[index] = new PointF(this._initPoints[index].x + this._diffPoints[index].x, this._initPoints[index].y + this._diffPoints[index].y);
        return this._initPoints[index];
    }

    // геттер для получения количества точек
    getPointsCount = () => this._points;

    // инициализация координат и расчет приращений
    _initializePoints = () => { 
        _initPoints.push(
            new PointF(100, 25),  // a
            new PointF(15, 100),  // b
            new PointF(50, 180),  // c
            new PointF(150, 180), // d
            new PointF(185, 100), // e
            new PointF(100, 25)   // a
        );

        _endPoints.push(
            new PointF(1735, 920),  // a
            new PointF(1735, 920),  // bc
            new PointF(1835, 1000), // ed
            new PointF(1835, 1000), 
            new PointF(1870, 920),
            new PointF(1735, 920)
        );
        this._calculateDiffPoints();
    }

    // сброс координат до начальных значений и перерасчет приращений
    resetPoints = () => { 
        this._initPoints = [];
        this._endPoints = [];
        this.initializePoints();
        this._calculateDiffPoints();
    }
}