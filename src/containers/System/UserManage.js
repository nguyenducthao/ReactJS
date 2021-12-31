import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUser, createNewUserApi } from '../../services/userService'
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isShowModalUser: false
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
    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className='users-container'>
                <ModalUser
                    isOpen={this.state.isShowModalUser}
                    showHideModalUser={this.showHideModalUser}
                    createNewUser={this.createNewUser}
                />
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
                                            <button className='btn-edit'><i className="fas fa-pencil-alt"></i></button>
                                            <button className='btn-delete'><i className="fas fa-trash"></i></button>
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
