// Import the React library
import React from "react";

// Import the ReactDom library
import ReactDOM from "react-dom";

// Import the Formik library
import { Formik, Form, Field, ErrorMessage } from 'formik';

// Import Custom CSS
import "./index.css";

class NewForumPost extends React.Component {

    render() {
        return ( 
            this.props.open
            ?  ReactDOM.createPortal(
                <div className="new-post-container">                            
                    <div className="new-post-heading">
                        <h1 className="new-post-title">Reply to Topic</h1>
                    </div>
                    <Formik 
                        initialValues={{ notes: "",
                                         errorMsg: ""
                        }}
                        validate={values => {
                            let errors = {};
                            if (!values.notes)
                                errors.errorMsg = 'Reply data is required!';
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                            setSubmitting(false);
                            console.log(this.props);
                            console.log(JSON.stringify(values, null, 2));

                            // Save new post to database                        
                            this.props.onSave(values);
                            }, 400);
                        }}
                        >
                        {({ prop, values, isSubmitting, setFieldValue }) => (
                            <div>
                                <Form> 
                                    <div>
                                        <Field component="textarea" className="new-post-post-data" rows="10" cols="90" name="notes" placeholder="Enter your reply here..."></Field>
                                    </div>

                                    <div>
                                        <button className="new-post-button" onClick={this.props.onCancel}>Cancel</button>
                                    </div>

                                    <div>
                                        <button className="new-post-button" type="submit" disabled={isSubmitting}>Save</button>
                                    </div>
                                    <div className="new-post-errormsg">                                 
                                        <ErrorMessage className="new-post-errormsg-text" name="errorMsg" component="div" />
                                    </div> 
                                </Form>
                            </div>
                        )}
                    </ Formik>
                </div>,
                document.querySelector("#modal")
                )            
            : null
         )
    }
}

export default NewForumPost;