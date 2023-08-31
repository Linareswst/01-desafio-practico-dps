import React, { useEffect, useState } from "react";
import { data } from "../data";

export const MovieList = () => {
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState("");
  const [peliculasAgregadas, setPeliculasAgregadas] = useState([]);
  const [totalCompra, setTotalCompra] = useState(0);

  {/* Agregando peliculas */}
  const onAgregarPelicula = () => {
    const movie = data.find((m) => m.id === parseInt(peliculaSeleccionada));

  {/* Verificando que solo se pueda agregar una pelicula única */}
  const peliculaEnLista = peliculasAgregadas.find(m => m.id === movie.id);
    if (movie && !peliculaEnLista) {
      setPeliculasAgregadas([...peliculasAgregadas, movie]);
      setPeliculaSeleccionada("");
    }
  };

  {/* Eliminando peliculas */}
  const onDeletePelicula = (id) => {
    const nuevasPeliculas = peliculasAgregadas.filter(
      (movie) => movie.id !== id
    );
    setPeliculasAgregadas(nuevasPeliculas);
  };

  {/* Agregando funcionalidad al input number para la cantidad de películas */}
  const onUpdateCantidad = (id, quantity) => {
    const updatePeliculas = peliculasAgregadas.map((movie) => {
      if (movie.id === id) {
        return { ...movie, quantity };
      }
      return movie;
    });
    setPeliculasAgregadas(updatePeliculas);
  };

  {/* Agregando cálculo del total a pagar */}
  useEffect(() => {
    const total = peliculasAgregadas.reduce(
      (accumulator, movie) => accumulator + movie.price * movie.quantity, 0
    );
    setTotalCompra(total);
  }, [peliculasAgregadas]);
  return (
    <>
      <h1 className="titulo">Lista de Compras</h1>
      <div className="seleccionar-pelicula">
        <select
        value={peliculaSeleccionada}
          onChange={(e) => setPeliculaSeleccionada(e.target.value)}
          className="lista-peliculas"
        >
          <option value="">Selecciona una película</option>
          {data.map((movie) => (
            <option value={movie.id} key={movie.id}>
              {movie.title}
            </option>
          ))}
        </select>
        <button className="seleccionar-pelicula-boton" onClick={onAgregarPelicula}>Agregar Película</button>
      </div>
      <div className="container-peliculas">
        {peliculasAgregadas.map((movie) => (
          <>
            <div className="peliculas">
              <span className="info-peliculas-titulo">
                <p className="" key={movie.id}>
                  {movie.title}
                </p>
              </span>
              <span className="info-peliculas-precio">
                <p className="" key={movie.id}>
                  ${movie.price}
                </p>
              </span>
            </div>
            <div className="peliculas-botones">
              <span className="info-peliculas-cantidad">
                <input
                  type="number"
                  value={movie.quantity}
                  onChange={(e) =>
                    onUpdateCantidad(movie.id, parseInt(e.target.value))
                  } min={0}
                />
              </span>
              <span className="info-peliculas-eliminar">
                <img
                  src="https://i.ibb.co/FsMqpvW/trash-can.png"
                  alt="cerrar"
                  className="icon-close"
                  onClick={() => onDeletePelicula(movie.id)}
                />
              </span>
            </div>
          </>
        ))}
        <div className="total-compra">
          <p>Total: ${totalCompra.toFixed(2)}</p>
        </div>
      </div>
    </>
  );
};
