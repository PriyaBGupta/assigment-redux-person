import * as actionType from './action';
const initialState ={
    persons:[]
}
const reducer =(state = initialState,action)=>{
    switch(action.type){
        case actionType.ADD:
            return {
                ...state,
                persons:state.persons.concat([action.person])
            }
        case actionType.DELETE:
            console.log('whether I am called',action.personId);
            return{
                ...state,
                persons : state.persons.filter(person=>(person.id !== action.personId))
            }
    }
    return state;
}
export default reducer;