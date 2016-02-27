import React, { Component, PropTypes } from 'react'
import { ReactDom } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ApposComponent from '../components/Appos'

class MyApp extends Component {
  /*
   *  Send data to get the autofill field
   */
  sendDataToRails(url) {
    link = {url: '/appointments/get_data'}
    $.ajax({
      type: 'GET',
      url: link['url'],
      data: link,
      headers: {'X-CSRFToken': Cookies.get('csrftoken')},
      success: function(data) {
        var data = this.state.data
        //I do this so the new added link will be on top of the array
        var newLinks = [data].concat(links)
        // this.setState({data: newLinks});
        this.setState({owners: newLinks})
      }.bind(this)
    })
  }

  /*
   *  Add appointment
   *  Private
   */
  _addAppointment(record) {
    var records
    records = React.addons.update(this.state.records, {
      $push: [record]
    })
    return this.setState({
      records: records
    })
  }

  /*
   *  Add appointment
   *  Private
   */
  _editAppointment(record) {
    console.log('I am in _editAppointment action ')
    $.ajax({
      type: 'GET',
      url: link['url'],
      data: link,
      headers: {'X-CSRFToken': Cookies.get('csrftoken')},
      success: function(data) {
        // this.setState({appos: data});
      }.bind(this)
    })
  }

  /*
   *  Delete appointment
   *  Private
   */
  _deleteAppointment(id) {
    return
  }
  render() {
    return (
      <div>
        <ApposComponent />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      // active: ownProps.filter === state.visibilityFilter
      apposArrayProp: state.apposArrayProp
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    actions: bindActionCreators({fetchAppos, fetchApposIfNeeded, invalidateAppo}, dispatch)
  }
}

const Appos_Ctnr = connect(
    mapStateToProps
)(ApposComponent)

export default Appos_Ctnr