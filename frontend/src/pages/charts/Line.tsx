import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import './../../scss/canvasJS.scss';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class LineChart extends Component<any, any>   {


    render() {

        let roundsList = this.props.Points.map(p => p.number);
        let pointsList = this.props.Points.map(p => p.points);
        const dataPoints : any[] = [];
        for (var i = 0; i < roundsList.length; i++) {
            dataPoints.push({
                x: roundsList[i],
                y: pointsList[i]
            });
        }

        const options = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light2", // "light1", "dark1", "dark2"
            title: {
                text: "Weekly Points"
            },
            axisY: {
                title: "Points",
                includeZero: false
            },
            axisX: {
                title: "Week",
                prefix: "W",
                interval: 1
            },
            data: [{
                type: "line",
                toolTipContent: "Week {x}: {y} points",
                dataPoints: dataPoints
            }]
        }

        return (
            <div className='realfevrJMChart'>
                <CanvasJSChart options={options} />
            </div>
        );
    }
}

export default LineChart;                           