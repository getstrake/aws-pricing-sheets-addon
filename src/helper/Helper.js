String.prototype.endsWith = function(str2) {
  return this.slice(this.length - str2.length) === str2;
}

function getObjectWithValuesToLowerCase(obj) {
  const result = {};
  for (let key in obj) {
      let value = obj[key];
      if (typeof value === 'string') {
        result[key] = value.toLowerCase();
      } else if (Array.isArray(value)) {
        result[key] = getArrayWithValuesToLowerCase(value)
      } else if (value instanceof Date || value === null) {
        result[key] = value;
      } else if (typeof value === 'object') { // should be after array, date and null
        result[key] = getObjectWithValuesToLowerCase(value);
      } else {
        result[key] = value;
      }
  }
  return result;
};

function getArrayWithValuesToLowerCase(arr) {
  const result = [];
  for (const [index, value] of arr.entries()) {
      if (typeof value === 'string') {
        result[index] = value.toLowerCase();
      } else if (Array.isArray(value)) {
        result[index] = getArrayWithValuesToLowerCase(value)
      } else if (value instanceof Date || value === null) {
        result[index] = value;
      } else if (typeof value === 'object') { // should be after array, date and null
        result[index] = getObjectWithValuesToLowerCase(value);
      } else {
        result[index] = value;
      }
  }
  return result;
}

// maps 2d array to object with lowercase for keys and values
// example: [["name", "JohN"],["aGe", 39]] => {name: "john", age: 39}
function map2dArrayToObjectWithLowerCaseValues(values) {
  if(!values || !Array.isArray(values)) return {};
  if(!Array.isArray(values[0])) values = [values]; // if not 2d array, make it 2d
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