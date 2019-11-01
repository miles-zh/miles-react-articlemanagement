import actionTypes from "../actions/actionTypes"
// console.log(actionTypes)
const initState={
    isLoading:false,
    list:[
        {
        id:1,
        title: 'Lorem ipsum dolor sit111',
        desc: 'ddadnagagLorem ipsum dolor sit 111 is........',
        hasRead:false
        
        },
        {
            id: 2,
            title: 'Lorem ipsum dolor sit222',
            desc: 'ddadnagagLorem ipsum dolor sit 222 is........',
            hasRead: false

        },
        {
            id: 3,
            title: 'Lorem ipsum dolor sit333',
            desc: 'ddadnagagLorem ipsum dolor sit 3333 is........',
            hasRead: false

        },
    ]
}
export default(state=initState,action)=>{
    switch(action.type){
        case actionTypes.START_NOTIFICATION_POST:
        return {
            ...state,
            isLoading:true
        }
        case actionTypes.FINISH_NOTIFICATION_POST:
            return {
                ...state,
                isLoading: false
            }
        case actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID:
            var newList=state.list.map(item=>{
                if(item.id===action.payload.id){
                    item.hasRead=true
                }
                return item
            })
            return {
                    ...state,
                    list:newList
                }
        
                
        case actionTypes.MARK_ALL_NOTIFICATION_AS_READ:
        
        return {
            ...state,
            list: state.list.map(item => {
                    item.hasRead = true
                return item
            })
        }
        case actionTypes.RECIVED_NOTIFICATIONS:
            return {
                ...state,
                list:action.payload.list
            }
        default:
            return state
    }
}