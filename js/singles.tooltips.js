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
            var tooltip = "<strong>" + location.prettyName + ":</strong><br>";
            
            tooltip += seeking.display(data);

            tooltip += " more " + data.sex;
            
            return tooltip;
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
