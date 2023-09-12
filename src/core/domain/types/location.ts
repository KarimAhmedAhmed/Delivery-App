export type location = {
  name: string;
  coordinates: {
    type: string;
    coordinates: [number, number]; // [longitude, latitude]
  };
};
