import React from 'react';
import {Radar } from 'react-chartjs-2';
import {db} from '../firebase/firebase';
class Dashboard extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            status: "loading",
            labels: [],
            data: [],
        }
        this.checkStatus = this.checkStatus.bind(this);
    }
    async componentDidMount()
    {
      
        const ref = db.collection(this.props.uid).doc('Information').collection('Dates');
        const snapshot = await ref.get();
        snapshot.forEach((doc) => {
            this.state.data.push(Number(doc.data().count));
            this.state.labels.push(String(doc.id));
        });
        this.setState({status: "loaded"});
    }
    checkStatus()
    {
        if(this.state.status === "loading")
        {
            return <h1>Loading...</h1>
        }
        if(this.state.status === "loaded")
        {
            return <h1><Radar style={{textAlign:"center"}}
        data={{
          labels: this.state.labels,
          datasets: [
            {
              label: 'Your activity pace',
              data: this.state.data,
              backgroundColor: [
                'black',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 5,
            },
            // {
            //   label: 'Quantity',
            //   data: [47, 52, 67, 58, 9, 50],
            //   backgroundColor: 'orange',
            //   borderColor: 'red',
            // },
          ],
        }}
        height={500}
        width={30}
        options = {{
          scales: {
              r: {
                  angleLines: {
                      display: false
                  },
                  suggestedMin: 0,
                  suggestedMax: 7
              }
          }
      }}
      /></h1>
        }
    }
    render()
    {
        return this.checkStatus();
    }
}
export default Dashboard;