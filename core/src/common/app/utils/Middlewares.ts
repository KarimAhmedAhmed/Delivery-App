export type location = {
  name: string;
  coordinates: {
    type: string;
    coordinates: [number, number]; // [longitude, latitude]
  };
};

export const coordinates = (liveLoction: location, maxDistance: Number) => {
  const nearestCoordinates = {
    coordinates: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: liveLoction.coordinates.coordinates, // Specify your target coordinates here
        },
        $maxDistance: maxDistance, // Specify the maximum distance in meters
      },
    },
  };

  return nearestCoordinates;
};
