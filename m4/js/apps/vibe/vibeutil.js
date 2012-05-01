/**
 * Vibe util
 * 
 * Utility functions for the vibe app.
 * @description
 */
define({
    
    /**
     * Flatten points in a geometry
     * @param  {Object} geom
     * @return {Array}
     * @private
     */
    flattenPoints: function (geom) {
        var shapePoints = [],
            coords = (geom.type === 'Polygon') ?  geom.coordinates[0] : geom.coordinates[0][0],
            len = coords.length,
            i,
            coord;
        
        for (i=len - 1; i >= 0; i--) {   
            coord = coords[i];
            shapePoints.push(coord[1]);
            shapePoints.push(coord[0]);
        }
        
        return shapePoints;
    },
    
    /**
     * Get a RGB value which represents the score.
     * Neighborhood opacity/color is determined by their score. 
     * @param {Object} score vibe score
     */
    getVibeScoreParams: function (score) {
        var rgb, opacity = .3;
        
        if (score >= 8) {
            rgb = 'rgb(244, 125, 68)';
        }
        else if (score >= 6) {
            rgb = 'rgb(204, 113, 71)';
        }
        else if (score >= 4) {
            rgb = 'rgb(179, 118, 89)';
        }
        else if (score >= 2) {
            rgb = 'rgb(128, 93, 77)';
        }
        else {
            rgb = 'rgb(77, 61, 54)';
        }
        
        // min opacity for score 0  = 30%
        // max opacity for score 10 = 80%
        return {
            rgb: rgb,
            opacity: opacity + score * .04
        };
    }
    
});
