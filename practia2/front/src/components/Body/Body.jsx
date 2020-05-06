import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
//import Editor from './Editor';
//import List from '@material-ui/core/List';
//import ListItem from '@material-ui/core/ListItem';
//import ListItemText from '@material-ui/core/ListItemText';
//import ListSubheader from '@material-ui/core/ListSubheader';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
//import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Chart } from "react-google-charts";
import AnimatedNumber from 'react-animated-number';
import prettyBytes from 'pretty-bytes';
import {Helmet} from "react-helmet";
let id = 0;

/*
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}
*/
function TabContainer(props) {
    console.log("data TabContainer")
    //console.log(props.data);
  switch (props.flag) {
    case 0: {
      return (

        <Paper style={{ overflow: "auto" }}>
          <Helmet>
                <meta charSet="utf-8" />
                <title>Complementosssssssssssssssssssssssssss!!!!</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <AnimatedNumber component="text" value={props.totalProcs}
              style={{
                  transition: '0.8s ease-out',
                  fontSize: 24,
                  transitionProperty:
                      'background-color, color, opacity'
              }}
              frameStyle={perc => (
                  perc === 100 ? {} : {backgroundColor: '#ffeb3b'}
              )}
              duration={300}
              formatValue={n => 'Total Procesos: '+n}/>
              <br></br>
              <AnimatedNumber component="text" value={props.procsS}
              style={{
                  transition: '0.8s ease-out',
                  fontSize: 24,
                  transitionProperty:
                      'background-color, color, opacity'
              }}
              frameStyle={perc => (
                  perc === 100 ? {} : {backgroundColor: '#ffeb3b'}
              )}
              duration={300}
              formatValue={n => 'Procesos dormidos: '+n}/>
              <br></br>
              <AnimatedNumber component="text" value={props.procsR}
              style={{
                  transition: '0.8s ease-out',
                  fontSize: 24,
                  transitionProperty:
                      'background-color, color, opacity'
              }}
              frameStyle={perc => (
                  perc === 100 ? {} : {backgroundColor: '#ffeb3b'}
              )}
              duration={300}
              formatValue={n => 'Procesos corriendo: '+n}/>
              <br></br> 
              <AnimatedNumber component="text" value={props.procsT}
              style={{
                  transition: '0.8s ease-out',
                  fontSize: 24,
                  transitionProperty:
                      'background-color, color, opacity'
              }}
              frameStyle={perc => (
                  perc === 100 ? {} : {backgroundColor: '#ffeb3b'}
              )}
              duration={300}
              formatValue={n => 'Procesos parados: '+n}/>
              <br></br> 
              <AnimatedNumber component="text" value={props.procsZ}
              style={{
                  transition: '0.8s ease-out',
                  fontSize: 24,
                  transitionProperty:
                      'background-color, color, opacity'
              }}
              frameStyle={perc => (
                  perc === 100 ? {} : {backgroundColor: '#ffeb3b'}
              )}
              duration={300}
              formatValue={n => 'Procesos zombies: '+n}/>
              <br></br>
            
            
          <Table>
            <TableHead>
              <TableRow>
              <TableCell align="right">.</TableCell>
                <TableCell align="right">Pid</TableCell>
                <TableCell align="right">Nombre</TableCell>
                <TableCell align="right">Estado</TableCell>
                <TableCell align="right">Memoria</TableCell>
                <TableCell align="right">usuario</TableCell>
                
              </TableRow>
            </TableHead>
            <TableBody>
              {props.data.map(row => (
                <TableRow key={row.llave}>
                  <TableCell align="right">{row.flag}</TableCell>
                  <TableCell align="right">{row.Pid}</TableCell>
                  <TableCell align="right">{row.Nombre}</TableCell>
                  <TableCell align="right">{row.Estado}</TableCell>
                  <TableCell align="right">{row.Memoria}</TableCell>
                  <TableCell align="right">{row.User}</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => props.send(row.Pid)}
                    >
                      Kill
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      );
    }
    case 1: {
        //console.log(props.data);
      return (
        <Paper style={{ overflow: "auto" }}>
          <AnimatedNumber component="text" value={props.cpu}
              style={{
                  transition: '0.8s ease-out',
                  fontSize: 24,
                  transitionProperty:
                      'background-color, color, opacity'
              }}
              frameStyle={perc => (
                  perc === 100 ? {} : {backgroundColor: '#ffeb3b'}
              )}
              duration={300}
              formatValue={n => 'CPU utilizado: '+n}/>
              <br></br>
          
          <Chart
            width={"auto"}
            height={"auto"}
            chartType="AreaChart"
            loader={<div>Loading Chart</div>}
            data={props.data}
            options={{
              title: "CPU server",
              hAxis: { title: "Time", titleTextStyle: { color: "#333" } },
              vAxis: { minValue: 0 },
              // For the legend to fit, we make the chart area smaller
              hartArea: { width: "90%", height: "80%" }
              // lineWidth: 25
            }}
          />
        </Paper>
      );
    }
    case 2: {
        //console.log(props.data);
        let usedmem = props.memTotal - props.memFree;
        console.log("Memoria utilizada: "+usedmem);
        console.log("Memoria total: "+props.memTotal);
        console.log("Memoria total: "+props.memFree);
        return (
            <Paper style={{ overflow: "auto" }}>
              <AnimatedNumber component="text" value={props.memTotal}
              style={{
                  transition: '0.8s ease-out',
                  fontSize: 24,
                  transitionProperty:
                      'background-color, color, opacity'
              }}
              frameStyle={perc => (
                  perc === 100 ? {} : {backgroundColor: '#ffeb3b'}
              )}
              duration={300}
              formatValue={n => 'Memoria total: '+prettyBytes(n)}/>
              <br></br>
              <AnimatedNumber component="text" value={usedmem}
              style={{
                  transition: '0.8s ease-out',
                  fontSize: 24,
                  transitionProperty:
                      'background-color, color, opacity'
              }}
              frameStyle={perc => (
                  perc === 100 ? {} : {backgroundColor: '#ffeb3b'}
              )}
              duration={300}
              formatValue={n => 'Memoria Utilizada: '+prettyBytes(n)}/>
              <br></br>
              <AnimatedNumber component="text" value={props.memPercent}
              style={{
                  transition: '0.8s ease-out',
                  fontSize: 24,
                  transitionProperty:
                      'background-color, color, opacity'
              }}
              frameStyle={perc => (
                  perc === 100 ? {} : {backgroundColor: '#ffeb3b'}
              )}
              duration={300}
              formatValue={n => 'Porcentaje: '+n +'%'}/>
              
              
          <Chart
            width={"auto"}
            height={"auto"}
            chartType="AreaChart"
            loader={<div>Loading Chart</div>}
            data={props.data}
            options={{
              title: "RAM server",
              hAxis: { title: "Time", titleTextStyle: { color: "#333" } },
              vAxis: { minValue: 0 },
              // For the legend to fit, we make the chart area smaller
              hartArea: { width: "90%", height: "80%" }
              // lineWidth: 25
            }}
          />
        </Paper>
          );
    }
  }
  
}
export default class Body extends Component {
  state = {
    value: 0,
    
  };

  constructor(props) {
    super(props);
    this.titulos = ["Principal", "CPU", "RAM"];
    console.log("Constructor del Body");
    console.log(props)
    console.log(this.props.data);
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };
  handlecodeChange = code => {
    console.log("desde Footer:: " + code);
  };
  render() {
    console.log("En el render de BODY")
    
    const { value } = this.state;
    let cont;
    if(typeof this.props.data === 'undefined'){
      console.log("ENTRO AL PRIMER IF");
      console.log(this.props);
      console.log(this.props.data);  
      cont = <h1>jijijiji</h1>;
    }
    else{
      console.log("ENTRO AL ELSE");
      cont = (
        <Paper>
          
          
          <Tabs
            value={value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            centered
          >
            {<Tab label={this.titulos[0]} />}
            {<Tab label={this.titulos[1]} />}
            {<Tab label={this.titulos[2]} />}
            {<Tab label={this.titulos[3]} />}
          </Tabs>
          {value === 0 && (
          <TabContainer
            flag={0}
            data={this.props.data}
            send={this.props.send}
            totalProcs={this.props.totalProcs}
            procsS={this.props.procsS}
            procsR={this.props.procsR}
            procsT={this.props.procsT}
            procsZ={this.props.procsZ}
            cpu = {this.props.cpu}
          ></TabContainer>
        )}
        {value === 1 && (
          <TabContainer
            flag={1}
            data={this.props.datacpu}
            send={this.props.send}
            totalProcs={this.props.totalProcs}
            procsS={this.props.procsS}
            procsR={this.props.procsR}
            procsT={this.props.procsT}
            procsZ={this.props.procsZ}
            cpu = {this.props.cpu}
            
          ></TabContainer>
        )}
        {value === 2 && (
          <TabContainer
            flag={2}
            data={this.props.dataram}
            send={this.props.send}
            memTotal={this.props.memTotal}
            memFree={this.props.memFree}
            memPercent={this.props.memPercent}
          ></TabContainer>
        )}
          
        </Paper>
      ); 
    }
    return cont
  }
}
