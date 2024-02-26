export const manipulateQuakesData = (coordinates: any) => {
    const [lat, lng] = coordinates
      .split(",")
      .map((coord: string) => parseFloat(coord));
    return { lat, lng };
  };