import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      /*
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
      */

     <div className="flex">
       <div className="left-section">
        Full name: <input className="input" type="text" name="FirstName"></input><br/>
        <div className="flex">
          <input type="button" value="add customer" onClick={()=>this.onAddCustomer()} className="add-button"/><br/>
          <input type="button" value="remove customer" onClick={()=>this.onRemoveCustomer()} className="add-button"/><br/>
        </div>
        <FileInput />
       </div>
       <div className="right-section">
        <List ref={this.myRef}/*customers={customers_global}*//>
       </div>
     </div>
     
    );
  }

  onRemoveCustomer() {
    //
    for (var i = 0; i < customers_global.length; i++) {
      console.log(customers_global[i].name + " " + document.getElementsByName('FirstName')[0].value);
      if (String(customers_global[i].name) === 'user 8')
          /*(customers_global[i].name ===
            document.getElementsByName('FirstName')[0].value)*/ {
        console.log(i);
        customers_global.splice(i, 1);
        listReference.current.setState({customers: customers_global});
        break;
      }
    }
    //customers_global.findIndex
  }

  constructor(props) {
    super(props);
    //this.state = {customers: []};
    this.myRef = React.createRef();
    listReference = this.myRef;
  }

  //var customers = [];

  onAddCustomer() {
    //alert('click');
    var value = document.getElementsByName('FirstName')[0].value;
    //console.log("click " + value);
    var item = {};
    item.name = value;
    customers_global.push(item);
    //console.log(customers_global);

    this.myRef.current.setState({customers: customers_global});
  }
}

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {customers: []};
  }

  render() {
    var rows = [];
    this/*.props*/.state.customers.forEach((contact) => { 
      rows.push(<p key={contact.name} className="hover-item" onClick={()=>this.onClickCustomer(contact.name)}>
        {contact.name}</p>);
    });
    //console.log(rows);
    return (
      <div>{rows}</div>
    );
  }

  onClickCustomer(name) {
    document.getElementsByName('FirstName')[0].value = name;
  }

  
}

var customers_global = [{name: "test1"}, {name: "test2"}, {name: "test3"}];

var listReference;

export default App;

//////////////////////////

class FileInput extends React.Component {
  constructor(props) {
    super(props)
    this.uploadFile = this.uploadFile.bind(this);
    this.state = {fileReader: FileReader};
    //var fileReader;
    //this.fileReader = this.fileReader.bind(this);
  }
  
  uploadFile(event) {

    let file = event.target.files[0];
    //console.log(file);
 
    //

    var reader = new FileReader();
    reader.onload = function(){
      //console.log(reader.result);
      var result = reader.result;
      var index = result.indexOf(";");
      var chunk;
      var item;
      customers_global = [];
      while (index !== -1) {
        chunk = result.substring(0, index);
        item = {};
        item.name = chunk;
        customers_global.push(item);
        result = result.substring(index + 1);
        index = result.indexOf(";");
      }
      //console.log(customers_global);
      listReference.current.setState({customers: customers_global});
    };
    reader.readAsText(file);

  }

  render() {
    return <span>
      <input type="file"
      name="myFile"
      onChange={this.uploadFile} />
    </span>
  }
}
