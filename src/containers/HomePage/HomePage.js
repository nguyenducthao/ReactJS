import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomePageHeader from './HomePageHeader';

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }






    render() {
        return (
            <div>
                <HomePageHeader />
                <div>
                    Home page
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
