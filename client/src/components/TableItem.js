import React from 'react'
import {RiDeleteBin2Line} from 'react-icons/ri';
import {BsFillPencilFill} from 'react-icons/bs';
import { api } from '../config/api.js';

export const TableItem = (props) => {
    function deleteItem(id, callback){
        api.delete(`game/${id}`).then((data) => {
            console.log(data.data);
            callback();
        })
    }

    function updateItem(id, callback){
        //TODO trocar o alert por um componente 
        let title = window.prompt("Insert a title");
        let category = window.prompt("Insert a category");
        api.put(`game/${id}`,{title:title, category:category}).then((data) => {
            callback();
        });
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
                updateItem(props.id, props.cb);
            }} />
            </td>
        </tr>
    )
}
