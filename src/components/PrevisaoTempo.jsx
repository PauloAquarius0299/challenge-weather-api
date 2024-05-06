import React, { useState } from 'react';
import { IoSearch } from "react-icons/io5";
import axios from 'axios';
import './previsao-tempo.css';

const PrevisaoTempo = () => {
    const [cidade, setCidade] = useState('');
    const [dadosClima, setDadosClima] = useState(null);
    const [erro, setErro] = useState('');

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://api.weatherstack.com/current?access_key=c94bcf05e3e5a3f66a4788e689d95f25&query=${cidade}`);
            const { current, location } = response.data;
            setDadosClima({
                temperatura: current.temperature,
                vento: current.wind_speed,
                umidade: current.humidity,
                sensacao: current.feelslike,
                cidade: location.name,
                pais: location.country
            });
            setErro('');
        } catch (error) {
            setErro('Cidade não encontrada. Por favor, insira uma cidade válida.');
        }
    };
    console.log({cidade})

    return (
        <section className='time'>
            <div className='container'>
                <h1>Previsão do Tempo</h1>
                <div className='search-container'>
                    <input
                        type="text"
                        placeholder='insira aqui o nome da sua cidade'
                        required
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                    />
                    <IoSearch className='icon' onClick={handleSearch} />
                </div>
                <hr />
                {erro && <p className="error">{erro}</p>}
                {dadosClima && (
                    <div className="clima-info">
                        <p><strong>Cidade:</strong> {dadosClima.cidade}, {dadosClima.pais}</p>
                        <p><strong>Temperatura:</strong> {dadosClima.temperatura}°C</p>
                        <p><strong>Ventos:</strong> {dadosClima.vento} km/h</p>
                        <p><strong>Umidade:</strong> {dadosClima.umidade}%</p>
                        <p><strong>Sensação Térmica:</strong> {dadosClima.sensacao}°C</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default PrevisaoTempo;
