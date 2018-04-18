import React, { Component } from 'react';
import './App.css';
const baseUrl = 'https://fcc-profile-scraper.herokuapp.com/user/';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {students : [], value: "", error:"", studentDelete : []};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.displayStudents = this.displayStudents.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    //prevents page refresh
    event.preventDefault();
    fetch(baseUrl + this.state.value)
      .then(function(response) {
        return response.json();
      })
      .then(function(student){
        if(student.error !== "Bad user name")
        {
          this.setState({error:""});
          var copyOfStudents = this.state.students; // create a reference to students
          copyOfStudents.push(student) //adds new student
          this.setState({students : copyOfStudents}); //updates student array
          //this time an array for studentDelete
          var copyOfDelete = this.state.studentDelete;
          copyOfDelete.push(false) //adds new student
          this.setState({studentDelete : copyOfDelete}); //updates student array
        }
        else
        {
          //TODO: display an error
          this.setState({error:"Bad user name"});
        }
    }.bind(this));
  }
  handleDelete(index){
    var copyOfDelete = this.state.studentDelete;
    copyOfDelete[index] = true //adds new student
    this.setState({studentDelete : copyOfDelete}); //updates student array
    //this.state.studentDelete[index] = true;
    //this.forceUpdate();
  }
  displayStudents() {
    //<p>this.state.error</p>
    return this.state.students.map((item, index) => {
      return (this.state.studentDelete[index] === false) ?
        <tr>
        <td><img src = {item.profileImage} style={{width : 50, height : 50}}/></td>
        <td>{item.name}</td>
        <td>{item.completedChallenges.length}</td>
        <td> <button onClick={() => this.handleDelete(index)}>Remove</button></td>
        </tr> : null
        //this is the same thing as null
        //<tr><td></td></tr>
      });
  }
  render() {
    return (
      <div>
        <h1>FCC Classroom Knock Off </h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.handleChange}/>
          </label>
            <input type="submit" value="Submit"/>
        </form>
        <style>{"td, tr{border:1px solid black;}"}</style>
       <table>
       <tbody>
        {this.displayStudents()}
       </tbody>
       </table>
        </div>
      );
  }
}

export default App;
