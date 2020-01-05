import React, { Component } from 'react';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';
import {connect} from 'react-redux';
import * as actionTypes from '../store/action';

class Persons extends Component {
    state = {
        persons: []
    }

    personAddedHandler = () => {
        const newPerson = {
            id: Math.random(), // not really unique but good enough here!
            name: 'Max',
            age: Math.floor( Math.random() * 40 )
        }
        this.setState( ( prevState ) => {
            return { persons: prevState.persons.concat(newPerson)}
        } );
    }

    personDeletedHandler = (personId) => {
        this.setState( ( prevState ) => {
            return { persons: prevState.persons.filter(person => person.id !== personId)}
        } );
    }

    render () {
        return (
            <div>
                <AddPerson personAdded={(name,age)=>{this.props.onAddPerson(name,age)}} />
                {this.props.persons.map(person => (
                    <Person 
                        key={person.id}
                        name={person.name} 
                        age={person.age} 
                        clicked={() => this.props.onDeletePerson(person.id)}/>
                ))}
            </div>
        );
    }
}
const mapStateToProps= state =>{
    return{
        persons : state.persons
    }
}
const mapsDispatchToProps = dispatch =>{
    return{
        onAddPerson : (name,age)=> dispatch({type:actionTypes.ADD,person:{name:name,age:age}}),
        onDeletePerson :(personId)=>dispatch({type:actionTypes.DELETE,personId:personId})
    }
}

export default connect(mapStateToProps,mapsDispatchToProps)( Persons);