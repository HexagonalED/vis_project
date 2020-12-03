//initial screen setting (fixed)
const border = d3.select("div")

let data=[{"attacktype1" : "gun"},{"attacktype1" : "gun"},{"attacktype1" : "gun"},{"attacktype1" : "gun"},{"attacktype1": "sword"},{"attacktype1": "fist"},{"attacktype1": "bomb"},{"attacktype1": "sword"},{"attacktype1": "none"}]
let column_selection="attacktype1";

//table/graph screen setting (fixed)
const svgHeight = 500
const svgWidth = 840
const margin={top:20,right:40,bottom:30,left:40}
const svgScreen = border.append("svg").attr("id","screen")
const svgGraph = svgScreen.append("svg").attr("id","columnGraph").attr("width",svgWidth).attr("height", svgHeight)

function translate(x,y){return `translate(${x}, ${y})`}
function swapElm(arr,idxa,idxb){
    tmp = arr[idxa]
    arr[idxa]=arr[idxb]
    arr[idxb]=tmp
}


//array of data

//eventid extended country region provstate city latitude longitude summary
// multiple success suicide attacktype1 targtype1 targsubtype1 nativity1  gname motive
// weaptype1 weapsubtype1 weapdetail nkill nwound dbsource ishostkid ransom



function updateColumnSelection(value){
    column_selection = value;
}



function dataCounter(data, selector){
    let ret = {}
    data.forEach(function(elem) {
        if(ret[elem[selector]] == undefined){
            ret[elem[selector]]=1;
        }else{
            ret[elem[selector]]++;
        }
    });
    return ret;
}


function setScale(xAxisData,yMaxValue,width,height){
    console.log(xAxisData)
    console.log(yMaxValue)
    let xScale = d3.scaleBand().domain(xAxisData).range([0,width]).paddingOuter(0.1).paddingInner(0.1)
    let yScale = d3.scaleLinear().domain([0,yMaxValue]).range([height,0])
    return {"x":xScale,"y":yScale}
}





const graphArea = svgGraph.append("g").attr("id","graphArea").attr('transform', translate(margin.left, margin.top))
//x axis scale setting
const graph_width = svgWidth - margin.left - margin.right
const graph_height = svgHeight - margin.top - margin.bottom

//axis area, draw xAxis
svgGraph.append('g')
    .attr('transform', translate(0, graph_height))
    .attr("id", "xArea")
svgGraph.append('g')
    .attr("id", "yArea")
svgGraph.append('g')
    .attr("id", "barArea")
    .attr("width", graph_width)
    .attr("height", graph_height)

const selection=dataCounter(data,column_selection)
console.log(selection)
const scale = setScale(Object.keys(selection),Math.max.apply(null,Object.values(selection)),graph_width,graph_height)
let xAxis = d3.axisBottom(scale["x"])
let yAxis = d3.axisLeft(scale["y"])

d3.select("g#xArea").call(xAxis)
d3.select("g#yArea").call(yAxis)




// let xScale = d3.scaleBand().domain(xTeam).range([0, width]).paddingOuter(0.1).paddingInner(0.1)
// let yScale = d3.scaleLinear().domain([0, yGames]).range([height, 0])
// let yScaleRight = d3.scaleLinear().domain([0, yGames]).range([0, height])
// let xAxis = d3.axisBottom(xScale)
// let yAxis = d3.axisLeft(yScale)
// let yAxisRight = d3.axisRight(yScaleRight)
// d3.select("g#barXArea").call(xAxis)
// d3.select("g#barYArea").call(yAxis)
// d3.select("g#barYRightArea").call(yAxisRight)

//
// let barSelection = d3.select("g#barArea")
// let totalBar = barSelection.selectAll("g").data(curData.data,d=>d.team).join("g").attr("transform",d=>translate(xScale(d.team),0))
//     .attr("id",d=>d.team)
//     .attr("class","stack")
//     .on('mouseenter',monBar)
//     .on('mouseleave',moffBar)
// totalBar.append("rect")
//     .attr("id","win")
//     .attr("width",xScale.bandwidth())
//     .attr("height",d=>height-yScale(+d.W))
//     .attr("y",d=>yScale(+d.W))
//     .attr("fill",d=>teamColor[d.team])
// totalBar.append("rect")
//     .attr("id","draw")
//     .attr("width",xScale.bandwidth())
//     .attr("height",d=>height-yScale(+d.D))
//     .attr("y",d=>yScale((+d.W)+(+d.D)))
//     .attr("fill","#808080")
// totalBar.append("rect")
//     .attr("id","lose")
//     .attr("width",xScale.bandwidth())
//     .attr("height",d=>height-yScale(+d.L))
//     .attr("y",d=>yScale((+d.W)+(+d.D)+(+d.L)))
//     .attr("fill",d=>d3.rgb(teamColor[d.team]).darker(2))
// return barSelection
//
