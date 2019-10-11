import React, { Component } from 'react';



//Form for creating comments
class CommentForm extends Component {
  state ={
      invalidForm: true,
      formData:{ 
                name: "",
                comment: ""
            }
        };

        formRef = React.createRef();
        
        renderError() {
            return this.state.error ? (
                <div>{this.state.error}</div>
            ) : null;
        }
        handleSubmit = e => {
            e.preventDefault();
            this.props.addComment(this.state.formData);
        };

        handleChange = e => {
            const formData = { ...this.state.formData, [e.target.name]: e.target.value };
            this.setState({
                formData,
                invalidForm: !this.formRef.current.checkValidity()
            });
        };
    
        render() {
            return (
                <React.Fragment>
                    <h1>Add Comments</h1>
                    <form ref={this.formRef} autoComplete="off" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input
                                onChange={this.handleChange}
                                value={this.state.formData.name}
                                className="form-control"
                                placeholder="Your Name"
                                name="name"
                                type="text"
                            />
                        </div>

                        <div className="form-group">
                            <textarea
                                onChange={this.handleChange}
                                value={this.state.formData.comment}
                                className="form-control"
                                placeholder="Comment Here"
                                name="comment"
                                rows="5"
                            />
                        </div>

                        {this.renderError()}

                        <div className="form-group">
                            <button type="submit" disabled={this.state.invalidForm} className="btn">
                                Comment ➤
            </button>
                        </div>
                    </form>
                </React.Fragment>
            );
        }
    };

    export default CommentForm;