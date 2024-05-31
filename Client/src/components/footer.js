import React from 'react';


class footer extends React.Component {

    render() {
        return (
            <footer className="page-footer blue darken-4" style={{ marginTop: 'auto' }}>
                <div className="container">
                    <div className="col s12">
                        <p>&copy; {new Date().getFullYear()} Tal Abutbul Ltd. All rights reserved.</p>
                        <div className="col s12">
                            <p>Contact: Tal6203@Gmail.com | Phone: 052-681-2203</p>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default footer;