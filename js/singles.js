Calculator = function(initialValueOffset) {
  
  function computeKey(offset) {
    if(offset < 10) {
      return 'HD01_VD0' + offset;
    } else {
      return 'HD01_VD' + offset;
    }
  }

  var baseOffset = initialValueOffset - 3;
  
  var ageRangeCount = 14
      ,marriedStatusOffsets = {
        "Spouse present": 20 // was previous 19!
        ,"Separated": 36 // was previously 35!
        ,"Spouse absent - other": 51
      }
      ,singleStatusOffsets = {
        "Never married": 4,
        "Widowed": 66,
        "Divorced": 81
      };

  this.singleKeys = [];
  this.marriedKeys = [];
  
  for(var ageOffset=0; ageOffset < ageRangeCount; ageOffset++) {
    var keys = [];
    
    for(var status in singleStatusOffsets) {
      var offset = singleStatusOffsets[status] + baseOffset + ageOffset;
      keys.push( computeKey(offset) );
    }
    
    this.singleKeys.push(keys);

    keys = [];
    for(var status in marriedStatusOffsets) {
      var offset = marriedStatusOffsets[status] + baseOffset + ageOffset ;
      keys.push( computeKey(offset) );
    }
    
    this.marriedKeys.push(keys);
  }
}

Calculator.prototype.single = function(data) {
  var sums = [];

  for(var i=0; i < this.singleKeys.length; i++) {
    var ageKeys = this.singleKeys[i];
    var sum = 0;

    // console.log("Age key " + i + "...");
    for(var j=0; j < ageKeys.length; j++) {
      // console.log("Single key: " + j + " = " + data[ ageKeys[j] ]);
      sum += parseInt(data[ ageKeys[j] ]);
    }
    sums.push(sum);
  }
  return sums;
}

Calculator.prototype.married = function(data) {
  var sums = [];

  for(var i=0; i < this.marriedKeys.length; i++) {
    var ageKeys = this.marriedKeys[i];
    var sum = 0;
    
    // console.log("Age key " + i + "...");
    for(var j=0; j < ageKeys.length; j++) {
      // console.log("Married key: " + j + " = " + data[ ageKeys[j] ]);
      sum += parseInt(data[ ageKeys[j] ]);
    }
    sums.push(sum);
  }
  return sums;
}


var Location = function(data) {
  this.id = data["GEO.id2"];
  this.data = data;

  var cleaned = (data['GEO.display-label'] || "").replace(' Metro Area','');
  var pieces = cleaned.split(",");
  var city, state;
  if(pieces.length > 1) {
    city = pieces[0].split("-")[0];
    state = pieces[1].split("-")[0];
  } else {
    city = "";
    state = "";
  }

  this.prettyName = city + ", " + state;

  // console.log("!!!!MEN!!!!");
  this.singleMenSum = men.single(data);
  this.marriedMenSum = men.married(data);

  // console.log("!!!!WOMEN!!!!");
  this.singleWomenSum = women.single(data);
  this.marriedWomenSum = women.married(data);
  // console.log("men...")
  // console.log(this.singleMenSum)
  // console.log("women...")
  // console.log(this.singleWomenSum)

  this.population = d3.sum(this.singleMenSum) + d3.sum(this.marriedMenSum) +  d3.sum(this.singleWomenSum) + d3.sum(this.marriedWomenSum);
}

Location.prototype.toData = function(start, end) {
  if(typeof(start) === 'undefined') {
    return { id: this.id }
  }
  
  var ratio = this.singleMaleFemaleRatio(start, end);
  var men = this.singleMen(start, end);
  var women = this.singleWomen(start, end);

  var total_singles = men + women;
  var d = Math.abs(women - men) / total_singles;

  return {
    id: this.id,
    men: men,
    women: women,
    ratio: ratio,
    sex: this.prevailingSex(start, end),
    // per 500
    // Previously the incorrect (?) Math.round(Math.abs(1 - ratio) * 100),
    difference: parseInt(d * 1000), 
    raw_difference: Math.abs(men - women)
  }
}

Location.prototype.prevailingSex = function(start, end) {
  var ratio = this.singleMaleFemaleRatio(start, end);
  if(ratio == 0) return 'none';
  return (ratio > 1) ? 'men' : 'women';
}

Location.prototype.singleMenToEveryoneRatio = function(start, end) {
  return this.singleMen(start, end) / this.population;
}

Location.prototype.singleWomenToEveryoneRatio = function(start, end) {
  return this.singleWomen(start, end) / this.population;
}

Location.prototype.singleMaleFemaleRatio = function(start, end) {
  return this.singleMen(start, end) / this.singleWomen(start, end);
}

Location.prototype.marriedMaleFemaleRatio = function(start, end) {
  return this.marriedMen(start, end) / this.marriedWomen(start, end);
}

Location.prototype.singleMen = function(start, end) {
  // console.log("Single men from " + start + " to " + end);
  var useable = this.singleMenSum.slice(start, end + 1);
  // console.log(useable)
  return d3.sum(useable);
}

