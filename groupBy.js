// groupBy.js RUN IN NODE
const groupBy = (array, keys) => {
  const result = {};

  array.forEach((item) => {
    // Create the group key by joining specified key values with an underscore
    const key = keys.map((k) => item[k]).join("_");

    // Initialize the group if it doesn't exist
    if (!result[key]) {
      result[key] = keys.reduce(
        (acc, k) => {
          acc[k] = item[k]; // Add field being grouped on to the group object
          return acc;
        },
        { _key: key, _items: [] }
      );
    }

    // Add the current item to the group's _items array
    result[key]._items.push(item);
  });

  return result;
};

// Example usage:
const data = [
  { name: "John", age: 20, city: "New York" },
  { name: "Jane", age: 20, city: "Chicago" },
  { name: "John", age: 20, city: "Boston" },
  { name: "John", age: 25, city: "Seattle" },
  { name: "Jane", age: 25, city: "Pittsburgh" },
  { name: "Jane", age: 20, city: "Los Angeles" },
];
const groupedData = groupBy(data, ["name", "age"]);
console.log(JSON.stringify(groupedData, null, 2)); // print the result
