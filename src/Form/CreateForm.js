import React, { Component } from 'react';
import './CreateForm.css';
import axios from '../axios';

class CreateForm extends Component {
    constructor(props) {
        super(props);
        this.state={
            firstname: '',
            lastname: '',
            email: '',
            phonenumber: '',
            accounttype: '',
            accountnumber: '',
            storagetype: '',
            formErrors: {}
        };
        this.initialState = this.state;
    }
    handleFormValidation(){
        const {firstname, lastname, email, phonenumber, accounttype, accountnumber, storagetype}=this.state;
        let formErrors={};
        let formIsValid=true;
        if(!firstname){
            formIsValid=false;
            formErrors["firstnameErr"]="First Name is required.";
        }
        if(!lastname){
            formIsValid=false;
            formErrors["lastnameErr"]="Last Name is required.";
        }
        if(!email){
            formIsValid=false;
            formErrors["emailErr"]="Email id is required.";
        }
        else if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
            formIsValid=false;
            formErrors["emailErr"]="Invalid email id.";
        }
        if(!phonenumber){
            formIsValid=false;
            formErrors["phoneErr"]="Phone Number is required.";
        }
        else {
            var mobPattern=/^(?:(?:\\+|0{0,2})91(\s*[\\-]\s*)?|[0]?)?[789]\d{9}$/;
            if(!mobPattern.test(phonenumber)){
                formIsValid=false;
                formErrors["phoneErr"]="Invalid Phone Number.";
            }
        }
        if(!accounttype){
            formIsValid=false;
            formErrors["acctypeErr"]="Account Type is required.";
        }
        if(!accountnumber){
            formIsValid=false;
            formErrors["accnumErr"]="Account Number is required.";
        }
        else{
            var accnumPattern=/^\d{9,18}$/;
            if(!(accnumPattern.test(accountnumber))){
                formIsValid=false;
                formErrors["accnumErr"]="Account Number varies from 9-18 digits.";
            }
        }
        if(storagetype===''){
            formIsValid=false;
            formErrors["storageErr"]="Select Storage Type.";
        }
        this.setState({formErrors: formErrors});
        return formIsValid;
    }

    handleChange = (Event) => {
        this.setState({[Event.target.name]: Event.target.value});
    }

    handleSubmit = (Event) => {
        Event.preventDefault();
        // const {firstname, lastname, email, phonenumber, accounttype, accountnumber, storagetype}=this.state;
        if(this.handleFormValidation()){
            alert('You have been successfully submitted.')
            const sendMessage = async (Event) => {
                await axios.post('/register',this.state).then(
                    (res) => {
                        console.log(res);
                    }
                ).catch((err) => console.log(err))
                // await axios.post("/register", {
                //     firstname: firstname,
                //     lastname: lastname,
                //     email: email,
                //     phonenumber: phonenumber,
                //     accounttype: accounttype,
                //     accountnumber: accountnumber,
                //     storagetype: storagetype
                // })
            }
            sendMessage();
            this.setState(this.initialState)
        }
    }
    render() {
        const { firstnameErr, lastnameErr, emailErr, phoneErr, acctypeErr, accnumErr, storageErr } = this.state.formErrors;
    return (
        <>
          <form onSubmit={this.handleSubmit} method="POST">
          <div id="form">
                <div><h5>Personal Details</h5></div>
                <div></div>
              <div>
                  <label htmlFor="firstname" >First Name</label>
                  <input type="text" name="firstname" id="firstname" value={this.state.firstname} onChange={this.handleChange} className={firstnameErr ? ' showError' : ''}/>
                  {firstnameErr && <div className="error">{firstnameErr}</div>}
              </div>
              <div>
                    <label htmlFor="lastname" >Last Name</label>
                    <input type="text" name="lastname" id="lastname" value={this.state.lastname} onChange={this.handleChange} className={lastnameErr ? ' showError' : ''}/>
                    {lastnameErr && <div className="error">{lastnameErr}</div>}
              </div>
              <div>
                  <label htmlFor="email" >Email</label>
                  <input type="email" name="email" id="email" value={this.state.email} onChange={this.handleChange} className={emailErr ? ' showError' : ''}/>
                  {emailErr && <div className="error">{emailErr}</div>}
              </div>
              <div>
                <label htmlFor="phonenumber" >Phone Number</label>
                <input type="text" name="phonenumber" id="phonenumber" value={this.state.phonenumber} onChange={this.handleChange} className={phoneErr ? ' showError' : ''}/>
                {phoneErr && <div className="error">{phoneErr}</div>}
              </div>
              <div><h5>Account Details</h5></div>
              <div></div>
              <div>
                <label htmlFor="accounttype" >Account Type</label>
                <input type="text" name="accounttype" id="accounttype" value={this.state.accounttype} onChange={this.handleChange} className={acctypeErr ? ' showError' : ''}/>
                {acctypeErr && <div className="error">{acctypeErr}</div>}
              </div>
              <div>
                <label htmlFor="accountnumber" >Account Number</label>
                <input type="text" name="accountnumber" id="accountnumber" value={this.state.accountnumber} onChange={this.handleChange} className={accnumErr ? ' showError' : ''}/>
                {accnumErr && <div className="error">{accnumErr}</div>}
              </div>

              <div className="fullwidth">
                <label htmlFor="storagetype" >Storage Type</label>
                <select name="storagetype" id="storagetype" value={this.state.storagetype} onChange={this.handleChange} className={storageErr ? ' showError' : ''}>
                <option value="">Select</option>
                <option value="localstorage">Local Storage</option>
                <option value="database">Database Storage</option>
                </select>
                {storageErr && <div className="error">{storageErr}</div>}
              </div>
              <div className="fullwidth">
                  <input type="submit" id="submit"/>
              </div>
            </div>
              
          </form>  
        </>
    )
}
}
export default CreateForm;