Location.prototype.singleWomen = function(start, end) {
  // console.log("Single women from " + start + " to " + end);
  var useable = this.singleWomenSum.slice(start, end + 1);
  // console.log(useable)
  return d3.sum(useable);
}

Location.prototype.marriedMen = function(start, end) {
  var useable = this.marriedMenSum.slice(start, end + 1);
  return d3.sum(useable);
}

Location.prototype.marriedWomen = function(start, end) {
  var useable = this.marriedWomenSum.slice(start, end + 1);
  return d3.sum(useable);
}


$(document).on("mousemove", function(e) {  
    var mX = e.pageX;
    var mY = e.pageY;

    var closestNode, closestDistance, distance, node;
    
    $("circle.nearby").each( function(index, element) {
      node = $(element);
      distance = calculateDistance(node, mX, mY);

      if(typeof(closestDistance) == 'undefined' || distance < closestDistance) {
        closestDistance = distance;
        closestNode = node;
      } 
      
      if(typeof(element) !== 'undefined' && distance > closestNode[0].getBoundingClientRect().width) {
        node.removeClass("nearby");
      }
    });
      
    $(".hovering").each( function(i, element) {
      if(element !== closestNode[0]) {
        $(element).removeClass("hovering").tipsy("hide");
      }
    });
  
    if(typeof(closestNode) !== 'undefined' && closestDistance < closestNode[0].getBoundingClientRect().width / 2) {
      $(closestNode).addClass('hovering');
      
      closestNode.tipsy( 
        { 
          title: function() {
            var location = census.get( $(this).attr('singles-data-id') );
            if( typeof(location) === 'undefined') { return 'title'; }
            var data = location.toData(start, end);
            // console.log(data);
            var tooltip = "<strong>" + location.prettyName + ":</strong><br>";
            
            tooltip += seeking.display(data);

            tooltip += " more " + data.sex;
            
            //return tooltip;
            return "<strong>" + location.prettyName + ":</strong><br>" + seeking.tooltip_sentence(data);
          }
          ,gravity: 's'
          ,html: true
          ,opacity: 1.0
          ,offset: -8
          ,trigger: 'manual'
        }
      );
      
      closestNode.tipsy("show");
    } else {
      $(".hovering").removeClass('hovering').tipsy("hide");
    }

});

function drawGuide() {
  if(typeof(guide) !== 'undefined') 
    guide.remove();
  
  guide = svg.append('g').attr('class','guide');

  var vals = [
     {difference: 5, raw_difference: 5000}
    ,{difference: 25, raw_difference: 10000}
    ,{difference: 50, raw_difference: 25000}
    ,{difference: 100, raw_difference: 75000} 
  ];
  
  var spacing = 60;
  var offset = 40;
  
  for(var i=0; i < vals.length; i++) {
    guideCircleWithNote(vals[i], offset + spacing * i, 425);
  };

  guide.append("text")
    .attr('x', 140)
    .attr('y', 485)
    .attr('width', 100)
    .attr("text-anchor", "middle")
    .attr('class','per-1k')
    .text(seeking.description);

  guide.append("circle")
  .attr('cx', 45)
  .attr('cy', 510)
  .attr('r', 10)
  .attr('fill', '#3B8CC7')
  .attr('stroke','#000000')

  guide.append("text")
    .attr('x', 90)
    .attr('y', 513)
    .attr('width', 100)
    .attr("text-anchor", "middle")
    .text('more men');

  guide.append("circle")
  .attr('cx', 30 + 110)
  .attr('cy', 510)
  .attr('r', 10)
  .attr('fill', '#DE6565')
  .attr('stroke','#000000')

  guide.append("text")
    .attr('x', 80 + 110)
    .attr('y', 513)
    .attr('width', 100)
    .attr("text-anchor", "middle")
    .text('more women');
}

function drawGraph() {
  var graphNode = d3.select(".graph"),
    width = parseInt(graphNode.style("width")),
    height = parseInt(graphNode.style("height"));

  var vis = graphNode.append("svg")
      .attr("width", width )
      .attr("height", height );

  var men = usedAges.map( function(d, i) {
    return d3.sum(census.values().map( function(location) {
      return location.singleMen(ages.indexOf(d), ages.indexOf(d));
    }));
  });

  var women = usedAges.map( function(d, i) {
    return d3.sum(census.values().map( function(location) {
      return location.singleWomen(ages.indexOf(d), ages.indexOf(d));
    }));
  });

  var margin = 0;

  var y = d3.scale.linear().domain([0, d3.max( [ d3.max(men), d3.max(women) ] ) ] ).range([height, 0]);
  var x = d3.scale.linear().domain([0, usedAges.length - 1]).range([0, width]);

  var line = d3.svg.line()
    .y(function(d) { return y(d); })  
    .x(function(d,i) { return x(i); })
    
  vis.append("path").attr('class', "men").attr("d", line(men));
  vis.append("path").attr('class', "women").attr("d", line(women));
}

