import React, { Component, Fragment } from "react";
import Header from './components/Header/Header';
import Body from './components/Body/Body';

import './App.css';
import { connect, sendMsg } from "./api";




class App extends Component {



    //state = {infoprocess:{},inforam:{},inforam:{},chatHistory:new Array()}

    state = {
            cpuinfo: -1,
            meminfo: -1,
            Cpuu: [
                ["Time", "Cpu"]
            ],
            Infop: new Array(),
            Memfree: -1,
            Mempercent: [
                ["Time", "Ram"]
            ],
            Memtotal: -1,
            Procsr: -1,
            Procss: -1,
            Procst: -1,
            Procsz: -1,
            Totalprocs: -1,
            autorize: false,
            username: "",
            pass: ""
        }
        /*  
state = {
    listacomplementos: new Array()
}
*/
    constructor(props) {
        console.log("Constructor de App")
        super(props);


        console.log(this.state.Cpuu);
    }

    componentDidMount() {
        console.log("En el componentDidMount de App ")
        connect((msg) => {
            console.log("New Message")
            let today = new Date();
            let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let dateTime = date + ' ' + time;
            console.log(this.state.Cpuu);
            console.log(msg);
            let obj = JSON.parse(msg.data);
            //console.log(obj)
            this.setState(prevState => ({
                //chatHistory: [...this.state.chatHistory, msg]
                Cpuu: [...this.state.Cpuu, [dateTime, obj.Cpuu]],
                Infop: obj.Infop,
                Memfree: obj.Memfree,
                //[Date.now().toLocaleString(),obj.Mempercent]
                Mempercent: [...this.state.Mempercent, [dateTime, obj.Mempercent]],
                Memtotal: obj.Memtotal,
                Procsr: obj.Procsr,
                Procss: obj.Procss,
                Procst: obj.Procst,
                Procsz: obj.Procsz,
                Totalprocs: obj.Totalprocs,
                cpuinfo: obj.Cpuu,
                meminfo: obj.Mempercent

            }))

            console.log(obj);
        });
    }
    send(pid) {
        //console.log(pid)
        sendMsg(pid);
        //console.log(event.target.value)
        /*if(event.keyCode === 13) {
          sendMsg(event.target.value);
          event.target.value = "";
        }
        */
    }

    render() {




        return ( <
            Fragment >
            <
            Header / >

            <
            Body
            data = { this.state.Infop }
            send = { this.send }
            totalProcs = {this.state.Totalprocs}


            datacpu = { this.state.Cpuu }
            totalProcs = { this.state.Totalprocs }
            procsS = { this.state.Procss }
            procsR = { this.state.Procsr }
            procsT = { this.state.Procst }
            procsZ = { this.state.ProcsZ }
            cpu = { this.state.cpuinfo }

            dataram = { this.state.Mempercent }
            memTotal = { this.state.Memtotal }
            memFree = { this.state.Memfree }
            memPercent = { this.state.meminfo }

            / > < /
            Fragment >
        );






    }
}

export default App;