document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.querySelector('canvas');
    
    var paint = (function(canvas) {
        var ctx = canvas.getContext('2d');
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        var brush = {
            isDrawing: false, //brush does't draw by default
            lastX: 0, // last x coordinate
            lastY: 0, // last y coordinate
            size: 10, // brush size
            color: '#000000' //default brush color
        }
    
        var _draw = function(x, y) {
            if(!brush.isDrawing) return; // check, if mouse pointer is in the canvas block
            ctx.strokeStyle = brush.color; // 
			ctx.beginPath();
			ctx.moveTo(brush.lastX, brush.lastY);
			ctx.lineWidth = brush.size;
			ctx.lineTo(x, y);
			ctx.stroke();
			brush.lastX = x;
			brush.lastY = y;
        }   
        
        return {
            paint: function(e){
				_draw(e.offsetX, e.offsetY);
			},
			setDrawing: function(status) {
				brush.isDrawing = status;
			},
			setPosition: function(x, y) {
				[brush.lastX, brush.lastY] = [x, y];
			},
        }
    }(canvas));
    
    canvas.addEventListener('mousedown', (event) => {
        paint.setDrawing(true);
        paint.setPosition(event.offsetX, event.offsetY);
    });
    
    canvas.addEventListener('mousemove', (event) => {
        paint.paint(event);
    });
    
    canvas.addEventListener('mouseup', () => {
        paint.setDrawing(false); 
    });
    
    canvas.addEventListener('mouseout', () => {
		paint.setDrawing(false);
    });

});