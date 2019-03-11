import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Topic from './components/Topic'
import List from './components/List'
import Recommend from './components/Recommend'
import Writer from './components/Writer'
import { actionCreators } from './store'
import {
  HomeWrapper,
  HomeLeft,
  HomeRight
} from './style'
import banner from '../../statics/images/banner.jpeg'
import { BackTop } from './style'

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.backTop = this.backTop.bind(this);
  }
  render () {
    const { showScroll } = this.props;
    return (
      <HomeWrapper>
        <HomeLeft>
          <img className="banner-img" src={banner} alt="banner" />
          <Topic />
          <List />
        </HomeLeft>
        <HomeRight>
          <Recommend />
          <Writer />
        </HomeRight>
        <BackTop style={{display: showScroll? "block": "none"}} onClick={this.backTop}>顶部</BackTop>
      </HomeWrapper>
    )
  }
  componentDidMount() {
    this.props.queryHomeData();
    this.bindEvents();
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.props.changeSrollTopShow, false);
  }
  bindEvents () {
    window.addEventListener("scroll", this.props.changeSrollTopShow, false);
  }
  backTop () {
    window.scrollTo(0, 0);
  }
}

const mapStateToProps = (state) => ({
  showScroll: state.getIn(["home", "showScroll"])
});

const mapDispatchToProps = (dispatch) => ({
  queryHomeData () {
    dispatch(actionCreators.queryHomeData());
  },
  changeSrollTopShow() {
    let scrollTop = document.documentElement.scrollTop;
    if (scrollTop > 200) {
      dispatch(actionCreators.toggleTopShow(true));
    } else {
      dispatch(actionCreators.toggleTopShow(false));
    }
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(Home);