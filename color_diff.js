
/*
lAWRENCE NYAKISO - 2014
deltaECIE2000 - FORMULAR

*/

module.exports = function(rgb1, rgb2, callback){
	
	var rgb2labArray1 = rgb2lab(rgb1);
	var rgb2labArray2 = rgb2lab(rgb2);
	
	var l1 = rgb2labArray1[0];
	var a1 = rgb2labArray1[1];
	var b1 = rgb2labArray1[2];
	
	var l2 = rgb2labArray2[0];
	var a2 = rgb2labArray2[1];
	var b2 = rgb2labArray2[2];
	
	
	var avg_lp 		= (l1 + l2) / 2;
	var c1 			= Math.sqrt(Math.pow(a1, 2) + Math.pow(b1, 2));
	var c2 			= Math.sqrt(Math.pow(a2, 2) + Math.pow(b2, 2));
	var avg_c 		= (c1 + c2) / 2;
	var g 			= (1- Math.sqrt(Math.pow(avg_c, 7) / (Math.pow(avg_c, 7) + Math.pow(25, 7)))) / 2;
	
	var a1p 		= a1 * (1 + g);
	var a2p 		= a2 * (1 + g);
	
	var c1p 		= Math.sqrt(Math.pow(a1p, 2) + Math.pow(b1, 2));
	var c2p 		= Math.sqrt(Math.pow(a2p, 2) + Math.pow(b2, 2));
	
	var avg_cp 		= (c1p + c2p) / 2;
	
	var h1p 		= rad2deg(Math.atan2(b1, a1p));
	if(h1p < 0){
	
		h1p = h1p + 360;
	}
	
	var h2p 		= rad2deg(Math.atan2(b2, a2p));
	if(h2p < 0){
		
		h2p = h2p + 360;
	}
	
	var avg_hp 		= Math.abs(h1p - h2p) > 180 ? (h1p + h2p + 360) / 2 : (h1p + h1p) / 2;
	
	var t 			= 1 - 0.17 * Math.cos(deg2rad(avg_hp - 30)) + 0.24 * Math.cos(deg2rad(2 * avg_hp)) + 0.32 * Math.cos(deg2rad(3 * avg_hp + 6)) - 0.2 * Math.cos(deg2rad(4 * avg_hp - 63))
	
	var delta_hp 	= h2p - h1p;
	if(Math.abs(delta_hp) > 180){
		if (h2p <= h1p) {
                delta_hp += 360;
            }
            else {
                delta_hp -= 360;
            }
	}
	
	var delta_lp 	= l2 - l1;
	var delta_cp 	= c2p - c1p;
	
	delta_hp 		= 2 * Math.sqrt(c1p * c2p) * Math.sin(deg2rad(delta_hp) / 2);
	
	var s_l 		= 1 + ((0.015 * Math.pow(avg_lp - 50, 2)) / Math.sqrt(20 + Math.pow(avg_lp - 50, 2)));
	var s_c 		= 1 + 0.045 * avg_cp
	var s_h 		= 1 + 0.015 * avg_cp * t;
	
	var delta_ro 	= 30 * Math.exp( - (Math.pow((avg_hp - 275) / 25, 2)));
	var r_c 		= 2 * Math.sqrt(Math.pow(avg_cp, 7) / (Math.pow(avg_cp, 7) + Math.pow(25, 7)));
	var r_t			= -r_c * Math.sin(2 * deg2rad(delta_ro));
	
	var kl = kc = kh = 1;

	var delta_e = Math.sqrt(Math.pow(delta_lp / (kl * s_l), 2) + Math.pow(delta_cp / (kc * s_c), 2) + Math.pow(delta_hp / (kh * s_h), 2) + r_t * (delta_cp / (kc * s_c)) * (delta_hp / (kh * s_h)))
	
	return callback(null, delta_e)
	
	
	function rad2deg(rad){
		
		return 360 * rad / (2 * Math.PI);
	}
	function deg2rad(deg){
		
		return (2 * Math.PI * deg) / 360;
	}
	
	function rgb2lab(rgb){
		return xyz2lab(rgb2xyz(rgb))
	}
	
	function rgb2xyz(rgb){
		//rgb is an array
		
		var r = rgb[0];
		var g = rgb[1];
		var b = rgb[2];
	
		
		r = r <= 0.04045 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
		g = g <= 0.04045 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
		b = b <= 0.04045 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
		
		r *= 100;
		g *= 100;
		b *= 100;
		
		var x = r * 0.412453 + g * 0.357580 + b * 0.180423;
        var y = r * 0.212671 + g * 0.715160 + b * 0.072169;
        var z = r * 0.019334 + g * 0.119193 + b * 0.950227;
		
		return [x, y, z]
	}
	
	function xyz2lab(xyz){
		
		var x = xyz[0];
		var y = xyz[1];
		var z = xyz[2];
		
		x /= 95.047;
        y /= 100;
        z /= 108.883;

        x = x > 0.008856 ? Math.pow(x, 1 / 3) : x * 7.787 + 16 / 116; 
        y = y > 0.008856 ? Math.pow(y, 1 / 3) : y * 7.787 + 16 / 116; 
        z = z > 0.008856 ? Math.pow(z, 1 / 3) : z * 7.787 + 16 / 116; 

        l = y * 116 - 16;
        a = (x - y) * 500;
        b = (y - z) * 200;
		
		return [l, a, b];
	}
}


