function guideCircleWithNote(data, x, y) {  
  var radius = seeking.compute(data);
  
  var arc = d3.svg.arc()
      .innerRadius(0)
      .outerRadius(radius);
  
  guide.append("path")
      .style("fill", "#DE6565")
      .attr("d", arc.startAngle(0).endAngle(Math.PI) )
      .attr("transform", function(d) { return "translate(" + x + "," + y + ")"; })

  guide.append("path")
      .style("fill", "#3B8CC7")
      .attr("d", arc.startAngle(Math.PI).endAngle(2 * Math.PI) )
      .attr("transform", function(d) { return "translate(" + x + "," + y + ")"; })

  guide.append("circle")
      .style("stroke", "#000000")
      .style("fill", "none")
      .attr("cx", x )
      .attr("cy", y )
      .attr("r", radius);
    
  guide.append("text")
    .attr('x', x)
    .attr('y', y + 38)
    .attr('width', 100)
    .attr("text-anchor", "middle")
    .text(seeking.display(data));
}

function refreshNoteText() {
  if(typeof(notesHTML) !== 'undefined') 
    notesHTML.remove();
  
  notesHTML = $("<div class='notes'></div>").appendTo(".container");
  
  var lastPoint;
  
  $(".notes path").each( function(i, element) {
    var e = $(element);
    var x = parseInt(e.attr('singles-data-x'));
    var y = parseInt(e.attr('singles-data-y'));
    var id = parseInt(e.attr('singles-data-id'));

    var location = census.get(id);
    var data = location.toData(start, end);
    
    var note = $(document.createElement('div') )
    note.css({
      position: 'absolute',
      top: x + 105,
      left: y - 40,
    }).html("<strong>" + location.prettyName + "</strong><br>" + seeking.sentence(data));

    notesHTML.append(note);
  });

  
}

function drawNotes() {
  if(typeof(notesSVG) == 'undefined') {
    notesSVG = under.append('g').attr('class','notes');

    drawNote(35620);
    drawNote(31100);
  }

  refreshNoteText()
}

function drawNote(id) {
  var location = census.get(id);
  var centroid = centroids.get(id);
  
  var data = location.toData(start, end);
  
  var coords = projection(centroid);
  
  var margin = 50;
  var top_offset = 40;
  var points = [ coords ];

  var right = parseInt(width) / 2 < coords[0];

  if(right) {
    points.push([parseInt(width) - margin, coords[1]]);
    points.push([parseInt(width) - margin, coords[1] + top_offset]);
  } else {
    points.push([margin, coords[1]]);
    points.push([margin, coords[1] + top_offset]);
  };

  var line = d3.svg.line()
   .x(function(d) { return d[0]; })
   .y(function(d) { return d[1]; })
   .interpolate("linear");

  notesSVG.append("path")
    .attr("d", line(points))
    .attr("fill","none")
    .attr("stroke","#000000")
    .attr("singles-data-id", id)
    .attr("singles-data-x", points[ points.length - 1 ][1])
    .attr("singles-data-y", points[ points.length - 1 ][0]);
}

function updateKey() {
  $(".key .minimum-population").text(populationNames[populationOptions.indexOf(minimumPopulation)]);
  $(".key .seeking").text(seeking.keyName);
  $(".key").css('visibility','visible');
}

var valueDisplays = [
  {
    display: function(data) { return numberWithCommas(data.difference) },
    compute: function(data) { return Math.sqrt((data.difference * 7) / Math.PI) },
    keyName: 'relative',
    description: 'per 1000 singles',
    sentence: function(data) {
      return numberWithCommas(data.difference) + " unmatched " + data.sex + " per 1000 singles";
    },
    tooltip_sentence: function(data) {
      return numberWithCommas(data.difference) + " unmatched " + data.sex;
    }
  },
  {
    display: function(data) { return numberWithCommas(data.raw_difference) },
    compute: function(data) { return Math.sqrt((data.raw_difference / 200)) },
    keyName: 'absolute',
    description: 'more singles',
    sentence: function(data) { 
      return numberWithCommas(data.raw_difference) + " more single " + data.sex + " than " + (data.sex == 'women' ? 'men' : 'women');
    },
    tooltip_sentence: function(data) {
      return numberWithCommas(data.raw_difference) + " more single " + data.sex;
    }
  }
]

var populationOptions = [ 50000, 100000, 250000, 350000, 500000, 750000, 1000000, 2500000, 5000000 ];
var populationNames = [ "50k", "100k", "250k", "350k", "500k", "750k", "1mil", "2.5mil", "5mil"];

var leftScale = d3.scale.threshold()
 .domain([20, 25, 30, 35, 40, 45, 50, 55, 60])
.range([1,2,3,4,5,6,7,8,9,10,11]);

var rightScale = d3.scale.threshold()
 .domain([20, 25, 30, 35, 40, 45, 50, 55, 60])
.range([1,2,3,4,5,6,7,8,9,10,11]);

