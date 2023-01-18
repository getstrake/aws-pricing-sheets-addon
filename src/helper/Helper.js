String.prototype.endsWith = function(str2) {
  return this.slice(this.length - str2.length) === str2;
}

function getObjectWithAllValuesToLowerCase(obj) {
  let result = {};
  for (let key in obj) {
      if (typeof obj[key] === 'string') {
        result[key] = obj[key].toLowerCase();
      } else if (typeof obj[key] === 'object') {
        result[key] = getObjectWithAllValuesToLowerCase(obj[key]);
      }
  }
  return result;
};

// maps 2d array to object with lowercase for keys and values
// example: [["name", "JohN"],["aGe", 39]] => {name: "john", age: 39}
function mapValuesToObjectWithLowerCaseValues(values) {
  if(!values || !Array.isArray(values)) return {};
  const result = values.reduce((prev, cur) => {
      const key = cur?.[0]?.toString().toLowerCase();
      const value = cur?.[1]?.toString().toLowerCase();
      if(key !== undefined && value !== undefined)
        prev[key] = value;
      return prev;
  },{});
  return result;
}

function getObjectWithLowerCaseValues(obj) {
  let result = {};
  for (let key in obj) {
      if (typeof obj[key] === 'string') {
        result[key] = obj[key].toLowerCase();
      } else if (typeof obj[key] === 'object') {
        result[key] = getObjectWithLowerCaseValues(obj[key]);
      } else {
        result[key] = obj[key];
      }
  }
  return result;
}