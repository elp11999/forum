// Import the React library
import React from "react";

// Import the ReactDom library
import ReactDOM from "react-dom";

// Import the Formik library
import { Formik, Form, Field, ErrorMessage } from 'formik';

// Import Custom CSS
import "./index.css";

class NewForumTopic extends React.Component {

    render() {
        return ( 
            this.props.open
            ?  ReactDOM.createPortal(
                <div className="new-topic-container">                            
                    <div className="new-topic-heading">
                        <h1 className="new-topic-title">Create New Topic</h1>
                    </div>
                    <Formik 
                        initialValues={{ topic: "", 
                                         notes: "",
                                         errorMsg: ""
                        }}
                        validate={values => {
                            let errors = {};
                            if (!values.topic)
                                errors.errorMsg = 'Topic title is required!';
                            if (!values.notes)
                                errors.errorMsg = 'Topic post data is required!';
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                            setSubmitting(false);
                            console.log(this.props);
                            console.log(JSON.stringify(values, null, 2));

                            // Save new topic to database                        
                            this.props.onSave(values);
                            }, 400);
                        }}
                        >
                        {({ prop, values, isSubmitting, setFieldValue }) => (
                            <div>
                                <Form> 
                                    <div className="new-topic">
                                        <label className="new-topic-label" htmlFor="topic">Title:</label>
                                        <Field className="new-topic-field " type="text" name="topic" />
                                    </div>
 
                                    <div>
                                        <Field component="textarea" className="new-topic-post-data" rows="10" cols="90" name="notes" placeholder="Describe your post here..."></Field>
                                    </div>

                                    <div>
                                        <button className="new-topic-button" onClick={this.props.onCancel}>Cancel</button>
                                    </div>

                                    <div>
                                        <button className="new-topic-button" type="submit" disabled={isSubmitting}>Save</button>
                                    </div>
                                    <div className="new-topic-errormsg">                                 
                                        <ErrorMessage className="new-topic-errormsg-text" name="errorMsg" component="div" />
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

export default NewForumTopic;