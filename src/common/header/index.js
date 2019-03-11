import React, { Fragment, PureComponent } from 'react'
import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  SearchWrapper,
  NavSearch,
  SearchInfo,
  SearchInfoTitle,
  SearchInfoSwitch,
  SearchInfoList,
  SearchInfoItem,
  Addition,
  Button
} from './style'
import { actionCreators } from './store'
import { actionCreators as loginActionCreators } from '../../pages/login/store'

class Header extends PureComponent {
  render () {
    const {
      focused,
      list,
      handleInputFocus,
      handleInputBlur,
      login,
      logout
    } = this.props;
    return (
      <Fragment>
        <HeaderWrapper>
          <Link to="/">
            <Logo />
          </Link>
          <Nav>
            <NavItem className="left active">首页</NavItem>
            <NavItem className="left">下载App</NavItem>
            
            {
              login ?
                <NavItem className="right" onClick={logout}>退出</NavItem>:
                <Link to="/login"><NavItem className="right">登陆</NavItem></Link>
            }
            <NavItem className="right"><span className="iconfont">&#xe636;</span></NavItem>
            <SearchWrapper>
              <CSSTransition
                in={focused}
                timeout={300}
                classNames="slide"
              >
                <NavSearch
                  className={focused? "focused": ""}
                  onFocus={() => handleInputFocus(list)}
                  onBlur={handleInputBlur}
                ></NavSearch>
              </CSSTransition>
              <span className={ focused ? "focused iconfont search": "iconfont search" }>&#xe6dd;</span>
              { this.getListArea() }
            </SearchWrapper>
          </Nav>
          <Addition>
            <Button className="reg">注册</Button>
            <Link to="/write">
              <Button className="writting">
                <span className="iconfont">&#xe615;</span>写文章
              </Button>
            </Link>
          </Addition>
        </HeaderWrapper>
      </Fragment>
    )
  }
  getListArea () {
    const {
      focused,
      entered,
      list,
      currPage,
      pageSize,
      totalPage,
      handleMouseEnter,
      handleMouseLeave,
      handleSwitch
    } = this.props;
    const newList = list.toJS();
    const pageList = [];

    if(newList.length) {
      for (let i = (currPage - 1) * pageSize; i < currPage * pageSize; i++) {
        if(newList[i]){
          pageList.push(<SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>);
        }
      }
    }
    if (focused || entered) {
      return (
        <SearchInfo
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <SearchInfoTitle>
            热门搜索
            <SearchInfoSwitch onClick={() => handleSwitch(currPage, totalPage, this.spin)}>
              <span className="iconfont spin" ref={(spin)=> {this.spin = spin}}>&#xe851;</span>
              换一批
            </SearchInfoSwitch>
          </SearchInfoTitle>
          <SearchInfoList>
            {pageList}
          </SearchInfoList>
        </SearchInfo>
      )
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    focused: state.getIn(["header", "focused"]),
    entered: state.getIn(["header", "entered"]),
    list: state.getIn(["header", "list"]),
    currPage: state.getIn(["header", "currPage"]),
    pageSize: state.getIn(["header", "pageSize"]),
    totalPage: state.getIn(["header", "totalPage"]),
    login: state.getIn(["login", "login"])
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleInputFocus(list) {
      (list.size === 0) && dispatch(actionCreators.getList());
      dispatch(actionCreators.searchFocus());
    },
    handleInputBlur() {
      dispatch(actionCreators.searchBlur());
    },
    handleMouseEnter() {
      dispatch(actionCreators.mouseEnter());
    },
    handleMouseLeave() {
      dispatch(actionCreators.mouseLeave());
    },
    handleSwitch(currPage, totalPage, spin) {
      let originAngle = spin.style.transform.replace(/[^0-9]/gi, '');
      if (originAngle) {
        originAngle = parseInt(originAngle, 10);
      } else {
        originAngle = 0;
      }
      spin.style.transform = `rotate(${originAngle + 360}deg)`;
      if(currPage < totalPage) {
        dispatch(actionCreators.changeCurrPage(currPage + 1));
      } else {
        dispatch(actionCreators.changeCurrPage(1));
      }
    },
    logout () {
      dispatch(loginActionCreators.logout());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);