String.prototype.endsWith = function(str2) {
  return this.slice(this.length - str2.length) === str2;
}