import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import './App.css';
const logo = require('./logo.png');

function App() {
  const [diasTrabalhados, setDiasTrabalhados] = useState(0);
  const [minutosObrigatorios, setMinutosObrigatorios] = useState(0);
  const [minutosTrabalhados, setMinutosTrabalhados] = useState(0);
  const [horasTrabalhadas, setHorasTrabalhadas] = useState('');
  const [mensagem, setMensagem] = useState('');
  const handleChangeDias = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDiasTrabalhados(parseInt(event.target.value));
  };
  const handleChangeHoras = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHorasTrabalhadas(event.target.value);
  };

  useEffect(() => {
    //calcula minutos obrigatorios a partir dos dias trabalhados no mes
    const minutos = diasTrabalhados * 345;
    setMinutosObrigatorios(minutos);

    //calcular minutos trabalhados a partir das horas trabalhadas no mes
    let partesHora = horasTrabalhadas.split(':');
    let horasTrab = Number(partesHora[0]);
    let minutosTrab = Number(partesHora[1]);
    let totalMinutosTrab = horasTrab * 60 + minutosTrab;
    setMinutosTrabalhados(totalMinutosTrab);
  }, [diasTrabalhados, horasTrabalhadas]);

  const handleSubmit = (event: any) => {
    event.preventDefault();

    //calcula diferença das horas obrigatorias e trabalhadas
    let totalMinutos = minutosObrigatorios - minutosTrabalhados;

    if (totalMinutos < 0) {
      totalMinutos = Math.abs(totalMinutos);
      let resultadoHoras = Math.trunc(totalMinutos / 60);
      let resultadoMinutos = totalMinutos % 60;
      let horasFormatadas =
        resultadoHoras < 10 ? `0${resultadoHoras}` : resultadoHoras;
      let minutosFormatados =
        resultadoMinutos < 10 ? `0${resultadoMinutos}` : resultadoMinutos;
      return setMensagem(
        'Você tem crédito de: ' + horasFormatadas + ':' + minutosFormatados
      );
    } else {
      totalMinutos = Math.abs(totalMinutos);
      let resultadoHoras = Math.trunc(totalMinutos / 60);
      let resultadoMinutos = totalMinutos % 60;
      let horasFormatadas =
        resultadoHoras < 10 ? `0${resultadoHoras}` : resultadoHoras;
      let minutosFormatados =
        resultadoMinutos < 10 ? `0${resultadoMinutos}` : resultadoMinutos;
      return setMensagem(
        'Você tem débito de: ' + horasFormatadas + ':' + minutosFormatados
      );
    }
  };

  return (
    <div className="container">
      <div className="containerForm">
        <div className="cabecalho">
          <img style={{ width: '100px' }} src={logo} alt="Logo acp" />
          <h1>CÁLCULO DE HORAS</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Dias trabalhados no mês:</label>
            <input
              type="number"
              min={1}
              value={diasTrabalhados}
              onChange={handleChangeDias}
              placeholder="1"
            />
          </div>
          <div>
            <label>Horas trabalhadas no mês:</label>
            <InputMask
              mask="99:99"
              type="text"
              required
              value={horasTrabalhadas}
              onChange={handleChangeHoras}
              placeholder="00:00"
            />
          </div>

          <button type="submit"> Calcular</button>
        </form>
        <h2>{mensagem}</h2>
      </div>
    </div>
  );
}

export default App;
