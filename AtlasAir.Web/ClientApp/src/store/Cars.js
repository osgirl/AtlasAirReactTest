export const requestAllCarsType = 'REQUEST_ALL_CARS';
export const receiveAllCarsType = 'RECEIVE_ALL_CARS';
export const selectCarType = 'SELECT_CAR';
export const invalidateCarType = 'INVALIDATE_CAR';
export const createCarType = 'CREATE_CAR';
export const receiveCreatedCarType = 'RECEIVE_CREATED_CAR';
export const updateCarType = 'UPDATE_CAR';
export const receiveUpdatedCarType = 'RECEIVE_UPDATED_CAR';
export const deleteCarType = 'DELETE_CAR';
export const receiveDeleteType = 'RECEIVE_DELETE';
export const emptyCar = {
    id: 0,
    manufacturer: '',
    make: '',
    model: '',
    year: ''
};
const initialState = {
    cars: [],
    selectedCar: {
        ...emptyCar
    },
    isLoading: false,
    isInvalid: true
};
const defaultInit = {
    mode: "cors",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json; charset=utf-8"
    }
};
export const actionCreators = {
    requestAllCars: () => async (dispatch, getState) => {
        const state = getState();
        if (!state.cars.isLoading && (!state.cars.cars || state.cars.cars.length === 0)) {
            dispatch({ type: requestAllCarsType });
            const url = `http://localhost:64422/api/cars`;
            const init = Object.assign({}, defaultInit, { method: "GET", cache: "default" });
            const response = await fetch(url, init);
            const cars = await response.json();
            dispatch({ type: receiveAllCarsType, cars });
        }
    },
    invalidateCars: () => async (dispatch, getState) => {
        dispatch({ type: invalidateCarType });
    },
    selectCar: function (car) {
        const { id, manufacturer, make, model, year } = car;
        const selectedCar = { id, manufacturer, make, model, year };
        return async (dispatch, getState) => {
            dispatch({ type: selectCarType, selectedCar });
        };
    },
    createCar: () => async (dispatch, getState) => {
        const state = getState();
        let car = state.cars.selectedCar;
        if (car) {
            dispatch({ type: createCarType });
            const url = `http://localhost:64422/api/cars`;
            const body = JSON.stringify(car);
            const init = Object.assign({}, defaultInit, {
                body: body,
                method: "POST",
                cache: "no-cache"
            });
            const response = await fetch(url, init);
            car = await response.json();
            dispatch({ type: receiveCreatedCarType, selectedCar: car });
        }
    },
    updateCar: () => async (dispatch, getState) => {
        let car = getState().cars.selectedCar;
        if (car) {
            dispatch({ type: updateCarType });
            const url = `http://localhost:64422/api/cars/${car.id}`;
            const init = Object.assign({}, defaultInit, {
                body: JSON.stringify(car),
                method: "PUT",
                cache: "no-cache"
            });
            const response = await fetch(url, init);
            car = await response.json();
            dispatch({ type: receiveUpdatedCarType, selectedCar: car });
        }
    },
    deleteCar: () => async (dispatch, getState) => {
        const car = getState().cars.selectedCar;
        if (car) {
            dispatch({ type: deleteCarType });
            const url = `http://localhost:64422/api/cars/${car.id}`;
            const init = Object.assign({}, defaultInit, {
                method: "DELETE",
                cache: "no-cache"
            });
            const response = await fetch(url, init);
            dispatch({ type: receiveDeleteType, selectedCar: car, deleted: response.ok });
        }
    }
};

export const reducer = (state, action) => {
    state = state || initialState;
    if (action.type === requestAllCarsType) {
        return {
            ...state,
            isLoading: true
        };
    }
    if (action.type === receiveAllCarsType) {
       return {
            ...state,
            isLoading: false,
            cars: action.cars
        };
    }
    if (action.type === createCarType) {
        return {
            ...state,
            isLoading: true
        };
    }
    if (action.type === receiveCreatedCarType) {
        return {
            ...state,
            isLoading: false,
            selectedCar: action.selectedCar
        };
    }
    if (action.type === updateCarType) {
        return {
            ...state,
            isLoading: true
        };
    }
    if (action.type === receiveUpdatedCarType) {
        return {
            ...state,
            isLoading: false,
            selectedCar: action.selectedCar
        };
    }
    if (action.type === deleteCarType) {
        return {
            ...state,
            isLoading: true
        };
    }
    if (action.type === receiveDeleteType) {
        return {
            ...state,
            isLoading: false
        };
    }
    if (action.type === selectCarType) {
        return {
            ...state,
            selectedCar: action.selectedCar
        };
    }
    if (action.type === invalidateCarType) {
        return {
            ...state,
            cars: [],
            selectedCar: { ...emptyCar },
            isInvalid: true
        };
    }
    return state;
};
