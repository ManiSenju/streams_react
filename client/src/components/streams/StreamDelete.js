import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteStream, fetchStream } from '../../actions';
import history from '../../history';
import Modal from '../Modal';

class StreamDelete extends React.Component{

    componentDidMount(){
        this.props.fetchStream(this.props.currentStreamId)
    }

    onDeleteClick = ()=>{
        this.props.deleteStream(this.props.currentStreamId);
    }

    renderActions(){
        return (
            <React.Fragment>
                <button onClick={this.onDeleteClick} className="ui button negative">Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
            </React.Fragment>
        )
    }
    render(){

        return (
                <Modal 
                title="Delete Stream" 
                content={`Are you sure you want to delete this stream : ${this.props.stream && this.props.stream.title} ?`}
                actions = {this.renderActions()}
                onDismiss ={()=> history.push("/")} />
        )

    }
    
}

const mapStateToProps =(state , ownProps)=>{
    return {
        stream : state.streams[parseInt(ownProps.match.params.id)],
        currentStreamId : parseInt(ownProps.match.params.id)
    }
}

export default connect(mapStateToProps,{fetchStream,deleteStream})(StreamDelete);