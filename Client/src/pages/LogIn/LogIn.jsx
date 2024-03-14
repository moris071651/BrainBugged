import './LogIn.css'

const LogIn = () => {
  return (
    <div className="LogIn">
      <h1>Log in</h1>
      <form id='Login'>
        <div>
          <div>
            <input required type="email" className="form-control" id="Email" name='email' placeholder='Email address' />
          </div>
          <div>
            <input required type="password" className="form-control" id="Password" name='password' placeholder='Password' />
          </div>
        </div>
        <div>
          <button type="submit" className='btn btn-primary'>Continue</button>
        </div>
      </form>
    </div>
  )
}

export default LogIn