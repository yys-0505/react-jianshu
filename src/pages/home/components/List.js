import React, { PureComponent, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { actionCreators } from '../store'
import {
  ListItem,
  ListInfo,
  LoadMore
} from '../style'

class List extends PureComponent {
  render () {
    const { list, page, loadMore } = this.props;
    return (
      <Fragment>
        {
          list.map((item, index) => (
            <ListItem key={index}>
              <img className="pic" src={require(`../../../statics/images/${item.get("imgName")}`)} alt={item.get("title")} />
              <ListInfo>
                <Link to={`detail/${item.get("id")}`}>
                  <h3 className="title">{item.get("title")}</h3>
                </Link>
                <p className="desc">{item.get("desc")}</p>
              </ListInfo>
            </ListItem>
          ))
        }
        <LoadMore onClick={() => loadMore(page)}>更多文字</LoadMore>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  list: state.getIn(["home", "articleList"]),
  page: state.getIn(["home", "articlePage"])
});

const mapDispatchToProps = (dispatch) => ({
  loadMore (page) {
    dispatch(actionCreators.loadMore(page));
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(List);