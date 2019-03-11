import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { actionCreators } from './store'
import {
  LoginWrapper,
  LoginBox,
  Input,
  Button
} from './style'

class Login extends PureComponent {
  render(){
    if (this.props.loginStatus) {
      return <Redirect to="/" />
    }
    return (
      <LoginWrapper>
        <LoginBox>
          <Input placeholder="账号" ref={(input) => {this.account = input}} />
          <Input placeholder="密码" type="password" ref={(input) => {this.password = input}}/>
          <Button onClick={() => {this.props.login(this.account, this.password)}}>登陆</Button>
        </LoginBox>
      </LoginWrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  loginStatus: state.getIn(["login", "login"])
});

const mapDispatchToProps = (dispatch) => ({
  login (accountEle, passwordEle) {
    dispatch(actionCreators.login(accountEle.value, passwordEle.value));
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);