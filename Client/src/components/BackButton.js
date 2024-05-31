import React from 'react';

class BackButton extends React.Component {
    goBack = () => {
        window.history.back();
    };

    render() {
        return (
            <button className="btn waves-effect waves-light" onClick={this.goBack} style={{ display: 'flex', alignItems: 'center' ,marginTop:'15px',borderRadius:'20px',justifyContent:'center' }}>
                <i className="material-icons">arrow_back</i>
                <span style={{ marginLeft: '5px' , fontFamily:'sans-serif' }}>Go Back</span>
            </button>
        );
    }
}

export default BackButton;