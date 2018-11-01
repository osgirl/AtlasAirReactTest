import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Cars';
import { bindActionCreators } from 'redux';
import { Button, Modal, Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap';

class Home extends Component {
    constructor(props) {
        super(props);
        this.emptyCar = {
            id: 0,
            manufacturer: '',
            make: '',
            model: '',
            year: ''
        };
        this.state = {
            showView: false,
            showAdd: false,
            showEdit: false,
            showDelete: false,
            validationState: {
                id: null,
                manufacturer: null,
                make: null,
                model: null,
                year: null
            }
        };
        this.handleView = this.handleView.bind(this);
        this.handleViewHide = this.handleViewHide.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleAddHide = this.handleAddHide.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleEditHide = this.handleEditHide.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleDeleteHide = this.handleDeleteHide.bind(this);
        this.handleDeleteYes = this.handleDeleteYes.bind(this);
        this.handleDeleteNo = this.handleDeleteNo.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
    }

    componentWillMount() {
        this.props.requestAllCars();
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        this.props.requestAllCars();
    }

    checkValidity(name, value) {
        let isValid = false;
        switch (name) {
            case "year":
                isValid = value && value.length > 0 && /^(\d{2}|\d{4})$/.test(value);
                break;
            default:
                isValid = value && value.length > 0;
                break;
        }
        this.setState({
            validationState: {
                [name]: isValid ? null : "error"
            }
        });
    }

    handleFieldChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name || target.id;
        this.checkValidity(name, value);
        const car = {
            ...this.props.selectedCar,
            [name]: name === "year" ? +value : value
        };
        this.props.selectCar(car);
    }

    handleAdd(car) {
        this.setState({ showAdd: true, selectedCar: car });
        this.props.selectCar();
    }

    handleAddHide() {
        this.setState({ showAdd: false });
    }

    handleView(car) {
        this.setState({ showView: true, selectedCar: car });
        this.props.selectCar();
    }

    handleViewHide() {
        this.setState({ showView: false });
    }

    handleEdit(car) {
        this.setState({ showEdit: true, selectedCar: car });
        this.props.selectCar();
    }

    handleEditHide() {
        this.setState({ showEdit: false });
    }

    handleDelete(car) {
        this.setState({ showDelete: true, selectedCar: car });
        this.props.selectCar();
    }

    handleDeleteHide() {
        this.setState({ showDelete: false });
    }

    handleDeleteYes() {
        this.props.deleteCar();
        this.handleDeleteHide();
        this.props.requestAllCars();
    }

    handleDeleteNo() {
        this.handleDeleteHide();
    }

    handleSave(car) {
        if (this.state.showAdd) {
            this.props.createCar(car);
        }
        if (this.state.showEdit) {
            this.props.updateCar(car);
        }
        this.setState({
            showAdd: false,
            showDelete: false,
            showEdit: false,
            showView: false
        });
        this.props.requestAllCars();
    }

    renderRow(car) {
        return (
            <tr key={car.id}>
                <td className="linky" onClick={() => this.handleView(car)}>{car.manufacturer}</td>
                <td>{car.make}</td>
                <td>{car.model}</td>
                <td>{car.year}</td>
                <td className="icons">
                    <i onClick={() => this.handleEdit(car)} className="oi oi-pencil"/>
                    <i onClick={() => this.handleDelete(car)} className="oi oi-trash"/>
                </td>
            </tr>
        );
    }

    render() {
        return (
            <main>
                <div className="button-bar">
                    <Button onClick={this.handleAdd}>Add New</Button>
                </div>
                <Modal show={this.state.showView} onHide={this.handleViewHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Car Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            <FormGroup controlId="manufacturer">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Manufacturer:
                                </Col>
                                <Col sm={10}>
                                    {this.props.selectedCar && this.props.selectedCar.manufacturer}
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="make">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Make:
                                </Col>
                                <Col sm={10}>
                                    {this.props.selectedCar && this.props.selectedCar.make}
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="model">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Model:
                                </Col>
                                <Col sm={10}>
                                    {this.props.selectedCar && this.props.selectedCar.model}
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="year">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Year:
                                </Col>
                                <Col sm={10}>
                                    {this.props.selectedCar && this.props.selectedCar.year}
                                </Col>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleViewHide}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.showAdd} onHide={this.handleAddHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Car</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            <FormControl type="hidden" value={this.props.selectedCar.id} />
                            <FormGroup controlId="manufacturer" validationState={this.state.validationState.manufacturer}>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Manufacturer:
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="text" placeholder="manufacturer" value={this.props.selectedCar.manufacturer} onChange={this.handleFieldChange} />
                                    <FormControl.Feedback />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="make" validationState={this.state.validationState.make}>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Make:
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="text" placeholder="make" value={this.props.selectedCar.make} onChange={this.handleFieldChange} />
                                    <FormControl.Feedback />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="model" validationState={this.state.validationState.model}>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Model:
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="text" placeholder="model" value={this.props.selectedCar.model} onChange={this.handleFieldChange} />
                                    <FormControl.Feedback />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="year" validationState={this.state.validationState.year}>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Year:
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="text" placeholder="year" value={this.props.selectedCar.year} onChange={this.handleFieldChange} />
                                    <FormControl.Feedback />
                                </Col>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.handleSave(this.props.selectedCar)}>Save</Button>
                        <Button onClick={this.handleAddHide}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.showEdit} onHide={this.handleEditHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Car</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form horizontal>
                            <FormControl type="hidden" value={this.props.selectedCar.id} />
                            <FormGroup controlId="manufacturer" validationState={this.state.validationState.manufacturer}>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Manufacturer:
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="text" placeholder="manufacturer" value={this.props.selectedCar.manufacturer} onChange={this.handleFieldChange} />
                                    <FormControl.Feedback />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="make" validationState={this.state.validationState.make}>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Make:
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="text" placeholder="make" value={this.props.selectedCar.make} onChange={this.handleFieldChange} />
                                    <FormControl.Feedback />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="model" validationState={this.state.validationState.model}>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Model:
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="text" placeholder="model" value={this.props.selectedCar.model} onChange={this.handleFieldChange} />
                                    <FormControl.Feedback />
                                </Col>
                            </FormGroup>
                            <FormGroup controlId="year" validationState={this.state.validationState.year}>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Year:
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="text" placeholder="year" value={this.props.selectedCar.year} onChange={this.handleFieldChange} />
                                    <FormControl.Feedback />
                                </Col>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.handleSave(this.props.selectedCar)}>Save</Button>
                        <Button onClick={this.handleEditHide}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.showDelete} onHide={this.handleDeleteHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Car</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you wish to delete the:</p>
                        <p>{this.props.selectedCar.year} {this.props.selectedCar.manufacturer} {this.props.selectedCar.make} {this.props.selectedCar.model}?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.handleDeleteYes(this.props.selectedCar)}>Yes</Button>
                        <Button onClick={this.handleDeleteNo}>No</Button>
                    </Modal.Footer>
                </Modal>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Manufacturer</th>
                            <th>Make</th>
                            <th>Model</th>
                            <th>Year</th>
                            <th/>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.cars.map(car => this.renderRow(car))}
                    </tbody>
                </table>
            </main>
       );
    }
}

export default connect(
    state => state.cars,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Home);
