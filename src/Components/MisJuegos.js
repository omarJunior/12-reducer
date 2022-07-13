import React, { useEffect, useReducer } from 'react'
import { juegoReducer } from '../Reducers/juegoReducer'


const init = ()=>{
    return JSON.parse(localStorage.getItem("juegos")) || []
}

export const MisJuegos = () => {

    const [juegos, dispatch] = useReducer(juegoReducer, [], init)

    useEffect(()=>{
        localStorage.setItem("juegos", JSON.stringify(juegos))
    },[juegos])

    const conseguirDatosForm = (e)=>{
        e.preventDefault()
        const juego = {
            id: new Date().getTime(),
            title: e.target.title.value,
            description: e.target.description.value
        } 
        dispatch({
            type: 'crear',
            payload: juego
        })
    }

    const borramelo = (e, id)=>{
        dispatch({
            type: 'borrar',
            payload: id
        })
    }

    const editar = (e, id)=>{
        let juego = {
            id,
            title: e.target.value,
            description: e.target.value,
        }
        dispatch({
            type: 'editar',
            payload: juego
        })
    }

  return (
    <div>
        <h1>Estos son mis videojuegos</h1>
        <p>Numero de videojuegos: {juegos.length}</p>

        <ul>
           {
            juegos.map(item => (
                <li key={item.id}>
                    {item.title}
                    &nbsp;<button onClick={(e)=> borramelo(e, item.id)}>X</button>
                    &nbsp;<input type="text" onBlur={(e)=> editar(e, item.id)}
                                            onKeyPress={(e)=> {
                                                if(e.key === "Enter"){
                                                    editar(e, item.id)}
                                                }} />

                </li>
            ))
           }
        </ul>

        <h3>Agregar juego</h3>

        <form onSubmit={conseguirDatosForm}>
            <input 
            type="text"
            name="title"
            placeholder="titulo..."
            />
            <textarea name="description" placeholder='Descripcion...'></textarea>

            <button type='submit'>Guardar</button>
        </form>

    </div>
  )
}
