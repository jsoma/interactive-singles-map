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

  this.singleMenSum = men.single(data);
  this.marriedMenSum = men.married(data);

  this.singleWomenSum = women.single(data);
  this.marriedWomenSum = women.married(data);

  this.population = d3.sum(this.singleMenSum) + d3.sum(this.marriedMenSum) +  d3.sum(this.singleWomenSum) + d3.sum(this.marriedWomenSum);
}

Location.prototype.toData = function(start, end) {
  if(typeof(start) === 'undefined') {
    return { id: this.id }
  }
  
  var ratio = this.singleMaleFemaleRatio(start, end);
  var men = this.singleMen(start, end);
  var women = this.singleWomen(start, end);
  return {
    id: this.id,
    men: men,
    women: women,
    ratio: ratio,
    sex: this.prevailingSex(start, end),
    difference: Math.round(Math.abs(1 - ratio) * 100),
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
  var useable = this.singleMenSum.slice(start, end + 1);
  return d3.sum(useable);
}

Location.prototype.singleWomen = function(start, end) {
  var useable = this.singleWomenSum.slice(start, end + 1);
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
