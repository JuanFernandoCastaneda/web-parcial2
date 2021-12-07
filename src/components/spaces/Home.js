import React, { useState, useEffect } from 'react';
import './home.css';
import Chart from 'chart.js/auto';
import { FormattedMessage } from 'react-intl';

function Home(props) {

  const [rooms, setRooms] = useState([]);
  const [displayedRoom, setDisplayedRoom] = useState(null);
  const [devicesHtml, setDevicesHtml] = useState(<tr></tr>);
  const [roomsHtml, setRoomsHtml] = useState(<div></div>);
  const [chart, setChart] = useState(null);
  const adaptToCss = (string) => {
    return string.split(" ").join('-');
  };

  useEffect(() => {
    fetch('https://gist.githubusercontent.com/josejbocanegra/92c90d5f2171739bd4a76d639f1271ea/raw/9effd124c825f7c2a7087d4a50fa4a91c5d34558/rooms.json')
      .then(res => res.json()).then(res => {
        setRooms(res.filter(room => room.homeId === props.homeId));
      })
  }, [props.homeId]);

  useEffect(() => {
    if (rooms.length !== 0) {
      setDisplayedRoom(rooms[0]);
      paintChart();
    }
    setRoomsHtml(rooms.map(room => {
      return (
        <div className={"col-4 room p-2 btn " + adaptToCss(room.name)}>
          <div onClick={() => {
            setDisplayedRoom(room);
          }} className="card">
            <div className="card-body">
              <h3 className="card-title">{room.name}</h3>
            </div>
            <img className="card-img-top"
              src='https://p.turbosquid.com/ts-thumb/x2/EJcU7X/uy/cartoonapartmentbuilding_01_/jpg/1622731400/600x600/fit_q87/9bac5bd68fd2647d198662dcea0fccf17ebf195a/cartoonapartmentbuilding_01_.jpg'
              alt={"Picture of " + room.name}
            />
          </div>
        </div>
      );
    }));
  }, [rooms]);

  useEffect(() => {
    if (displayedRoom !== null) {
      colorNew(adaptToCss(displayedRoom.name));
      setDevicesHtml(displayedRoom.devices.map((device, index) => {
        return (
          <tr>
            <th>{index}</th>
            <td>{device.id}</td>
            <td>{device.name}</td>
            <td>{device.desired.value}</td>
          </tr>
        );
      }));
    }
  }, [displayedRoom]);

  function colorNew(newNameCss) {
    const roomsDoc = document.getElementsByClassName('room');
    for (let i = 0; i < roomsDoc.length; i++) {
      roomsDoc[i].classList.remove('selected')
      if (adaptToCss(roomsDoc[i].getElementsByClassName('card-title')[0].innerText) === newNameCss) {
        roomsDoc[i].classList.add('selected')
      }
    }
  }

  const paintChart = async function () {
    if (chart !== null) chart.destroy();
    setChart(new Chart(document.getElementsByClassName("chart")[0], {
      type: 'pie',
      data: {
        labels: rooms.map(room => room.name),
        datasets: [
          {
            label: "Energía gastada",
            data: rooms.map(room => room.powerUsage.value),
            hoverOffset: 4,
            backgroundColor: rooms.map(room => `rgb(
                ${Math.round(Math.random() * 255)}, 
                ${Math.round(Math.random() * 255)}, 
                ${Math.round(Math.random() * 255)})`)
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Power usage (kwH) - Today',
          },
        },
      },
    }));
  }

  return (
    <div className="home container">
      <div className="navegar row">
        <button type="button"
          className="btn btn-primary col-2 m-4"
          onClick={props.retroceder}
        >
          Retroceder
        </button>
      </div>
      <h1 className="row">
        <FormattedMessage id="Rooms" >
        </ FormattedMessage>
      </h1>
      <h5 className="row">{`(${props.homeName})`}</h5>
      <div className="row">
        <div className="col-6 row">
          {roomsHtml}
        </div>
        <div className="col-6">
          <h4>{(displayedRoom != null ? displayedRoom.name : '')}</h4>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>
                  <FormattedMessage id="Device" />
                </th>
                <th>
                  <FormattedMessage id="Value" />
                </th>
              </tr>
            </thead>
            <tbody>
              {devicesHtml}
            </tbody>
          </table>
        </div>
        <h2 className="row mt-5">
          <FormattedMessage id="Stats" />
        </h2>
        <div className="row grafica">
          <canvas className="chart">

          </canvas>
        </div>
      </div>
    </div>
  );
}

export default Home;