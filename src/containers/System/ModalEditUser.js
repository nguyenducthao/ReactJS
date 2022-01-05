import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
    }

    componentDidMount() {
        let user = this.props.currentUser;
        // let { currentUser } = this.props;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'hardcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }
    }

    toggle = () => {

    }
    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    checkValidateInput = () => {
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                alert('Missing required parameter ' + arrInput[i]);
                return false;
            }
        }
        return true;
    }
    handleEditUser() {
        if (this.checkValidateInput() === true) {
            this.props.editUser(this.state);
        }

    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={this.props.showHideModaEditlUser}
                className={'modal-user-container'}
                size='lg'
            >
                <ModalHeader toggle={this.props.showHideModaEditlUser}>Edit a user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input
                                type='text'
                                value={this.state.email}
                                // onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                disabled
                            />
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input
                                type='password'
                                value={this.state.password}
                                // onChange={(event) => this.handleOnChangeInput(event, 'password')}
                                disabled
                            />
                        </div>
                        <div className='input-container'>
                            <label>First name</label>
                            <input
                                type='text'
                                value={this.state.firstName}
                                onChange={(event) => this.handleOnChangeInput(event, 'firstName')}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Last name</label>
                            <input
                                type='text'
                                value={this.state.lastName}
                                onChange={(event) => this.handleOnChangeInput(event, 'lastName')}
                            />
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <input
                                type='text'
                                value={this.state.address}
                                onChange={(event) => this.handleOnChangeInput(event, 'address')}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className='px-3'
                        onClick={() => this.handleEditUser()}
                    >
                        Save changes</Button>{' '}
                    <Button color="secondary" className='px-3' onClick={this.props.showHideModaEditlUser}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
