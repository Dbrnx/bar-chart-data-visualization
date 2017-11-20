//Every time a different date is picked, we retrieve the corresponding data and redraw the chart
d3.select('#datePicker')
    .on('change', function() {
        httpReq = new XMLHttpRequest();
        let month = document.getElementById('datePicker').value;
        let url = '/amounts/' + month + '-01T00:00:00.000';
        httpReq.open('GET', url);
        httpReq.onreadystatechange = drawChart;
        httpReq.send();
    });


//Draws the different elements of the chart with d3. If the month is invalid, a message is displayed instead
let drawChart = function() {
    if (httpReq.readyState === 4 && httpReq.status === 200) {

        let data = JSON.parse(httpReq.responseText);

        d3.select('svg').remove();

        let margin = {top: 20, right: 80, bottom: 200, left: 80};
        let width = 1000 - margin.left - margin.right;
        let height = 500 - margin.top - margin.bottom;

        let svg = d3.select('#chartDiv')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g').attr('class', 'container')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        if (data.length > 0) {
            let xScale = d3.scaleBand()
                .domain(data.map(function(d) {return d.department}))
                .range([0, width])
                .paddingInner(0.1);

            let yScale = d3.scaleLinear()
                .domain([0, d3.max(data, function(d) {return d.amount})])
                .range([height, 0]);

            svg.selectAll('rect')
                .data(data)
                .enter()
                .append('rect')
                .attr('class', 'bar')
                .attr('height', function(d) {return height - yScale(d.amount)})
                .attr('width', xScale.bandwidth())
                .attr('x', function(d) {return xScale(d.department)})
                .attr('y', function(d) {return yScale(d.amount)});

            svg.selectAll('text')
                .data(data)
                .enter()
                .append('text')
                .attr('class', 'text')
                .text(function(d) {return '$' + d3.format(',')(d.amount)})
                .attr("x", function(d) {return xScale(d.department) + xScale.bandwidth()/2})
                .attr("y", function(d) {return yScale(d.amount) - 2});

            svg.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(xScale))
                .selectAll('text')
                .attr('text-anchor', 'end')
                .attr('transform', 'rotate(-45)');
        } else {
            svg.append('text')
                .attr('class', 'error')
                .attr('x', width/2)
                .attr('y', height/2)
                .attr('text-anchor', 'middle')
                .text('Sorry, there is no data for this month. Please choose another one.')
        }
    }
};


//Data is also retrieved when the page loads
let httpReq = new XMLHttpRequest();
let month = document.getElementById('datePicker').value;
let url = '/amounts/' + month + '-01T00:00:00.000';
httpReq.open('GET', url);
httpReq.onreadystatechange = drawChart;
httpReq.send();


