#ifdef GL_ES
precision highp float;
#endif

// https://iquilezles.org/articles/palettes/
// Also http://dev.thi.ng/gradients/
vec3 palette(in float t)
{
    vec3 a=vec3(0.000,0.500,0.500);
    vec3 b=vec3(0.000 ,0.500 ,0.500);
    vec3 c=vec3(0.000, 0.500 ,0.333);
    vec3 d=vec3(0.00, 0.500 ,0.667);
    return a+b*cos(6.28318*(c*t+d));
}

vec3 mandelbroot(vec2 point, vec2 trap){
    vec2 z = vec2(0.); 
    float o1=2000.;
    float o2=2000.;
    int i = 0;
    vec2 p1 = vec2(2., 0.);
    vec2 p2 = trap;
    for(i=0;i<256;i++){
        float sr=z.x*z.x-z.y*z.y;
        float sc=2.*z.y*z.x;
        
        z.x=sr+point.x;
        z.y=sc+point.y;
        float l1= length(z - trap);
        o1=min(o1, l1);
        if (length(z) > 2.)
        break;
    }
    
    
    vec3 col = palette(float(i) / 64.);
    return col;
}


void mainImage(out vec4 fragColor, vec2 fragCoord){

    vec3 color = vec3(0.0);
     for(int i = -3; i <= 3; i++) {
        for(int j = -3; j <= 3; j++) {
            vec2 st=(2.*fragCoord+vec2(i,j)/3.0-iResolution.xy)/iResolution.y;
            vec2 location = vec2(-0.74364388, 0.13);
            vec2 uv=(st);
            uv*= 0.00235;
            uv+=location;
            vec2 st2=(2.*iMouse.xy-iResolution.xy)/iResolution.y;
            vec2 trap = (st2-vec2(0.5,0)) * 1.2;
            color+=mandelbroot(uv, trap);
        }
    }
    fragColor=vec4(color / 36.,1.);
}