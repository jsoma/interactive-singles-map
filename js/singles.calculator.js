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
        "Spouse present": 19
        ,"Separated": 35
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
      var key = marriedStatusOffsets[status] + baseOffset + ageOffset + 1;
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
    
    for(var j=0; j < ageKeys.length; j++) {
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
    
    for(var j=0; j < ageKeys.length; j++) {
      sum += parseInt(data[ ageKeys[j] ]);
    }
    sums.push(sum);
  }
  return sums;
}
