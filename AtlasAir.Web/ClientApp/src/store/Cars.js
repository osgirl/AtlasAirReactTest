import { combineReducers } from 'redux';

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
const initialState = {
    cars: [],
    selectedCar: {
        id: 0,
        manufacturer: '',
        make: '',
        model: '',
        year: ''
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

/*
export function createCarAction(car) {
    return {
        type: createCarType,
        selectedCar: car
    };
}

function createdCar(car) {
    return {
        type: receiveCreatedCarType,
        selectedCar: car
    };
}

export function createCar(car) {
    return dispatch => {
        if (car) {
            const url = `http://localhost:64422/api/cars`;
            const body = JSON.stringify(car);
            console.log("using body ", body);
            const init = Object.assign({}, defaultInit, {
                body: body,
                method: "POST",
                cache: "no-cache"
            });
            console.log("using init", init);
            fetch(url, init)
                .then(response => response.json())
                .then(car => {
                    dispatch(createdCar(car));
                });
        }
    };
    //return (dispatch, getState) => {
    //    const state = getState();
    //    const car = state.selectedCar || state.cars.selectedCar;
    //    if (car) {
    //        const url = `http://localhost:64422/api/cars`;
    //        const body = JSON.stringify(car);
    //        console.log("using body ", body);
    //        const init = Object.assign({}, defaultInit, {
    //            body: body,
    //            method: "POST",
    //            cache: "no-cache"
    //        });
    //        console.log("using init", init);
    //        fetch(url, init)
    //            .then(response => response.json())
    //            .then(car => {
    //                dispatch(createdCar(car));
    //            });
    //    }
    //};
}

export function editCarAction(car) {
    return {
        type: updateCarType,
        selectedCar: car
    };
}

export function selectCar(car) {
    return {
        type: selectCarType,
        selectedCar: car
    };
}

export function requestCars() {
    return {
        type: requestAllCarsType,
        isInvalid: true
    };
}

export function receiveCars(cars) {
    return {
        type: receiveAllCarsType,
        carList: cars,
        isInvalid: false
    };
}

export function invalidateCars() {
    return {
        type: invalidateCarType
    };
}

export function fetchCars() {
    return dispatch => {
        dispatch(requestCars());
        const url = `http://localhost:64422/api/cars`;
        const init = Object.assign({}, defaultInit, { method: "GET", cache: "default" });
        return fetch(url, init)
            .then(response => response.json())
            .then(cars => dispatch(receiveCars(cars)));
    };
}

export function shouldFetchCars(state) {
    const cars = state.cars.allCars;
    if (!cars) {
        return true;
    } else if (cars.isLoading) {
        return false;
    } else {
        return cars.isInvalid;
    }
}

export function fetchCarsIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchCars(getState())) {
            return dispatch(fetchCars());
        }
    };
}

export function invalidateCarList() {
    return (dispatch, getState) => {
        return dispatch(invalidateCars());
    };
}

function selectedCar(state = 'reactjs', action) {
    switch (action.type) {
        case selectCarType:
        case createCarType:
            return action.selectedCar;
        default:
            return state;
    }
}

function allCars(state = { isLoading: false, isInvalid: false, carList: [] }, action) {
    switch (action.type) {
        case invalidateCarType:
            return { ...state, isInvalid: true };
        case requestAllCarsType:
            return { ...state, isLoading: true, isInvalid: true };
        case receiveAllCarsType:
            return { ...state, carList: action.carList, isLoading: false, isInvalid: false };
        default:
            return state;
    }
}

export const carReducer = combineReducers({
    selectedCar,
    allCars
});
*/

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
    selectCar: () => async (dispatch, getState) => {
        const state = getState();
        const selectedCar = state.cars.selectedCar;
        dispatch({ type: selectCarType, selectedCar });
    },
    createCar: () => async (dispatch, getState) => {
        const state = getState();
        console.log("creating state ", state);
        let car = state.cars.selectedCar;
        console.log("creating ", car);
        if (car) {
            dispatch({ type: createCarType });
            const url = `http://localhost:64422/api/cars`;
            const body = JSON.stringify(car);
            console.log("using body ", body);
            const init = Object.assign({}, defaultInit, {
                body: body,
                method: "POST",
                cache: "no-cache"
            });
            console.log("using init", init);
            const response = await fetch(url, init);
            car = await response.json();
            dispatch({ type: receiveCreatedCarType, selectedCar: car });
        }
    },
    updateCar: () => async (dispatch, getState) => {
        let car = getState().cars.selectedCar;
        console.log("updating ", car);
        if (car) {
            dispatch({ type: updateCarType });
            const url = `http://localhost:64422/api/cars/${car.id}`;
            const init = Object.assign({}, defaultInit, {
                body: JSON.stringify(car),
                method: "POST",
                cache: "no-cache"
            });
            init.body = init.body || JSON.stringify(car);
            const response = await fetch(url, init);
            car = await response.json();
            dispatch({ type: receiveUpdatedCarType, selectedCar: car });
        }
    },
    deleteCar: () => async (dispatch, getState) => {
        const car = getState().cars.selectedCar;
        console.log("deleting ", car);
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
    return state;
};
