import React, { Component } from 'react';



//Form for creating comments
class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: "",
            comment: {
                name: "",
                message: ""
            }
        };
        //binding context to methods here
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this)
    }
    handleFieldChange = event => {
        const { value, name } = event.target;

        this.setState({
            ...this.state,
            comment: {
                ...this.state.comment,
                [name]: value
            }
        });
    };
    //submitting the Form here
    onSubmit(e) {
        //prevents you from submitting empty form
        e.preventDefault();
    }
    renderError() {
        return this.state.error ? (
            <div>{this.state.error}</div>
        ) : null;
    }


    render() {
        return (
            <React.Fragment>
                <form method="post" onSubmit={this.state.onSubmit}>
                    <div className="form-group">
                        <input
                            onChange={this.handleFieldChange}
                            value={this.state.comment.name}
                            className="form-control"
                            placeholder="Your Name"
                            name="name"
                            type="text"
                        />
                    </div>

                    <div className="form-group">
                        <textarea
                            onChange={this.handleFieldChange}
                            value={this.state.comment.message}
                            className="form-control"
                            placeholder="Comment Here"
                            name="message"
                            rows="5"
                        />
                    </div>

                    {this.renderError()}

                    <div className="form-group">
                        <button type ="submit" disabled={this.state.loading} className="btn">
                            Comment ➤
            </button>
                    </div>
                </form>
            </React.Fragment>
        );
    }
};

export default CommentForm;