import React, {Component} from 'react'
import Http from '../../services/Http'


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.http = new Http();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);

    this.http.post('login', this.state).then(response => {
      console.log('response', response);
      if (response.status === 200) {

      } else {

      }
    });
  }

  handleChange(key, value) {
    this.setState({[key]: value});
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Email:
            <input type="email" value={this.state.email}
                   onChange={e => this.handleChange('email', e.target.value)}/>
          </label>
          <label>
            Password:
            <input type="password" value={this.state.password}
                   onChange={e => this.handleChange('password', e.target.value)}/>
          </label>
          <input type="submit" value="Submit"/>
        </form>
    )
  }

}

export default Login