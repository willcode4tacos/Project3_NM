import React, { Component } from “react”;
import { Link } from “react-router-dom”;
import { Col, Row, Container } from “../components/Grid”;
import Jumbotron from “../components/Jumbotron”;
import API from “../utils/API”;



class Detail extends Component {
 state = {
   job: {}
 };
 // When this component mounts, grab the book with the _id of this.props.match.params.id
 // e.g. localhost:3000/books/599dcb67f0f16317844583fc
 componentDidMount() {
   API.getJob(this.props.match.params.id)
     .then(res => this.setState({ job: res.data }))
     .catch(err => console.log(err));


 }

 render() {
   return (
     <Container fluid>
         
       {/* <Row>
         <Col size=“md-12">
           <Jumbotron>
             <h1>
               Your Selected Job
             </h1>
           </Jumbotron>
         </Col>
       </Row> */}
       <Row>
         <Col size=“md-10 md-offset-1”>
           <article>
             <h1>Job Details</h1>
               <ul>
                 <li>Job ID: {this.state.job._id}</li>
                 <li>Category: {this.state.job.jobType}</li>
                 <li>Description: {this.state.job.description}</li>
                 <li>Location: {this.state.job.location}</li>
                 <li>Timeframe: {this.state.job.timeframe}</li>
             </ul>
             <button type=“button” className=“btn btn-info btn-lg” data-toggle=“modal” data-target=“#myModal”>Accept Job</button>
             <div className=“modal fade” id=“myModal” role=“dialog”>
             <div className=“modal-dialog”>

               <div className=“modal-content”>
                 <div className=“modal-header”>
                   <button type=“button” className=“close” data-dismiss=“modal”>&times;</button>
                   <h4 className=“modal-title”>Job Accepted!!</h4>
                 </div>
                 <div className=“modal-body”>
                   <p>The job posted has been notified that their job was accepted.</p>
                 </div>
                 <div className=“modal-footer”>
                   <button type=“button” className=“btn btn-default” data-dismiss=“modal”>Close</button>
                 </div>
               </div>
               </div>
               </div>

             </article>
         </Col>
       </Row>

       <Row>
         <Col size=“md-2”>
           <Link to=“/”>← Back to Profile</Link>
         </Col>
       </Row>
     </Container>
   );
 }
}

export default Detail;