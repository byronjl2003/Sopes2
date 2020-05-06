package websocket

import (
	"fmt"
	"time"

	"strconv"

	"io/ioutil"
	"strings"
)

type Pool struct {
	Register   chan *Client
	Unregister chan *Client
	Clients    map[*Client]bool
	Broadcast  chan Message
}

type Proci struct {
	flag    string
	Pid     int64
	Nombre  string
	Estado  string
	Memoria float32
	User    string
	llave   int
}
type Myresponse struct {
	Totalprocs int32
	Procsr     int32
	Procss     int32
	Procst     int32
	Procsz     int32
	Infop      []Proci
	Cpuu       float64
	Memtotal   int64
	Memfree    int64
	Mempercent float64
}

func NewPool() *Pool {
	return &Pool{
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Clients:    make(map[*Client]bool),
		Broadcast:  make(chan Message),
	}
}

func (pool *Pool) Start() {
	for {
		select {
		case client := <-pool.Register:
			pool.Clients[client] = true
			fmt.Println("Size of Connection Pool: ", len(pool.Clients))
			for client, _ := range pool.Clients {
				fmt.Println(client)
				//client.Conn.WriteJSON(Message{Type: 1, Body: "New User Joined..."})
			}
			break
		case client := <-pool.Unregister:
			delete(pool.Clients, client)
			fmt.Println("Size of Connection Pool: ", len(pool.Clients))
			//for client, _ := range pool.Clients {
			//client.Conn.WriteJSON(Message{Type: 1, Body: "User Disconnected..."})
			//}
			break
		case message := <-pool.Broadcast:
			//En teoria aqui va a llegar solo cuando se le de click al boton...
			fmt.Printf("Se va a matar al proceso %v", message.Body)
			/*var p []*process.Process
			p, _ = process.Processes()
			for _, proc := range p {
				i, err := strconv.ParseInt(message.Body, 10, 32)
				if err != nil {
					panic(err)
				}
				result := int32(i)
				if proc.Pid == result {
					fmt.Println("SI se va a a matar..")
					proc.Kill()
				}
			}
			*/
		case reporte1 := <-pool.Broadcast:
			fmt.Println("LLEGO::", reporte1.Body)

			/*
				for client, _ := range pool.Clients {


					if err := client.Conn.WriteJSON(message); err != nil {
						fmt.Println(err)
						return
					}

				}
			*/
		default:
			time.Sleep(5000 * time.Millisecond)
			fmt.Println("Sending message to all clients in Pool")
			for client, _ := range pool.Clients {
				if err := client.Conn.WriteJSON(getInfoo()); err != nil {
					fmt.Println("Entro en error")
					fmt.Println(err)
					//return
				}
			}

		}

	}
}
func check(e error) {
	if e != nil {
		panic(e)
	}
}
func getSplitForProcess() []string {
	dat, err := ioutil.ReadFile("/proc/other_201222626")
	check(err)
	var dataprocess string = string(dat)
	//fmt.Print(string(dat))

	return strings.Split(dataprocess, "##\n")

}
func getMeminfo() []string {
	dat, err := ioutil.ReadFile("/proc/mem_201222626")
	check(err)
	var dataprocess string = string(dat)
	//fmt.Print(string(dat))

	return strings.Split(dataprocess, "\n")
}
func getInfoProcess(split []string, cont *int32, contr *int32, conts *int32, contt *int32, contd *int32, contz *int32, contidle *int32) []Proci {
	var contador int = 0
	//fmt.Println("split::")
	//fmt.Println(split)
	x := []Proci{}
	for _, info := range split {
		//fmt.Println("info::")
		//fmt.Println(info)
		sp2 := strings.Split(info, "\n")
		for i, inf := range sp2 {
			if i < len(sp2)-1 {
				//fmt.Println("inf::")
				//fmt.Println(inf)
				spdata := strings.Split(inf, "\t")

				if i == 0 {
					n, err := strconv.ParseInt(spdata[0], 10, 64)
					if err != nil {
						fmt.Println(err)
					}
					x = append(x, Proci{"********", n, spdata[1], spdata[2], 100, "kk", contador})
					contador++
				} else {
					n, err := strconv.ParseInt(spdata[0], 10, 64)
					if err != nil {
						fmt.Println(err)
					}

					x = append(x, Proci{"-----------------------", n, spdata[1], spdata[2], 100, "kk", contador})
					contador++

				}

				*cont++
				switch spdata[2] {
				case "Ejecutandose":
					*contr++
				case "Durmiendo":
					*conts++
				case "Parado":
					*contt++
				case "Muerto":
					*contd++
				case "Zombie":
					*contz++
				case "Idle":
					*contidle++
				}

			}
		}

	}

	//fmt.Println("BLOQUES DE DATA:", len(split))fmt.Print()
	fmt.Println(x)
	fmt.Println("----------------------")
	return x

}
func getInfoo() Myresponse {
	var resp = Myresponse{}

	split := getSplitForProcess()
	var cont int32 = 0
	var contr int32 = 0
	var conts int32 = 0
	var contt int32 = 0
	var contz int32 = 0
	var contd int32 = 0
	var contidle int32 = 0
	var prinfo = getInfoProcess(split, &cont, &contr, &conts, &contt, &contd, &contz, &contidle)

	resp.Totalprocs = cont
	resp.Procsr = contr
	resp.Procss = conts
	resp.Procst = contt
	resp.Procsz = contz
	resp.Infop = prinfo
	//mycpu, _ := cpu.Percent(0, false)
	resp.Cpuu = 100
	//v, _ := mem.VirtualMemory()
	splitmem := getMeminfo()
	fmt.Printf("se va a convertir a info de memoria")
	fmt.Println(len(splitmem))
	fmt.Println(splitmem[0])
	fmt.Println(splitmem[1])
	fmt.Println(splitmem[2])
	fmt.Println(splitmem[3])
	n1, err := strconv.ParseInt(strings.TrimSpace(splitmem[0]), 10, 64)
	n2, err := strconv.ParseInt(strings.TrimSpace(splitmem[1]), 10, 64)
	n3, err := strconv.ParseFloat(strings.TrimSpace(splitmem[2]), 64)
	fmt.Println(err)
	fmt.Println(n1)
	fmt.Println(n2)
	fmt.Println(n3)
	resp.Memtotal = n1
	resp.Memfree = n2
	resp.Mempercent = n3

	/*
		var p []*process.Process
		var _ error
		p, _ = process.Processes()
		var infop []Proci
		for _, proc := range p {
				cont++
				nombre, _ := proc.Name()
				status, _ := proc.Status()
				switch status {
				case "S":
					conts++
				case "R":
					contr++
				case "T":
					contt++
				case "Z":
					contz++

				}

				namesp, _ := proc.Username()
				ramp, _ := proc.MemoryPercent()
				infop = append(infop, Proci{proc.Pid, nombre, status, ramp, namesp})

			}
	*/
	// almost every return value is a struct
	//fmt.Printf("Total: %v, Free:%v, UsedPercent:%f%%\n", v.Total, v.Free, v.UsedPercent)

	//return infop
	fmt.Println("Se genero...............")

	return resp

}
