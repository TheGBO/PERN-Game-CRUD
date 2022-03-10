import React, { useState } from 'react'
import {RiDeleteBin2Line} from 'react-icons/ri';
import {BsFillPencilFill} from 'react-icons/bs';
import { api } from '../config/api.js';
import Popup from './Popup.js';

export const TableItem = (props) => {

    const [buttonPopup, setButtonPopup] = useState(false);

    function deleteItem(id, callback){
        api.delete(`game/${id}`).then((data) => {
            console.log(data.data);
            callback();
        })
    }

    function updateItem(id, title, category, callback){
        api.put(`game/${id}`, {title:title, category:category}).then((val) => {
            callback();
        })
    }


    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.title}</td>
            <td>{props.category}</td>
            <td className='action'>
            <RiDeleteBin2Line onClick={() => {
                deleteItem(props.id, props.cb);
            }}/>
            <BsFillPencilFill onClick={() => {
                setButtonPopup(true);
            }} />
            </td>
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup} id="update-popup">
                <h1 className='update-title'>Update Game of id: {props.id}</h1>  
                <input type='text' placeholder='Game Title' id='update-title' className='styled-input'
                 autoComplete='off' spellCheck='false' ></input>
                 
                <input type='text' placeholder='Category' id='update-category' className='styled-input'
                 autoComplete='off' spellCheck='false' ></input>  

                <button className='styled-btn' onClick={(e) => {
                    
                    updateItem(props.id, document.getElementById('update-title').value,
                    document.getElementById('update-category').value,
                    props.cb);
                    console.log(e);
                }}>Update</button>
            </Popup>
        </tr>
    )
}
