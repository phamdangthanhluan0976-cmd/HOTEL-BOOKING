export const filterRooms = (
    rooms,
    selectedRoomTypes,
    selectedPriceRanges,
    sortBy
) => {

    let filteredRooms = [...rooms];

    // Filter Room Type
    if (selectedRoomTypes.length > 0) {
        filteredRooms = filteredRooms.filter(room =>
            selectedRoomTypes.includes(room.roomType)
        );
    }

    // Filter Price Range
    if (selectedPriceRanges.length > 0) {
        filteredRooms = filteredRooms.filter(room => {

            return selectedPriceRanges.some(range => {

                switch (range) {

                    case "$0 - $100":
                        return room.pricePerNight >= 0 &&
                            room.pricePerNight <= 100;

                    case "$100 - $200":
                        return room.pricePerNight > 100 &&
                            room.pricePerNight <= 200;

                    case "$200 - $300":
                        return room.pricePerNight > 200 &&
                            room.pricePerNight <= 300;

                    case "$300 - $400":
                        return room.pricePerNight > 300 &&
                            room.pricePerNight <= 400;

                    default:
                        return false;
                }
            });
        });
    }

    // Sort
    switch (sortBy) {

        case "Price Low to High":
            filteredRooms.sort(
                (a, b) => a.pricePerNight - b.pricePerNight
            );
            break;

        case "Price High to Low":
            filteredRooms.sort(
                (a, b) => b.pricePerNight - a.pricePerNight
            );
            break;

        case "Newest First":
            filteredRooms.sort(
                (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            break;

        default:
            break;
    }

    return filteredRooms;
};