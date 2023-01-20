/**
 * All the code in this script is created from scratch by be unless labeled as a modified version from website.
 * The website refered to is 
 *
  https://www.html-code-generator.com/javascript/color-converter-script
 * 
 * This webpage has sections for different converters and these are addressed by #7 and #13 in the comments.
 */

  function rgbaToHex(r,g,b,a){
    r = r.toString(16);
    if(r.length == 1) r = "0"+r;
  
    g = g.toString(16);
    if(g.length == 1) g = "0"+g;
  
    b = b.toString(16);
    if(b.length == 1) b = "0"+b;
  
    a = Math.ceil(a).toString(16);
    if(a.length == 1) a = "0"+a;
  
    return "#" + r + g + b + a;
  }
  
  function hexToRgba(hex){
    hex = hex.replace("#","");
    let r = parseInt(hex.slice(0,2),16);
    let g = parseInt(hex.slice(2,4),16);
    let b = parseInt(hex.slice(4,6),16);
    let a = parseInt(hex.slice(6,8),16);
  
    return `rgba(${Math.ceil(r)},${Math.ceil(g)},${Math.ceil(b)},${Math.ceil(a)})`;
  }
  function hexToR_g_b_a(hex){
    hex = hex.replace("#","");
    let r = parseInt(hex.slice(0,2),16);
    let g = parseInt(hex.slice(2,4),16);
    let b = parseInt(hex.slice(4,6),16);
    let a = parseInt(hex.slice(6,8),16);
    if(!a && a != 0) a = 255;
    return [Math.ceil(r),Math.ceil(g),Math.ceil(b),Math.ceil(a)];
  }
  
  //Modified version of #7 from the website
  function R_G_BtoHSLA(red, green, blue) {
  
      red = red < 0 ? 0 : red > 255 ? 255 : red;
      green = green < 0 ? 0 : green > 255 ? 255 : green;
      blue = blue < 0 ? 0 : blue > 255 ? 255 : blue;
  
      var r = red / 255,
          g = green / 255,
          b = blue / 255,
          min = Math.min(r, g, b),
          max = Math.max(r, g, b),
          delta = max - min,
          h, s, l;
      if (max == min) {
          h = 0;
      } else if (r == max) {
          h = (g - b) / delta;
      } else if (g == max) {
          h = 2 + (b - r) / delta;
      } else if (b == max) {
          h = 4 + (r - g) / delta;
      }
      h = Math.min(h * 60, 360);
      if (h < 0) h += 360;
      l = (min + max) / 2;
      if (max == min) s = 0;
      else if (l <= 0.5) s = delta / (max + min);
      else s = delta / (2 - max - min);
      return `hsl(${Math.random(h)},${Math.round(s * 100)},${Math.round(l * 100)})`;
  }
  //Modified version of #7 from the website
  function R_G_B_AtoH_S_L_A(red, green, blue, alpha) {
  
      red = red < 0 ? 0 : red > 255 ? 255 : red;
      green = green < 0 ? 0 : green > 255 ? 255 : green;
      blue = blue < 0 ? 0 : blue > 255 ? 255 : blue;
  
      var r = red / 255,
          g = green / 255,
          b = blue / 255,
          min = Math.min(r, g, b),
          max = Math.max(r, g, b),
          delta = max - min,
          h, s, l;
      if (max == min) {
          h = 0;
      } else if (r == max) {
          h = (g - b) / delta;
      } else if (g == max) {
          h = 2 + (b - r) / delta;
      } else if (b == max) {
          h = 4 + (r - g) / delta;
      }
      h = Math.min(h * 60, 360);
      if (h < 0) h += 360;
      l = (min + max) / 2;
      if (max == min) s = 0;
      else if (l <= 0.5) s = delta / (max + min);
      else s = delta / (2 - max - min);
      return [
          Math.round(h),
          Math.round(s * 100),
          Math.round(l * 100),
          alpha
      ];
  }
  
  //Modified version of number #13 from the website
  function hslaToRgba(h,s,l) {
      s /= 100;
      l /= 100;
      C = (1 - Math.abs(2 * l - 1)) * s;
      var hue = h / 60;
      X = C * (1 - Math.abs(hue % 2 - 1));
      r = g = b = 0;
      if (hue >= 0 && hue < 1) {
          r = C;
          g = X;
      } else if (hue >= 1 && hue < 2) {
          r = X;
          g = C;
      } else if (hue >= 2 && hue < 3) {
          g = C;
          b = X;
      } else if(hue >= 3 && hue < 4) {
          g = X;
          b = C;
      } else if (hue >= 4 && hue < 5) {
          r = X;
          b = C;
      } else {
          r = C;
          b = X;
      }
      m = l - C / 2;
      r += m;
      g += m;
      b += m;
      r *= 255.0;
      g *= 255.0;
      b *= 255.0;
      return `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
  }
  
  //Modified version of #13 from the website
  function H_S_L_AtoR_G_B_A(h,s,l,a) {
      if(h < 0) h += 360;
      s /= 100;
      l /= 100;
      C = (1 - Math.abs(2 * l - 1)) * s;
      var hue = h / 60;
      X = C * (1 - Math.abs(hue % 2 - 1));
      r = g = b = 0;
      if (hue >= 0 && hue < 1) {
          r = C;
          g = X;
      } else if (hue >= 1 && hue < 2) {
          r = X;
          g = C;
      } else if (hue >= 2 && hue < 3) {
          g = C;
          b = X;
      } else if(hue >= 3 && hue < 4) {
          g = X;
          b = C;
      } else if (hue >= 4 && hue < 5) {
          r = X;
          b = C;
      } else {
          r = C;
          b = X;
      }
      m = l - C / 2;
      r += m;
      g += m;
      b += m;
      r *= 255.0;
      g *= 255.0;
      b *= 255.0;
      return [Math.round(r),Math.round(g),Math.round(b),a];
  }
  
  function hsvTohsl(h,s,v){
    let l = v*(1-(s/2));
    let sL = (l == 0 || l == 1 ? 0 : ((v-l)/(Math.min(l,1-l))));
    return [h,sL,l];
  }