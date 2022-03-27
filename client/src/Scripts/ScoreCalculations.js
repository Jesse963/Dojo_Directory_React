exports.compareArrays = (userTags, schoolTags) => {
  const intersection = userTags.filter((tag) => schoolTags.includes(tag));
  console.log(intersection.length);
  return intersection;
};

// function distanceBetweenCoordinates(location1, location2) {
//   const [lon1, lat1] = location1;
//   const [lon2, lat2] = location2;
//   var R = 6371000; // Radius of the earth in m
//   var dLat = deg2rad(lat2 - lat1); // deg2rad below
//   var dLon = deg2rad(lon2 - lon1);
//   var a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(deg2rad(lat1)) *
//       Math.cos(deg2rad(lat2)) *
//       Math.sin(dLon / 2) *
//       Math.sin(dLon / 2);
//   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   var d = R * c; // Distance in m
//   console.log("distance: ", d);
//   return d;
// }

// function deg2rad(deg) {
//   return deg * (Math.PI / 180);
// }

// const location = [151.0919205, -33.85631744];
// const location2 = [151.0919205, -33.8543174];
// distanceBetweenCoordinates(location, location2);
