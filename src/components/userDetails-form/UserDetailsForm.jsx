import "./UserDetailsForm.scss";

const UserDetailsForm = () => {

    const handleSubmit = () => {
        console.log("Hello!");
    }

    const handleCancel = () => {
        //This would call the user details. 
    }
    return (
        <form onSubmit={handleSubmit} className="userDetailsForm">
            <div className="userDetailsForm__form-div">
                <div className="userDetailsForm__div">
                    <label htmlFor="firstname" className="userDetailsForm__label">First name</label>
                    <input type="text" name="firstname" id="firstname" className="userDetailsForm__input" />
                </div>
                <div className="userDetailsForm__div">
                    <label htmlFor="lastname" className="userDetailsForm__label">Last name</label>
                    <input type="text" name="lastname" id="lastname" className="userDetailsForm__input" />
                </div>
            </div>

            <div>
                <label htmlFor="email" className="userDetailsForm__label">Email address</label>
                <input type="email" name="email" className="userDetailsForm__input--email" />
            </div>

            <div className="userDetailsForm__btn-div">
                <button onClick={handleCancel} className="userDetailsForm__btn--cancel">Cancel</button>
                <button className="userDetailsForm__btn--save">Save Changes</button>
            </div>
        </form>
    )
}

export default UserDetailsForm;