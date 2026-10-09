function calculateDistanceToISS(issLat, issLng, specifiedLat, specifiedLng) {
    try {
        // Haversine formula
        const R = 6371; // Earth radius in km
        const piByHundred = (Math.PI / 180)
        // convert degree to radian  - formula is Δϕ=(lat2​−lat1​)*(π​ /180)
        const lat1 = issLat * piByHundred
        const lat2 = specifiedLat * piByHundred
        const deltaLat = (issLat - specifiedLat) * piByHundred
        const deltaLng = (issLng - specifiedLng) * piByHundred
        // formula - a=sin2(2Δϕ​)+cos(ϕ1​)cos(ϕ2​)sin2(2Δλ​)
        const a =
            Math.sin(deltaLat / 2) ** 2 +
            Math.cos(lat1) *
            Math.cos(lat2) *
            Math.sin(deltaLng / 2) ** 2;
        // c=2atan2(root a​,root of 1−a)
        console.log(a);
        const safeA = Math.min(1, Math.max(0, a));
        const c = 2 * Math.atan2(Math.sqrt(safeA), Math.sqrt(1 - safeA));
        return R * c
    } catch (error) {
        return error
    }
}

module.exports = calculateDistanceToISS;