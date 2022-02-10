import React from "react";
import _ from "lodash";

const Search= ()=>{
   
    const [text, setText]=React.useState("");
    

    const onChange=(e)=>{
        setText(e.target.value)
        keyPress(e);
    }

    const debounce = _.debounce((e)=>{
        console.log("debounce",e.target.value)
    }, 1000);
    const throttle = _.throttle((e)=>{
        console.log("throttle",e.target.value)
    })
    const keyPress = React.useCallback(debounce, []);
    return ( 
        <div>
            <input type="text"  onChange={onChange}  value={text}/>
        </div>
    )
}

export default Search