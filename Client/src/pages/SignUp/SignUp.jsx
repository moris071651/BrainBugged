import './SignUp.css'

const SignUp = () => {
  return (
    <div className="SignUp">
      <h1>Sign Up</h1>
      <form id='SignUp'>
        <div>
          <div>
            <input required type="email" className="form-control" id="Email" name='email' placeholder='Email address' />
          </div>
          <div>
            <input required type="email" className="form-control" id="Username" name='username' placeholder='Username' />
          </div>
          <div>
            <div>
              <input required type="text" className="form-control" id="FirstName" name='firstName' placeholder='First Name' />
            </div>
            <div>
              <input required type="text" className="form-control" id="LastName" name='lastName' placeholder='Last Name' />
            </div>
          </div>
          <div>
            <input required type="password" className="form-control" id="Password" name='password' placeholder='Password' />
          </div>
          <div>
            <input required type="password" className="form-control" id="ConfirmPassword" name='confirmPassword' placeholder='Confirm Password' />
          </div>
        </div>
        <div>
          <button type="submit" className='btn btn-primary'>Continue</button>
        </div>
      </form>
    </div>
  )
}

export default SignUp