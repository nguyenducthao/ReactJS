import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUser, createNewUserApi, deleteUserApi, editUserApi } from '../../services/userService'
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter';
import ModalEditUser from './ModalEditUser';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isShowModalUser: false,
            isShowModaEditlUser: false,
            currentUser: {}
        }
    }

    async componentDidMount() {
        await this.getAllUser();
    }
    getAllUser = async () => {
        let response = await getAllUser('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }
    showHideModalUser = () => {
        this.setState({
            isShowModalUser: !this.state.isShowModalUser
        })
    }
    handleAddNewUser = () => {
        this.showHideModalUser();
    }
    createNewUser = async (user) => {
        let response = await createNewUserApi(user);
        if (response && response.errCode !== 0) {
            alert(response.errMessage);
        } else {
            await this.getAllUser();
            this.setState({
                isShowModalUser: false
            })
            emitter.emit('EVENT_CLEAR_MODAL_DATA');
        }
    }
    handleDeleteUser = async (user) => {
        try {
            let response = await deleteUserApi(user.id);
            if (response && response.errCode === 0) {
                await this.getAllUser();
            } else {
                alert(response.errMessage);
            }
        } catch (e) {
            console.log(e)
        }
    }
    showHideModaEditlUser = () => {
        this.setState({
            isShowModaEditlUser: !this.state.isShowModaEditlUser
        })
    }
    handleEditUser = (user) => {
        this.setState({
            currentUser: user
        })
        this.showHideModaEditlUser();
    }
    editUser = async (user) => {
        try {
            let response = await editUserApi(user);
            if (response && response.errCode === 0) {
                this.showHideModaEditlUser();
                this.getAllUser();
            } else {
                alert(response.message);
            }
        } catch (e) {
            console.log(e);
        }
    }
    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className='users-container'>
                <ModalUser
                    isOpen={this.state.isShowModalUser}
                    showHideModalUser={this.showHideModalUser}
                    createNewUser={this.createNewUser}
                />
                {this.state.isShowModaEditlUser &&
                    <ModalEditUser
                        isOpen={this.state.isShowModaEditlUser}
                        showHideModaEditlUser={this.showHideModaEditlUser}
                        editUser={this.editUser}
                        currentUser={this.state.currentUser}
                    />
                }
                <div className='title'>Manage users</div>
                <button
                    className='btn btn-primary px-3'
                    onClick={() => this.handleAddNewUser()}
                ><i className="fas fa-plus"></i> Add new user</button>
                <div className='users-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                            {arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button
                                                className='btn-edit'
                                                onClick={() => this.handleEditUser(item)}
                                            ><i className="fas fa-pencil-alt"></i></button>
                                            <button
                                                className='btn-delete'
                                                onClick={() => this.handleDeleteUser(item)}
                                            ><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
